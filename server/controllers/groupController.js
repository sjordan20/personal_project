

module.exports = {



    getGroups: (req, res) => {
        const db = req.app.get('db')

        db.get_groups()
            .then(groups => res.status(200).send(groups))
            .catch(err => {
                res.sendStatus(500)
            })


    },

    createGroup: (req, res) => {

        const db = req.app.get('db')
        const { id } = req.params
        const { name, group_pic } = req.body
        // id is creator_id

        console.log(req.body)
        db.create_group([id, name, group_pic])
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }
}