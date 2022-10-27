const Url = require('../models/Url')

const urlsController = {
  getIndexPage: (req, res) => {
    res.render('index')
  },
  postURL: async (req, res, next) => {
    const { originalUrl } = req.body
    try {
      const userId = req.user._id
      const url = await Url.create({ originalUrl, userId })
      const shortenUrl = `http://${req.headers.host}/${url.randomUrl}`
      return res.render('new', {
        url,
        randomUrl: shortenUrl
      })
    } catch (err) {
      next(err)
    }
  },
  showURLs: async (req, res, next) => {
    try {
      const userId = req.user._id
      const url = await Url.find({ userId }).lean().sort({ _id: 'asc' })
      const defaultUrl = `http://${req.headers.host}/`
      return res.render('show', { url, defaultUrl })
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
      const defaultUrl = `http://${req.headers.host}/`
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
      const url = Url.findOne({ short: req.params.id })
      url === null ? res.redirect('/') : res.redirect(url.originalUrl)
    } catch (err) {
      next(err)
    }
  }
}
module.exports = urlsController
