'use strict'
const nodemailer = require('nodemailer')
require('dotenv').config()
async function sendResetPassword (clientEmail, link) {
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'yourEmail@gmail.com',
      pass: 'yourPass'
    }
  })
  const options = {
    from: process.env.USER,
    to: clientEmail,
    subject: '重設 Password ',
    html: `
     <h2>重設 Password 連結 
       <a href=${link}>${link}</a>
     </h2>
        <h2>請在 60 分鐘內重設密碼</h2>`
  }

  await transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('訊息發送' + info.response)
    }
  })
}

module.exports = { sendResetPassword }
