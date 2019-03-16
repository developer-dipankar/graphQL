import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'

const server = new GraphQLServer({
    'typeDefs': './schema.graphql',
    'resolvers': {
        Query,
        Mutation,
        User
    },
    context: {
        db
    }
});
server.start(() => console.log('GraphQL Server started'))