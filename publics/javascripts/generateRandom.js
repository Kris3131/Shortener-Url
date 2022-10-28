
const Url = require('../../models/url')
const random = require('randomstring')

async function generateRandom (length) {
  try {
    const randomString = random.generate(5)
    const result = await Url.exists({ randomUrl: randomString })
    return result ? generateRandom(length) : randomString
  } catch (err) {
    console.log(err)
  }
}

module.exports = generateRandom
