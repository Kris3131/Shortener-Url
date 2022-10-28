const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true
  },
  randomUrl: {
    type: String,
    required: true,
    default: false,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)
