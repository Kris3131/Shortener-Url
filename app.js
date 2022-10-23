const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('express-session')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()

}
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('publics'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
const sessionOption ={
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}
if(app.get('env') === 'production') {
	app.set('trust proxy',1)
	sessionOption.cookie.secure = true
}
app.use(session(sessionOption))
app.use(routes)

app.listen(PORT, () => {
	console.log(`localhost -> http://localhost:${PORT}`)
})
