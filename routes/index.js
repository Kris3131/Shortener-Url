const express = require('express')
const users = require('./modules/users')
const url = require('./modules/url')
const auth = require('./modules/auth')
const urlsController = require('../controllers/urlsController')

const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/shortURL', authenticator, url)
router.use('/', authenticator, urlsController.getIndexPage)

module.exports = router
