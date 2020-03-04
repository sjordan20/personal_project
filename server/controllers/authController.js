const bcrypt = require("bcryptjs");

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db");
        const { username, password } = req.body;
        console.log(password)
        let user = await db.check_user(username);
        user = user[0];
        if (user) {
            return res.status(400).send("Username Already Exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        try {
            let newUser = await db.register_user({ username, hash });
            newUser = newUser[0];
            req.session.user = newUser;
            return res.status(201).send(req.session.user);
        } catch (err) {
            return res.sendStatus(500);
        }
    },

    login: async (req, res) => {
        const db = req.app.get("db");
        const { username, password } = req.body;

        let user = await db.check_user(username);
        user = user[0];
        if (!user) {
            return res.status(400).send("Email not found");
        }

        const authenticated = bcrypt.compareSync(password, user.password);
        if (authenticated) {
            delete user.password;
            req.session.user = user;
            return res.status(200).send(req.session.user);
        } else {
            return res.status(400).send("Incorrect password or username");
        }
    },

    logout: (req, res) => {
        if (req.session) req.session.destroy()
        return res.sendStatus(200)
    }
};
