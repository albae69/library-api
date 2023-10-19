import express from 'express'
const router = express.Router()

import { getBooks, deleteBook } from '../controller/book.controller.js'

// GET - ALl Books
router.get('/', getBooks)

// DELETE - BOOK
router.delete('/:id', deleteBook)

export default router
