import uuidv4 from 'uuid/v4';

const Mutation = {
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


export { Mutation as default }