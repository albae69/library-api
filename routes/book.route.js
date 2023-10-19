import express from 'express'
const router = express.Router()

import {
  getBooks,
  deleteBook,
  getBookById,
} from '../controller/book.controller.js'

// GET - ALl Books
router.get('/', getBooks)

// GET - Book by id
router.get('/:id', getBookById)

// DELETE - BOOK
router.delete('/:id', deleteBook)

export default router
