const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, req.flash('warning_message', '帳號沒有註冊'))
      }
      const passwordCheck = await bcrypt.compare(password, user.password)
      if (!passwordCheck) {
        return done(null, false, req.flash('warning_message', '帳號或密碼有誤'))
      }
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  }))
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
async function (accessToken, refreshToken, profile, done) {
  const { name, email } = profile._json
  try {
    let userData = await User.findOne({ email })
    if (!userData) {
      const randomPassword = Math.random().toString(36).slice(-8)
      const password = bcrypt.hashSync(randomPassword, 10)
      userData = await User.create({ name, email, password })
    }
    return done(null, userData)
  } catch (err) {
    done(err, false)
  }
}

))
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean()
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
