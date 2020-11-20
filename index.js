const express = require('express')
const app = express()
const port = 8080
const  nunjucks = require('nunjucks')

const passport = require('passport')
const session = require('express-session')
const GithubStrategy = require('passport-github').Strategy

app.use(express.static('public'))

app.use(session({
	secret: 'rzere57r8r7z56rz',
	proxy: true,
	resave: true,
	saveUninitialized: true
}))

nunjucks.configure('views', {
	autoescape:  true,
	express:  app,
	watch: true,
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(request, response) {
	response.render('index.html')
})

app.get('/search', (request, response) => {
	response.render('search.html')
})

app.get('/login', (req,response) => {
	response.render('login.html')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
