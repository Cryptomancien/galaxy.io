const express = require('express')
const app = express()
const port = 8080
const  nunjucks = require('nunjucks')
const axios = require('axios');

require('dotenv').config()

const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github').Strategy

const FrontController = require('./controllers/FrontController')
const ensureAuthenticated = require('./middleware/ensureAuthenticated')

nunjucks.configure('views', {
	autoescape:  true,
	express:  app,
	watch: true,
})

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

app.use(session({
	secret: process.env.session,
	proxy: true,
	resave: true,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})


app.get('/', FrontController.index)

app.get('/search', FrontController.search)

app.get('/login', FrontController.login)

app.get('/login/github', passport.authenticate('github'))

app.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/nope' }),
	(request, response) => {
		response.redirect('/')
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

app.listen(port, () => console.log(`http://localhost:${port}`))
