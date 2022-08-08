const express = require('express')
const urlShortener = require('./modules/urlShortener')

const router = express.Router()

router.use('/', urlShortener)

module.exports = router
