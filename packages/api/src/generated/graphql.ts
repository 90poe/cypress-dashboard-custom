import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type Commit = {
   __typename?: 'Commit',
  sha: Scalars['String'],
  branch: Scalars['String'],
  authorName: Scalars['String'],
  authorEmail: Scalars['String'],
  message: Scalars['String'],
  remoteOrigin: Scalars['String'],
};


export type FullRunSpec = {
   __typename?: 'FullRunSpec',
  spec: Scalars['String'],
  instanceId: Scalars['String'],
  claimed: Scalars['Boolean'],
  results?: Maybe<InstanceResults>,
};

export type Instance = {
   __typename?: 'Instance',
  runId: Scalars['ID'],
  run: PartialRun,
  spec: Scalars['String'],
  instanceId: Scalars['ID'],
  results?: Maybe<InstanceResults>,
};

export type InstanceResults = {
   __typename?: 'InstanceResults',
  stats: InstanceStats,
  tests: Array<InstanceTest>,
  error?: Maybe<Scalars['String']>,
  stdout?: Maybe<Scalars['String']>,
  screenshots: Array<InstanceScreeshot>,
  /** cypressConfig: CypressConfig */
  reporterStats?: Maybe<ReporterStats>,
};

export type InstanceScreeshot = {
   __typename?: 'InstanceScreeshot',
  screenshotId: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  testId: Scalars['String'],
  takenAt: Scalars['String'],
  height: Scalars['Int'],
  width: Scalars['Int'],
  screenshotURL?: Maybe<Scalars['String']>,
};

export type InstanceStats = {
   __typename?: 'InstanceStats',
  suites?: Maybe<Scalars['Int']>,
  tests?: Maybe<Scalars['Int']>,
  passes?: Maybe<Scalars['Int']>,
  pending?: Maybe<Scalars['Int']>,
  skipped?: Maybe<Scalars['Int']>,
  failures?: Maybe<Scalars['Int']>,
  wallClockStartedAt?: Maybe<Scalars['String']>,
  wallClockEndedAt?: Maybe<Scalars['String']>,
  wallClockDuration?: Maybe<Scalars['Int']>,
};

export type InstanceTest = {
   __typename?: 'InstanceTest',
  testId: Scalars['String'],
  title?: Maybe<Array<Maybe<Scalars['String']>>>,
  state?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  stack?: Maybe<Scalars['String']>,
  error?: Maybe<Scalars['String']>,
  /** timings: InstanceTestTimings */
  wallClockStartedAt?: Maybe<Scalars['String']>,
  wallClockDuration?: Maybe<Scalars['Int']>,
};

export enum OrderingOptions {
  Desc = 'DESC',
  Asc = 'ASC'
}

/** Runs and subtypes */
export type PartialRun = {
   __typename?: 'PartialRun',
  runId: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  meta?: Maybe<RunMeta>,
  specs: Array<Maybe<RunSpec>>,
};

export type Query = {
   __typename?: 'Query',
  runs: Array<Maybe<Run>>,
  runFeed: RunFeed,
  run?: Maybe<Run>,
  instance?: Maybe<Instance>,
};


export type QueryRunsArgs = {
  orderDirection?: Maybe<OrderingOptions>,
  cursor?: Maybe<Scalars['String']>
};


export type QueryRunFeedArgs = {
  cursor?: Maybe<Scalars['String']>
};


export type QueryRunArgs = {
  id: Scalars['ID']
};


export type QueryInstanceArgs = {
  id: Scalars['ID']
};

export type ReporterStats = {
   __typename?: 'ReporterStats',
  suites?: Maybe<Scalars['Int']>,
  tests?: Maybe<Scalars['Int']>,
  passes?: Maybe<Scalars['Int']>,
  pending?: Maybe<Scalars['Int']>,
  failures?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['String']>,
  end?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['Int']>,
};

export type Run = {
   __typename?: 'Run',
  runId: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  meta?: Maybe<RunMeta>,
  specs: Array<Maybe<FullRunSpec>>,
};

export type RunFeed = {
   __typename?: 'RunFeed',
  cursor: Scalars['String'],
  hasMore: Scalars['Boolean'],
  runs: Array<Run>,
};

export type RunMeta = {
   __typename?: 'RunMeta',
  groupId?: Maybe<Scalars['String']>,
  ciBuildId?: Maybe<Scalars['String']>,
  projectId?: Maybe<Scalars['String']>,
  commit?: Maybe<Commit>,
};

export type RunSpec = {
   __typename?: 'RunSpec',
  spec: Scalars['String'],
  instanceId: Scalars['String'],
  claimed: Scalars['Boolean'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  OrderingOptions: OrderingOptions,
  String: ResolverTypeWrapper<Scalars['String']>,
  Run: ResolverTypeWrapper<Run>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  RunMeta: ResolverTypeWrapper<RunMeta>,
  Commit: ResolverTypeWrapper<Commit>,
  FullRunSpec: ResolverTypeWrapper<FullRunSpec>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  InstanceResults: ResolverTypeWrapper<InstanceResults>,
  InstanceStats: ResolverTypeWrapper<InstanceStats>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  InstanceTest: ResolverTypeWrapper<InstanceTest>,
  InstanceScreeshot: ResolverTypeWrapper<InstanceScreeshot>,
  ReporterStats: ResolverTypeWrapper<ReporterStats>,
  RunFeed: ResolverTypeWrapper<RunFeed>,
  Instance: ResolverTypeWrapper<Instance>,
  PartialRun: ResolverTypeWrapper<PartialRun>,
  RunSpec: ResolverTypeWrapper<RunSpec>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  OrderingOptions: OrderingOptions,
  String: Scalars['String'],
  Run: Run,
  ID: Scalars['ID'],
  DateTime: Scalars['DateTime'],
  RunMeta: RunMeta,
  Commit: Commit,
  FullRunSpec: FullRunSpec,
  Boolean: Scalars['Boolean'],
  InstanceResults: InstanceResults,
  InstanceStats: InstanceStats,
  Int: Scalars['Int'],
  InstanceTest: InstanceTest,
  InstanceScreeshot: InstanceScreeshot,
  ReporterStats: ReporterStats,
  RunFeed: RunFeed,
  Instance: Instance,
  PartialRun: PartialRun,
  RunSpec: RunSpec,
};

export type CommitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Commit'] = ResolversParentTypes['Commit']> = {
  sha?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  authorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  authorEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  remoteOrigin?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FullRunSpecResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullRunSpec'] = ResolversParentTypes['FullRunSpec']> = {
  spec?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  instanceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  claimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  results?: Resolver<Maybe<ResolversTypes['InstanceResults']>, ParentType, ContextType>,
};

export type InstanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Instance'] = ResolversParentTypes['Instance']> = {
  runId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  run?: Resolver<ResolversTypes['PartialRun'], ParentType, ContextType>,
  spec?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  instanceId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  results?: Resolver<Maybe<ResolversTypes['InstanceResults']>, ParentType, ContextType>,
};

export type InstanceResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstanceResults'] = ResolversParentTypes['InstanceResults']> = {
  stats?: Resolver<ResolversTypes['InstanceStats'], ParentType, ContextType>,
  tests?: Resolver<Array<ResolversTypes['InstanceTest']>, ParentType, ContextType>,
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stdout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  screenshots?: Resolver<Array<ResolversTypes['InstanceScreeshot']>, ParentType, ContextType>,
  reporterStats?: Resolver<Maybe<ResolversTypes['ReporterStats']>, ParentType, ContextType>,
};

export type InstanceScreeshotResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstanceScreeshot'] = ResolversParentTypes['InstanceScreeshot']> = {
  screenshotId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  testId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  takenAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  screenshotURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type InstanceStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstanceStats'] = ResolversParentTypes['InstanceStats']> = {
  suites?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  tests?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  passes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  pending?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  skipped?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  failures?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  wallClockStartedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  wallClockEndedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  wallClockDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type InstanceTestResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstanceTest'] = ResolversParentTypes['InstanceTest']> = {
  testId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stack?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  wallClockStartedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  wallClockDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type PartialRunResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartialRun'] = ResolversParentTypes['PartialRun']> = {
  runId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  meta?: Resolver<Maybe<ResolversTypes['RunMeta']>, ParentType, ContextType>,
  specs?: Resolver<Array<Maybe<ResolversTypes['RunSpec']>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  runs?: Resolver<Array<Maybe<ResolversTypes['Run']>>, ParentType, ContextType, RequireFields<QueryRunsArgs, 'orderDirection' | 'cursor'>>,
  runFeed?: Resolver<ResolversTypes['RunFeed'], ParentType, ContextType, QueryRunFeedArgs>,
  run?: Resolver<Maybe<ResolversTypes['Run']>, ParentType, ContextType, RequireFields<QueryRunArgs, 'id'>>,
  instance?: Resolver<Maybe<ResolversTypes['Instance']>, ParentType, ContextType, RequireFields<QueryInstanceArgs, 'id'>>,
};

export type ReporterStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReporterStats'] = ResolversParentTypes['ReporterStats']> = {
  suites?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  tests?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  passes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  pending?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  failures?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type RunResolvers<ContextType = any, ParentType extends ResolversParentTypes['Run'] = ResolversParentTypes['Run']> = {
  runId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  meta?: Resolver<Maybe<ResolversTypes['RunMeta']>, ParentType, ContextType>,
  specs?: Resolver<Array<Maybe<ResolversTypes['FullRunSpec']>>, ParentType, ContextType>,
};

export type RunFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['RunFeed'] = ResolversParentTypes['RunFeed']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  runs?: Resolver<Array<ResolversTypes['Run']>, ParentType, ContextType>,
};

export type RunMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['RunMeta'] = ResolversParentTypes['RunMeta']> = {
  groupId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ciBuildId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  commit?: Resolver<Maybe<ResolversTypes['Commit']>, ParentType, ContextType>,
};

export type RunSpecResolvers<ContextType = any, ParentType extends ResolversParentTypes['RunSpec'] = ResolversParentTypes['RunSpec']> = {
  spec?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  instanceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  claimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Commit?: CommitResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  FullRunSpec?: FullRunSpecResolvers<ContextType>,
  Instance?: InstanceResolvers<ContextType>,
  InstanceResults?: InstanceResultsResolvers<ContextType>,
  InstanceScreeshot?: InstanceScreeshotResolvers<ContextType>,
  InstanceStats?: InstanceStatsResolvers<ContextType>,
  InstanceTest?: InstanceTestResolvers<ContextType>,
  PartialRun?: PartialRunResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  ReporterStats?: ReporterStatsResolvers<ContextType>,
  Run?: RunResolvers<ContextType>,
  RunFeed?: RunFeedResolvers<ContextType>,
  RunMeta?: RunMetaResolvers<ContextType>,
  RunSpec?: RunSpecResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
