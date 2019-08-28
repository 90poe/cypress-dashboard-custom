import md5 from 'md5';
import uuid from 'uuid/v4';
import {
  getRunById,
  createRun as storageCreateRun,
  setInstanceClaimed as storageSetInstanceClaimed
} from './run.model';
import {
  AppError,
  RUN_EXISTS,
  RUN_NOT_EXIST,
  CLAIM_FAILED
} from '../lib/errors';
import {
  CreateRunParameters,
  CreateRunResponse,
  RunSpec,
  Run,
  Task
} from './run.types';

export const getById = getRunById;

export const createRun = async ({
  ciBuildId,
  commit,
  projectId,
  specs,
  platform
}: CreateRunParameters): Promise<CreateRunResponse> => {
  const runId = md5(ciBuildId + commit.sha + projectId + specs.join(' '));
  // not sure how specific that should be
  const groupId = `${platform.osName}-${platform.osVersion}-${ciBuildId}`;

  const response = {
    groupId,
    machineId: uuid(),
    runId,
    runUrl: 'https://sorry.cypress.io/',
    warnings: [] as string[]
  };

  try {
    const newRun = {
      runId,
      meta: {
        groupId,
        ciBuildId,
        commit,
        projectId,
        platform
      },
      specs: specs.map(spec => ({
        spec,
        instanceId: uuid(),
        claimed: false
      }))
    };

    await storageCreateRun(newRun);
    return response;
  } catch (error) {
    if (error.code && error.code === RUN_EXISTS) {
      return response;
    }
    throw error;
  }
};

export const getClaimedInstances = (run: Run) =>
  run.specs.filter(s => s.claimed);
export const getFirstUnclaimedInstance = (run: Run) =>
  run.specs.find(s => !s.claimed);
export const getAllInstances = (run: Run) => run.specs;

export const getNextTask = async (runId: string): Promise<Task> => {
  let run = await getById(runId);
  if (!run) {
    throw new AppError(RUN_NOT_EXIST);
  }
  if (!getFirstUnclaimedInstance(run)) {
    return {
      instance: null,
      claimedInstances: getClaimedInstances(run).length,
      totalInstances: getAllInstances(run).length
    };
  }

  const instance = getFirstUnclaimedInstance(run);
  try {
    await storageSetInstanceClaimed(runId, instance.instanceId);
    return {
      instance,
      claimedInstances: getClaimedInstances(run).length + 1,
      totalInstances: getAllInstances(run).length
    };
  } catch (error) {
    if (error.code && error.code === CLAIM_FAILED) {
      return await getNextTask(runId);
    }
    throw error;
  }
};
