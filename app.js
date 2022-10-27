if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
const passport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

// handlebars
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
  })
)
app.set('view engine', 'hbs')

// static files, body-parser, method-override
app.use(express.static('publics'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// session
const sessionOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionOption.cookie.secure = true
}
app.use(session(sessionOption))

// passport
app.use(passport.initialize())
app.use(passport.session())

// flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_message = req.flash('success_message')
  res.locals.warning_message = req.flash('warning_message')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`localhost -> http://localhost:${PORT}`)
})
