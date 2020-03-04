module.exports = (req, res, next) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        next()
    }
}