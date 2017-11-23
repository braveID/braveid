const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('config')
const { errors } = require('celebrate')

// this loads all controllers and routes
const routes = require('./api/controllers/index')

const app = express()
let port = 3002

if (config.has('PORT')) {
  port = config.get('PORT')
}

const options = {
  db: { native_parser: true },
  server: { poolSize: 5 }
}

mongoose.Promise = global.Promise
mongoose.connect(config.get('MONGO_URL'), options)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', () => {
  console.log('Conecção com DB bem sucedida!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(routes)
app.listen(port)
app.use(errors())

module.exports = app

console.log(`GAMER ID RESTful API server started on: ${port}`)
