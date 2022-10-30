# 不只是縮短網址2.0 URL Shortener

---

## 專案介紹

第一次嘗試短網址產生器 1.0 就覺得很有趣，這個版本是 2.0 的進階版，與第一版的差異在新增 User model，使用者登入後才可以使用縮短網址的功能，並且新增忘記密碼的功能，讓金魚腦的我可以重新設定密碼。

---

## 功能

- Google 第三方登入
- 忘記密碼
- 縮短網址
- 查看網址清單
- 修改預設 URL 
- 刪除清單網址

---

## 開發工具

- [node.js@6.14.2](https://nodejs.org/zh-tw/download/)
- [express@4.18.1](https://www.npmjs.com/package/express)
- [express-handlebars@6.0.0](https://www.npmjs.com/package/express-handlebars)
- [method-override@3.0.0](https://www.npmjs.com/package/method-override)
- [mongoose@6.5.1](https://www.npmjs.com/package/mongoose)
- [random-string@1.2.2](https://www.npmjs.com/package/random-string)
- [express-session@1.17.3](https://www.npmjs.com/package/express-session)
- [jsonwebtoken@8.5.1](https://www.npmjs.com/package/jsonwebtoken)
- [nodemailer@6.8.0](https://www.npmjs.com/package/nodemailer)
- [passport@0.6.0](https://www.npmjs.com/package/passport)
- [passport-google-oauth20@2.0.0](https://www.npmjs.com/package/passport-google-oauth20)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [validator](https://www.npmjs.com/package/validator)
---

## 開始使用

1. 下載專案`git clone git@github.com:Kris3131/Shortener-Url.git`

2. 安裝套件`npm install`

3. 建立`.env`檔，所需要的 `env` 變數可以在 `.env.sample`檔案中找到

4. nodemailer 設定比較多步驟，可以參考 [nodemailer 官方手冊](https://nodemailer.com/usage/using-gmail/)

5. `npm run dev`啟動 localhost

---

## 專案畫面

登入畫面
![alt text](/publics/images/login.png)
寄送重設密碼信件
![alt text](/publics/images/reset-password.png)
縮短網址
![alt text](/publics/images/shorten-url.png)
成功縮短網址
![alt text](/publics/images/shorten-url-success.png)
短網址清單
![alt text](/publics/images/shorten-url-list.png)
