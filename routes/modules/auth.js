const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const JWT_SECRET = process.env.JWT_SECRET
const { sendResetPassword } = require('../../helpers/email-helper')
const { passwordValidator } = require('../../helpers/validator-helper')

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/reset-password', (req, res, next) => {
  res.render('forgot-password')
})

router.post('/reset-password', async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.locals.warning_message = '沒有註冊帳號'
      return res.render('register', { email })
    }
    const secret = JWT_SECRET + user.password
    const payload = {
      email: user.email,
      id: user._id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '60m' })
    const link = `http://${req.headers.host}/auth/reset-password/${user._id}/${token}`
    await sendResetPassword(email, link)
    res.locals.success_message = 'Password reset 連結已經寄出'
    res.render('forgot-password', { email })
  } catch (err) {
    next(err)
  }
})
router.get('/reset-password/:id/:token', async (req, res, next) => {
  try {
    const { id, token } = req.params
    const user = await User.findById(id)
    if (!user) { req.flash('warning_message', '帳號錯誤') }
    const secret = JWT_SECRET + user.password
    jwt.verify(token, secret)
    res.render('reset-password', { id, token })
  } catch (err) {
    next(err)
  }
})
router.post('/reset-password/:id/:token', async (req, res, next) => {
  try {
    const { id, token } = req.params
    const { password, confirmPassword } = req.body
    const user = await User.findById(id)
    if (!user) { req.flash('warning_message', '沒有註冊帳號') }
    const secret = JWT_SECRET + user.password
    jwt.verify(token, secret)
    const errors = []
    if (!password || !confirmPassword) {
      errors.push({ message: '所有欄位為必填' })
    }
    passwordValidator(password, confirmPassword, errors)
    if (errors.length) {
      return res.render('reset-password', { errors, password, confirmPassword })
    }
    await User.updateOne({ password: bcrypt.hashSync(password, 10) })
    req.flash('success_message', '密碼重設成功，請重新登入')
    res.redirect('/users/login')
  } catch (err) {
    next(err)
  }
})
module.exports = router
