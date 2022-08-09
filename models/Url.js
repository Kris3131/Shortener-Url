const mongoose = require('mongoose')
const randomstring = require('randomstring')

const urlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
		unique: true,
	},
	short: {
		type: String,
		required: true,
		default: randomstring.generate(5),
	},
	defaultUrl: {
		type: String,
		default: 'https://urlShortener.herokuapp.com/',
	},
})

module.exports = mongoose.model('Url', urlSchema)
