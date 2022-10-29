const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { emailValidator, passwordValidator } = require('../helpers/validator-helper')

const usersController = {
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  postRegister: async (req, res, next) => {
  // 抓出 input 的值
    try {
      const errors = []
      const { name, email, password, confirmPassword } = req.body
      if (!email.trim() || !password || !confirmPassword) {
        errors.push({ message: '所有欄位為必填' })
      }
      emailValidator(email, errors)
      passwordValidator(password, confirmPassword, errors)
      if (errors.length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      const existedUser = await User.exists({ email })
      if (existedUser) {
        req.flash('warning_message', '帳號已經存在')
        return res.render('register', { name, email, password, confirmPassword })
      }
      await User.create({ name, email, password: bcrypt.hashSync(password, 10) })
      req.flash('success_message', '帳號註冊成功')
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
