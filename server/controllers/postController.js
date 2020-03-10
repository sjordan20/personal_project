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
            .catch(() => {
                res.sendStatus(500)
            })
    }
}