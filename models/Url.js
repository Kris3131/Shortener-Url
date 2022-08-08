const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
		unique: true,
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	defaultUrl: {
		type: String,
		default: 'https://urlShortener.herokuapp.com/',
	},
})

module.exports = mongoose.model('Url', urlSchema)
