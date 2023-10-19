import dotenv from 'dotenv/config.js'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import routes
import routes from './routes/index.js'

// init express
const app = express()

// parse body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cors
app.use(cors())

// router
app.get('/', (req, res) => {
  return res.send('<h1>Library API</h1>')
})

app.use('/api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))
