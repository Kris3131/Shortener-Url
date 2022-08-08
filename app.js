const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('err', () => console.log(`db connected err`))
db.once('open', () => console.log(`db connected success`))

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, () => {
	console.log(`localhost -> http://localhost:${PORT}`)
})
