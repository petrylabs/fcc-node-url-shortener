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
  console.log('newUrl', newUrl);
  return newUrl;
}

const retrieveUrl = async (shortUrl) => {
  const url = await ShortUrl.findOne({
    short_url: shortUrl
  })
  return url
}

const isValidUrl = async (url) => {
  const dnsLookupResult = await dns.lookup(url, {}, (a,b,c) => {
    console.log(a,b,c)
  });
  console.log('dnsLookupResult', dnsLookupResult)
  return false
}

const getUrlCount = async (done) => {
  const count = ShortUrl.count();
  return count;
}

exports.isValidUrl = isValidUrl
exports.submitNewUrl = submitNewUrl
exports.retrieveUrl = retrieveUrl
