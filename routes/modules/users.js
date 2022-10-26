const express = require('express')
const passport = require('passport')
const router = express.Router()

const usersController = require('../../controllers/usersController')

router.get('/register', usersController.getRegisterPage)
router.post('/register', usersController.postRegister)

router.get('/login', usersController.getLoginPage)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/logout', usersController.getLogout)

router.get('/forgot-password', (req, res, next) => {
  req.render('forgot-password')
})

module.exports = router
