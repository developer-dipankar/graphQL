const Subscription = {
    count: {
        subscribe(parent, args, {pubsub}, info) {
            let count = 0;

            setInterval(() => {
                count++;
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count');
        }
    },

    user: {
        subscribe(parent, {uid}, {db, pubsub}, info) {
            const checkUser = db.users.find((item) => item.id === uid)
            if(!checkUser) {
                throw new Error('User not found')
            }

            return pubsub.asyncIterator(`user ${uid}`)
        }
    }
}

export { Subscription as default }