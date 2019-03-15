import { GraphQLServer } from 'graphql-yoga';

const users = [
    {id: '1', fullname: 'Andrew', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,2]},
    {id: '2', fullname: 'Molly', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,3]},
    {id: '3', fullname: 'Hayden', email: 'abc@domain.com', age: 29, isActive: true, posts: [3,2]},
    {id: '4', fullname: 'Jitendra', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,4]},
    {id: '5', fullname: 'Somen Gadha', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,2,5]},
    {id: '6', fullname: 'Abhijit Chagol', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,5]},
    {id: '7', fullname: 'Gandu', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,3]},
    {id: '8', fullname: 'Pagla C***a', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,4]},
]

const posts = [
    {id: '1', title: 'A Blog', body: null, isPublished: true},
    {id: '2', title: 'B Blog', body: 'Blog A', isPublished: true},
    {id: '3', title: 'C Blog', body: null, isPublished: true},
    {id: '4', title: 'D Blog', body: null, isPublished: true},
    {id: '5', title: 'E Blog', body: null, isPublished: true},
]

const typeDefs = `
    type Query {
        users(Query: String): [User!]!
        greetings(fname: String, lname: String): String!
        add(a: Float, b: Float): Float!
        addArray(numbers: [Float!]!): Float!
        me: User!
        post: Post!
        posts(Query: String): [Post!]!
        grades: [Int!]
    }

    type User {
        id: String!
        fullname: String!
        email: String!
        age: Int!
        isActive: Boolean!
        posts: [Post!]!
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
        users(parent, args, ctx, info) {
            if (!args.Query) {
                return users;
            }
            return users.filter((item) => {return item.fullname.toLowerCase().includes(args.Query.toLowerCase())})
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
        posts(parent, args, ctx, info) {
            if(!args.Query) {
                return posts;
            }
            return posts.filter((item) => {
                let titleMatch = null;
                let bodyMatch = null;
                if(item.title) {
                    titleMatch = item.title.toLowerCase().includes(args.Query.toLowerCase())
                }
                if(item.body) {
                    bodyMatch = item.body.toLowerCase().includes(args.Query.toLowerCase())
                }
                return titleMatch || bodyMatch;
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            // console.log(parent.posts)
            return posts.filter((item) => {
                return parent.posts.includes(parseInt(item.id))
            })
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('GraphQL Server started'))