const express = require('express')
const book = require('./book.route')
const user = require('./user.route')
const auth = require('./auth.route')

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/books', book)

module.exports = router
