import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        greetings(fname: String, lname: String): String!
        add(a: Float, b: Float): Float!
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
        greetings(parent, args, ctx, info) {
            if(args.fname && args.lname) {
                return `Hello ${args.fname + ' '+ args.lname}`
            } else {
                return 'Hello User'
            }
        },
        add(parent, args, ctx, info) {
            return args.a + args.b 
        },
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