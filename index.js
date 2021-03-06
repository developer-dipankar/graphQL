import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'

const pubsub = new PubSub();
const server = new GraphQLServer({
    'typeDefs': './schema.graphql',
    'resolvers': {
        Query,
        Mutation,
        Subscription,
        User
    },
    context: {
        db,
        pubsub
    }
});
server.start(() => console.log('GraphQL Server started'))