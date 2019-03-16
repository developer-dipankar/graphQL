const Query = {
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
}

export { Query as default }