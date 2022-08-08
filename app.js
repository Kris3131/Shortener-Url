const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(PORT, () => {
	console.log(`localhost -> http://localhost:${PORT}`)
})
