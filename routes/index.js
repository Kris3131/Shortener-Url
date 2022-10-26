const express = require('express')
const users = require('./modules/users')
const urlShortener = require('./modules/urlShortener')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/', authenticator, urlShortener)

module.exports = router
