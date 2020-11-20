const express = require('express')
const app = express()
const port = 8080
const  nunjucks = require('nunjucks')

require('dotenv').config()

const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github').Strategy

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


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(request, response) {

	let data = {
		isAuth: request.isAuthenticated()
	}

	response.render('index.html', data)
})

app.get('/search', (request, response) => {

	let data = {
		isAuth: request.isAuthenticated()
	}

	response.render('search.html', data)
})

app.get('/login', (request,response) => {

	let data = {
		isAuth: request.isAuthenticated()
	}

	response.render('login.html', data)
})

app.get('/login/github', passport.authenticate('github'))

app.get('/login/github/callback', passport.authenticate('github', { failureRedirect: '/nope' }),
	(request, response) => {
		response.redirect('/')
	}
)


function ensureAuthenticated(request, response, next) {
	if (request.isAuthenticated()) {
		return next()
	}
	response.redirect('/')
}

app.get('/app', ensureAuthenticated, (request, response) => {
	response.send('okay')
})

app.get('/logout', (request, response) => {
	request.logout()
	response.redirect('/')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
