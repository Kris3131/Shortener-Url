const express = require('express')
const passport = require('../../config/passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/register', (req, res, next) => {
  res.render('register')
})
router.post('/register', (req, res, next) => {
  // 抓出 input 的值
  const { name, email, password, confirmPassword } = req.body
  // 從 User model 中找出有沒有已經註冊的 user email，有->重新導回 register page ，並把 name 從新渲染到畫面。
  // 沒有->將 user 資料 存到 User model
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('使用者已經存在 ')
        res.render('register', { name, password, confirmPassword })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})
router.get('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
