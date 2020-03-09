module.exports = {

    createPost: (req, res) => {
        const db = req.app.get('db')
        const { group_id } = req.params
        const { user_id, content, photo, date } = req.body

        db.create_post([group_id, user_id, content, photo, date])
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }
}