const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
const  nunjucks = require('nunjucks')
const axios = require('axios');

require('dotenv').config()

const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github').Strategy

const mongoose = require('mongoose')

const FrontController = require('./controllers/FrontController')
const RepositoriesController = require('./controllers/Api/RepositoriesController')
const SmartsContractsController = require('./controllers/Api/SmartsContractsController')
const ensureAuthenticated = require('./middleware/ensureAuthenticated')

nunjucks.configure('views', {
	autoescape:  true,
	express:  app,
	watch: true,
})

mongoose.connect('mongodb://localhost:27017/galaxy', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
const User = require('./models/User')
const SmartContract = require('./models/SmartContract')


passport.use(
	new GithubStrategy(
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

app.use(session({
	secret: process.env.session,
	proxy: true,
	resave: true,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser(async (user, done) => {

	await User.findOneAndUpdate(
		{
			id: user['_json']['id'],
		},
		{
			username: user.username,
			avatar_url: user['_json']['avatar_url'],
			provider: user.provider
		},
		{
			upsert: true,
			setDefaultsOnInsert: true
		}
	)

	await console.log(user)
	await done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})


app.get('/', FrontController.index)

app.get('/get-started', FrontController.getStarted)

app.get('/search', FrontController.search)

app.get('/smart-contract/:id', FrontController.smartContract)

app.get('/login', FrontController.login)

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

	//console.log(data)

	console.log('--------')

	//const url = 'https://api.github.com/repos/netwarp/galaxy-hello-world/contents/galaxy.json'
	//axios(url).then(resp => console.log(resp))

	response.render('app.html', data)
})

app.get('/logout', FrontController.logout)

app.get('/api/repositories', RepositoriesController.index)
app.post('/api/repositories', RepositoriesController.store)

app.get('/api/sc', SmartsContractsController.all)
app.post('/api/sc/store', SmartsContractsController.store)

app.use((request, response) => {
	if (request.user) {
		return response.redirect('/app')
	}

	return response.redirect('/')
})

app.listen(port, () => console.log(`http://localhost:${port}`))
