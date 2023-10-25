import express from 'express'
const router = express.Router()

import {
  getBooks,
  deleteBook,
  getBookById,
  createBook,
} from '../controller/book.controller.js'
import { verifToken } from '../middleware/auth.js'

// GET - ALl Books
router.get('/', getBooks)

// GET - Book by id
router.get('/:id', getBookById)

// DELETE - BOOK
router.post('/:id/delete', verifToken, deleteBook)

// POST - Create Book
router.post('/', verifToken, createBook)

export default router
