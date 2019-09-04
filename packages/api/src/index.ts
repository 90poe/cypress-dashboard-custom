import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';

import { RunsAPI } from './datasources/runs';
import { InstancesAPI } from './datasources/instances';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    runsAPI: new RunsAPI(),
    instancesAPI: new InstancesAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Apollo server ready at ${url}`);
});
