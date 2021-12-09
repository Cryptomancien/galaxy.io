import express, {response} from 'express'
import bodyParser from 'body-parser'
import nunjucks from 'nunjucks'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import {Strategy} from 'passport-github'
import redis from 'redis'

import ensureAuthenticated from './middleware/ensureAuthenticated.mjs'
import User from './models/User.mjs'
import FrontController from './controllers/FrontController.mjs'
import LoginController from './controllers/Auth/LoginController.mjs'

// TODO in routes files
import ContractsController from './controllers/Api/ContractsController.mjs'

dotenv.config()

const port = 8080 // TODO .env
const app = express()

nunjucks.configure('views', {
    autoescape:  true,
    express:  app,
    watch: true,
})

passport.use(
    new Strategy(
        {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackUrl: 'http://localhost:8080/login/github/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        }
    )
)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import ConnectRedis from 'connect-redis'

let RedisStore = ConnectRedis(session)
let redisClient = redis.createClient()

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.session,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser(async (user, done) => {

    const u = await User.findByPk(user.id)
    if (u === null) {

        const data = {
            id: user.id,
            username: user.username,
            avatar_url: user['_json']['avatar_url'],
            provider: user.provider
        }

        await User.create(data)
    }

    await console.log(user)
    await done(null, user)
})

passport.deserializeUser((user, done) =>  done(null, user) )



app.get('/', FrontController.index)
app.get('/search', FrontController.search)
app.get('/contract/:id', FrontController.contract)

app.get('/login', LoginController.index)
app.get('/login/github', passport.authenticate('github'))
app.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/nope' }),
    (request, response) => {
        response.redirect('/app')
    }
)

app.get('/app', ensureAuthenticated, (request, response) => {

    let data = {
        user: request.user
    }

    console.log('--------')

    response.render('app.html', data)
})

app.get('/api/contracts',ensureAuthenticated, ContractsController.all)
app.post('/api/contracts',ensureAuthenticated, ContractsController.store)
app.get('/api/contracts/:id',ensureAuthenticated, ContractsController.show)
app.put('/api/contracts/:id',ensureAuthenticated, ContractsController.update)
app.delete('/api/contracts/:id',ensureAuthenticated, ContractsController.destroy)

app.get('/logout', LoginController.logout)

// TODO movie in api controller
app.get('/api/logged-user', ensureAuthenticated, (request, response) => {
    const user = request.user
    return response.json(user)
})

app.listen(port, () => console.log(`http://localhost:${port}`))


/*

app.get('/contract/:id', FrontController.contract)

app.get('/user/:username', FrontController.user)


app.get('/play', FrontController.play)

app.get('/app', ensureAuthenticated, (request, response) => {

	let data = {
		user: request.user
	}

	console.log('--------')

	response.render('app.html', data)
})
*/