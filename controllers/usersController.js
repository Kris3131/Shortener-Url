const User = require('../models/user')
const validator = require('validator')

const usersController = {
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  postRegister: async (req, res, next) => {
  // 抓出 input 的值
    try {
      const { name, email, password, confirmPassword } = req.body
      const errors = []
      if (!email.trim() || !password || !confirmPassword) {
        errors.push({ message: '所有欄位為必填' })
      }
      if (!validator.isEmail(email)) { errors.push({ message: 'Email 格式不符' }) }
      const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,20}$/
      if (!passwordFormat.test(password)) {
        errors.push({ message: '密碼長度必須 8 ~ 20 字元，包含數字和英文字母' })
      }
      if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認不同' })
      }
      if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      const existedUser = await User.exists({ email })
      if (existedUser) {
        errors.push({ message: '帳號已經存在' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      await User.create({ name, email, password })
      res.redirect('/users/login')
    } catch (err) {
      next(err)
    }
  },
  getLoginPage: (req, res) => {
    res.render('login')
  },
  postLogout: (req, res, next) => {
    req.logout(function (err) {
      if (err) { return next(err) }
      req.flash('success_message', '成功登出')
      res.redirect('/users/login')
    })
  }

}
module.exports = usersController
