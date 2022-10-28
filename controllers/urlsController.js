const Url = require('../models/url')
const generateRandom = require('../publics/javascripts/generateRandom')

const urlsController = {
  getIndexPage: (req, res) => {
    res.render('index')
  },
  postURL: async (req, res, next) => {
    try {
      const { originalUrl } = req.body
      const userId = req.user._id
      const randomString = await generateRandom(7)
      const url = await Url.create({ originalUrl, userId, randomUrl: randomString })
      const shortenUrl = `https://${req.headers.host}/${randomString}`
      return res.render('new', { url, randomUrl: shortenUrl })
    } catch (err) {
      next(err)
    }
  },
  showURLs: async (req, res, next) => {
    try {
      const userId = req.user._id
      const urls = await Url.find({ userId }).lean().sort({ _id: 'asc' })
      return res.render('show', { urls })
    } catch (err) {
      next(err)
    }
  },
  // edit get URL
  getURL: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const url = await Url.findOne({ userId, _id }).lean()
      const defaultUrl = `https://${req.headers.host}/`
      return res.render('edit', { url, defaultUrl, randomUrl: url.randomUrl })
    } catch (err) {
      next(err)
    }
  },
  putURL: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      await Url.findOneAndUpdate({ userId, _id }, { randomUrl: req.body.adjustUrl })
      return res.redirect('/shortURL')
    } catch (err) {
      next(err)
    }
  },
  deleteURL: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const url = await Url.findOne({ userId, _id })
      url.remove()
      return res.redirect('/shortUrl')
    } catch (err) {
      next(err)
    }
  },
  redirectURL: async (req, res, next) => {
    try {
      const randomUrl = req.params.id
      const url = await Url.findOne({ randomUrl })
      url ? res.redirect(`${url.originalUrl}`) : res.status(404).render('404')
    } catch (err) {
      next(err)
    }
  }
}
module.exports = urlsController
