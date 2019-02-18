const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const request = require('request');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const routes = require('./router/index')
const mongo = require('./controllers/mongo')
var _ = require('lodash');

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use('/', routes)
  

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

