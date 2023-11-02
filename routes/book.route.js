import express from 'express'

import {
  getBooks,
  deleteBook,
  getBookById,
  createBook,
} from '../controller/book.controller.js'
import { verifToken } from '../middleware/auth.js'
import { uploadFile } from '../middleware/multer.js'

const router = express.Router()

// GET - ALl Books
router.get('/', getBooks)

// GET - Book by id
router.get('/:id', getBookById)

// DELETE - BOOK
router.post('/:id/delete', verifToken, deleteBook)

// POST - Create Book
router.post('/', verifToken, uploadFile, createBook)

export default router
