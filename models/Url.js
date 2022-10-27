const mongoose = require('mongoose')
const Schema = mongoose.Schema
const randomstring = require('randomstring')

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  randomUrl: {
    type: String,
    required: true,
    default: randomstring.generate(5)
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
