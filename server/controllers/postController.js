module.exports = {
    createPost: (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        const { group_id, content, photo } = req.body
        console.log(req.params)
        console.log(req.body)

        db.create_post([user_id, group_id, content, photo, new Date()])
            .then(() => {
                res.sendStatus(201)
            })
            .catch((err) => {
                console.log(err)
                res.sendStatus(500)
            })
    },

    getPostsGroup: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        // id is group_id
        const posts = await db.get_posts_by_group(id)
        if (posts[0]) {
            posts.forEach((element, index) => {
                posts[index].date = element.date.toDateString()
            })
            res.status(200).send(posts)
        } else {
            res.sendStatus(500)
        }
    },

    getPostsUser: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        // id is user_id
        const posts = await db.get_posts_by_user(id)
        if (posts[0]) {
            posts.forEach((element, index) => {
                posts[index].date = element.date.toDateString()
            })
            res.status(200).send(posts)
        } else {
            res.sendStatus(500)
        }
    },

    searchDate: async (req, res) => {
        const db = req.app.get('db')
        const { date } = req.query
        const { id } = req.params
console.log(req.query.date)

        // id is group_id
        let posts = []
        if (id) {
            posts = await db.search_date([`${date}`, id])
            res.status(200).send(posts)
        } else {
            res.sendStatus(500)
        }
    },

    searchContent: async (req, res) => {
        const db = req.app.get('db')
        const { content } = req.query
        const { id } = req.params

        // id is group_id
        let posts = []
        if (id) {
            posts = await db.search_content([`${content}`, id])
            res.status(200).send(posts)
        } else {
            res.sendStatus(500)
        }
    },

    editPost: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { content } = req.body

        console.log(req.params, req.body)
        db.edit_post([content, id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    },

    deletePost: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.delete_post([id])
            .then(() => {
                res.sendStatus(200)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

}
