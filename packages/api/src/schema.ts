import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    runs: [Run]!
    run(id: ID!): Run
    instance(id: ID!): Instance
  }

  type Instance {
    instanceId: ID!
    results: InstanceResults!
  }

  type InstanceResults {
    stats: InstanceStats!
    tests: [InstanceTest!]!
    error: String
    stdout: String
    screenshots: [InstanceScreeshot]!
    # cypressConfig: CypressConfig
    reporterStats: ReporterStats
  }

  type InstanceStats {
    suites: Int
    tests: Int
    passes: Int
    pending: Int
    skipped: Int
    failures: Int
    wallClockStartedAt: String
    wallClockEndedAt: String
    wallClockDuration: Int
  }

  type InstanceTest {
    testId: String
    title: [String]
    state: String # prob enum
    body: String
    stack: String
    error: String
    # timings: InstanceTestTimings
    wallClockStartedAt: String
    wallClockDuration: Int
  }

  type InstanceScreeshot {
    screenshotId: String!
    name: String
    testId: String!
    takenAt: String!
    height: Int!
    width: Int!
  }

  type ReporterStats {
    suites: Int
    tests: Int
    passes: Int
    pending: Int
    failures: Int
    start: String
    end: String
    duration: Int
  }

  # Runs and subtypes
  type Run {
    runId: ID!
    meta: RunMeta
    specs: [RunSpec]
  }

  type RunSpec {
    spec: String!
    instanceId: String!
    claimed: Boolean!
  }

  type RunMeta {
    groupId: String
    ciBuildId: String
    projectId: String
    commit: Commit
  }

  type Commit {
    sha: String
    branch: String
    authorName: String
    authorEmail: String
    message: String
    remoteOrigin: String
  }
`;
