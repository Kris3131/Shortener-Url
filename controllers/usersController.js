const User = require('../models/user')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const usersController = {
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  postRegister: async (req, res, next) => {
  // 抓出 input 的值
    try {
      const errors = []
      let { name, email, password, confirmPassword } = req.body
      if (!email.trim() || !password || !confirmPassword) {
        errors.push({ message: '所有欄位為必填' })
      }

      if (!validator.isEmail(email)) {
        errors.push({ message: 'Email 格式不符' })
        email = ''
      }
      const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,20}$/
      if (!passwordFormat.test(password)) {
        errors.push({ message: '密碼長度必須 8 ~ 20 字元，包含數字和英文字母' })
        password = ''
        confirmPassword = ''
      }
      if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認不一致' })
        password = ''
        confirmPassword = ''
      }
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
