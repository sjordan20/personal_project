require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')


const checkUser = require('./middleware/checkUser')
const authCtrl = require('./controllers/authController')
const groupCtrl = require('./controllers/groupController')


const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
}))


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('||-----DATABASE IS HERE TO PARTY---||')
    app.listen(SERVER_PORT, () => console.log(`||--SERVER RUNNING ON ${SERVER_PORT}--||`))
})


// Auth Endpoints

app.post('/api/register', checkUser, authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post(`/api/logout`, authCtrl.logout)
app.get('/api/check', checkUser)

app.get('/api/signs3', groupCtrl.groupPhoto)