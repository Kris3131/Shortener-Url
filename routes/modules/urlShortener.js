const express = require('express')
const Url = require('../../models/Url')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('index')
})
router.post('/shortUrl', (req, res) => {
	const fullUrl = req.body.fullUrl
	Url.findOne({ full: fullUrl }).then((url) => {
		if (!url) {
			Url.create({ full: fullUrl })
				.then((url) => {
					res.render('new', {
						url,
						defaultUrl: url.defaultUrl,
						short: url.short,
					})
				})
				.catch((err) => console.log(err))
		} else {
			res.redirect('/')
		}
	})
})

module.exports = router
