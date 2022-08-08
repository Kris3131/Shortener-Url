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
})

module.exports = mongoose.model('Url', urlSchema)
