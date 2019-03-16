import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';

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
                return ctx.db.users;
            }
            return ctx.db.users.filter((item) => {return item.fullname.toLowerCase().includes(args.Query.toLowerCase())})
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
        posts(parent, args, {db}, info) {
            if(!args.Query) {
                return db.posts;
            }
            return db.posts.filter((item) => {
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
        posts(parent, args, {db}, info) {
            // console.log(parent.posts)
            if (parent.posts !== undefined) {
                return db.posts.filter((item) => {
                    return parent.posts.includes(parseInt(item.id))
                })
            }
            return []
        }
    },
    Mutation: {
        createUser(parent, args, {db}, info) {
            const emailTaken = db.users.some((item) => item.email === args.email)
            if (emailTaken) {
                throw new Error('Email is already existed')
            }

            const user = {
                id: uuidv4(),
                ...args
            }

            db.users.push(user);
            return user;
        },

        createPost(parent, args, {db}, info) {
            const post = {
                id: uuidv4(),
                ...args.data
            }

            db.posts.push(post);
            return post
        },

        deleteUser(parent, args, {db}, info) {
            const userIndex = db.users.findIndex((item) => item.id === args.id)
            if (userIndex === -1) {
                throw new Error('User not found');
            }

            db.users.splice(userIndex, 1);
            return 'User deleted successfull'
        }
    }
}

const server = new GraphQLServer({
    'typeDefs': './schema.graphql',
    resolvers,
    context: {
        db
    }
});
server.start(() => console.log('GraphQL Server started'))