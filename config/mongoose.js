const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('err', () => console.log('db connected err'))
db.once('open', () => console.log('db connected success'))

module.exports = db
