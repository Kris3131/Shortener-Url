const express = require('express')
const users = require('./modules/users')
const urlShortener = require('./modules/urlShortener')

const router = express.Router()

router.use('/users', users)
router.use('/', urlShortener)
module.exports = router
