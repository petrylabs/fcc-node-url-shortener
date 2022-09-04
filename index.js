const express = require('express');
const api = require('./api.js');
const cors = require('cors')

const bodyParser = require('body-parser');


const app = express();

app.use(cors())

app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.route('/api/shorturl')
  .post(async(req, res) => {
    console.log('POST Request', req.body);
    const url = req.body.url
    const isValidUrl = api.isValidUrl(url)
    let resObj = {}
    console.log('isValidUrl', isValidUrl)
    if (isValidUrl) {
      newUrl = await api.submitNewUrl(url)
      resObj = newUrl
    }
    else {
      resObj = {
        error: 'invalid url'
      }
    }
    res.json(resObj)
  })

app.get('/api/shorturl/:url', async (req, res) => {
  const url = req.params.url
  let resObj = {}
  apiResponse = await api.retrieveUrl(url)
  if(apiResponse) {
    res.writeHead(301, {
      Location: apiResponse.original_url 
    })
    res.end()
  }
})

app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.listen(3000, () => {
  console.log('server started at port 3000');
});

/*
'https://node-js-url-shortener.petrylabs.repl.co/?v=1662143167790
*/