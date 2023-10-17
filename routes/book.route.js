const express = require('express')
const router = express.Router()

const { getBooks, deleteBook } = require('../controller/book.controller')

// GET - ALl Books
router.get('/', getBooks)

// DELETE - BOOK
router.delete('/:id', deleteBook)

module.exports = router
