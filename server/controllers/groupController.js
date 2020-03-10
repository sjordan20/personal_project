

module.exports = {


    getUserGroup: async (req, res) => {
        const db = req.app.get('db')
        // console.log(req.params)
        const { id } = req.params
        // id is user_id

        const groups = db.get_user_group([id])
            .then(group => res.status(200).send(group))
            .catch(err => {

                res.status(200).send(groups)
            })



    },

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

        // console.log(req.body)
        db.create_group([id, name, group_pic])
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    },

    addMember: (req, res) => {
        const db = req.app.get('db')
        // id=Group =id
        const { group_id } = req.params
        const { user_id } = req.body
        console.log(group_id, user_id)

        db.add_group_member([group_id, user_id])
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }
}