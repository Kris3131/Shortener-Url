const express = require('express')
const urlsController = require('../../controllers/urlsController')

const router = express.Router()

router.get('/:id/edit', urlsController.getURL)

router.put('/:id', urlsController.putURL)
router.delete('/:id', urlsController.deleteURL)
router.get('/:id', urlsController.redirectURL)

router.get('', urlsController.showURLs)
router.post('', urlsController.postURL)

module.exports = router
