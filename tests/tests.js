const api = require('../api.js')

const urls = [
  'https://ca.yahoo.com',
  'https://ford.ca',
  'https://edition.cnn.com',
  'https://www.lenovo.com',
  'wewqewe',
]

urls.forEach((url) => {
  const result = api.isValidUrl(url);
  console.log('result', result)
});

