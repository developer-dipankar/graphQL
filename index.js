import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }

    type User {
        id: String!
        fullname: String!
        email: String!
        age: Int!
        isActive: Boolean!
    }

    type Post {
        id: String!
        title: String!
        body: String!
        isPublished: Boolean!
    }
`

const resolvers = {
    Query: {
        me() {
            return {
                id:'123456',
                fullname: 'Dipankar',
                email: 'developer.dipankar@gmail.com',
                age: 28,
                isActive: true
            }
        },
        post() {
            return {
                id: '987654',
                title: 'Lorem Ipsum',
                body: '',
                isPublished: false
            }
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('GraphQL Server started'))