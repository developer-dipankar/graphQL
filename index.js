import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        greetings(fname: String, lname: String): String!
        add(a: Float, b: Float): Float!
        addArray(numbers: [Float!]!): Float!
        me: User!
        post: Post!
        posts: [Post!]
        grades: [Int!]
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
        body: String
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
        addArray(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0;
            }
            return args.numbers.reduce((prevValue, currentValue) => {
                return prevValue + currentValue;
            })
        },
        grades() {
            // return null;
            // return [];
            return [99, 100, 105];
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
                body: null,
                isPublished: false
            }
        },
        posts() {
            return [
                {id: '8787', title: 'Post 1', body: null, isPublished: false},
                {id: '67676', title: 'Post 2', body: 'dsfsd', isPublished: true},
                {id: '7647', title: 'Post 3', body: '', isPublished: false},
                {id: '4355', title: 'Post 4', body: '', isPublished: true},
            ]
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('GraphQL Server started'))