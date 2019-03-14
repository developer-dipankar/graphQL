import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        hello: String!,
        name: String!
        address: String!
    }
`

const resolvers = {
    Query: {
        hello() {
            return "This is my query!"
        },
        name() {
            return "Dipankar Naskar"
        },
        address() {
            return "Kolkata"
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('GraphQL Server started'))