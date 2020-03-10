module.exports = {

    createPost: (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        const { group_id, content, photo } = req.body
        // console.log(req.params)
        // console.log(req.body)

        db.create_post([user_id, group_id, content, photo, new Date()])
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    },
    getPosts: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        const posts = await db.get_posts(id)
        if (posts[0]) {
            posts.forEach((element, index) => {
                posts[index].date = element.date.toDateString()
            })
            res.status(200).send(posts)
        } else {
            res.sendStatus(500)
        }
    }
}