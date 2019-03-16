const User = {
    posts(parent, args, {db}, info) {
        // console.log(parent.posts)
        if (parent.posts !== undefined) {
            return db.posts.filter((item) => {
                return parent.posts.includes(parseInt(item.id))
            })
        }
        return []
    }
}

export {User as default }