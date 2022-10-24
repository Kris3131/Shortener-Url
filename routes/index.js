const express = require('express')
const users = require('./modules/users')
const urlShortener = require('./modules/urlShortener')
const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/users', users)
router.use('/', authenticator, urlShortener)

module.exports = router
