if (process.env.ENV != 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// import routes
const routes = require('./routes')

// init express
const app = express()

// parse body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cors
app.use(cors())

// router
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Library API',
  })
})

app.use('/api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))
