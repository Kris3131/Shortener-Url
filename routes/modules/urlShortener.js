const express = require('express')
const Url = require('../../models/Url')
const router = express.Router()

router.get('/', (req, res) => {
	Url.find()
		.lean()
		.then((url) => res.render('index', { url }))
		.catch((err) => console.log(err))
})

router.post('/shortUrl', (req, res) => {
	Url.create({ full: req.body.fullUrl })
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router
