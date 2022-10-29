const validator = require('validator')

function emailValidator (email, errors = []) {
  if (!validator.isEmail(email)) {
    errors.push({ message: 'Email 格式不符' })
  }
  return errors
}
function passwordValidator (password, confirmPassword, errors = []) {
  const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,20}$/
  if (!passwordFormat.test(password)) {
    errors.push({ message: '密碼長度必須 8 ~ 20 字元，包含數字和英文字母' })
    password = ''
    confirmPassword = ''
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認不一致' })
  }
  return errors
}

module.exports = { emailValidator, passwordValidator }
