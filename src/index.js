const express = require('express')

const cors = require('cors')

require('dotenv').config()

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  app.use(cors())

  next()
})

app.use(express.json())

app.use(
  express.urlencoded({
    extended: false,
  }),
)

require('./app/controllers/index')(app)

app.listen(process.env.PORT || 3000)
