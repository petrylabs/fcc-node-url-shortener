const dns = require('node:dns')
require('dotenv').config()

const mongooseUri = process.env['MONGO_URI']
const mongoose = require('mongoose');

mongoose.connect(mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true });

const shortUrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

const submitNewUrl = async (url) => {
  const id = await getUrlCount() + 1
  console.log('id', id);
  
  const shortUrl = new ShortUrl({
    original_url: url,
    short_url: id
  });

  newUrl = await shortUrl.save();
  // console.log('newUrl', newUrl);
  return newUrl;
}

const retrieveUrl = async (shortUrl) => {
  const url = await ShortUrl.findOne({
    short_url: shortUrl
  })
  return url
}

const isValidUrl = (urlString) => {
  const urlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  const testResult = urlRegEx.test(urlString)
  console.log('testResult', testResult)
  return testResult;
  // const url = new URL(urlString);
  // const result = await dns.lookup(url.hostname, {}, (error) => {
  //   return error ? false : true
  // })
  // console.log('result >>', result);
  // return result;
}

const getUrlCount = async (done) => {
  const count = ShortUrl.count();
  return count;
}

exports.isValidUrl = isValidUrl
exports.submitNewUrl = submitNewUrl
exports.retrieveUrl = retrieveUrl
