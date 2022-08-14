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
						helpers: {
							copyToCliBoard: function copyToCliBoard() {
								const copyText = this.getElementById('copyUrlInput')
								copyText.select()
								copyText.setSelectionRange(0, 99999) /* For mobile devices */
								this.execCommand('copy')
								alert('Copied the text: ' + copyText.value)
							},
						},
					})
				})
				.catch((err) => console.log(err))
		} else {
			// 輸入相同網址時，會導入 show 頁面，呈現所有製作過的URL
			res.redirect('/shortUrl')
		}
	})
})
router.get('/shortUrl', (req, res) => {
	Url.find()
		.lean()
		.sort({ _id: 'desc' })
		.then((url) => res.render('show', { url }))
		.catch((err) => console.log(err))
})
router.get('/shortUrl/:id', (req, res) => {
	const id = req.params.id
	Url.findById(id)
		.lean()
		.then((url) => res.render('edit', { url, defaultUrl: url.defaultUrl }))
		.catch((err) => console.log(err))
})
router.put('/shortUrl/:id', (req, res) => {
	const id = req.params.id
	const adjustUrl = req.body.adjustUrl
	Url.findByIdAndUpdate(id, { defaultUrl: adjustUrl })
		.lean()
		.then((url) => {
			Url.findById(id)
				.lean()
				.then((url) => {
					res.render('new', {
						url,
						defaultUrl: url.defaultUrl,
						short: url.short,
					})
				})
				.catch((err) => console.log(err))
		})
		.catch((err) => console.log(err))
})

router.delete('/shortUrl/:id', (req, res) => {
	const id = req.params.id
	Url.find()
		.lean()
		.then((url) => {
			Url.findById(id)
				.then((url) => url.remove())
				.catch((err) => console.log(err))
			return
		})
		.then((url) => res.redirect('/shortUrl'))
		.catch((err) => console.log(err))

	// Url.findByIdAndRemove(id)
	// 	.lean()
	// 	.then(() => res.redirect('/'))
	// 	.catch((err) => console.log(err))
})

router.get('/:id', (req, res) => {
	Url.findOne({ short: req.params.id })
		.then((url) => {
			url === null ? res.redirect('/') : res.redirect(url.full)
		})
		.catch((err) => console.log(err))
})

module.exports = router
