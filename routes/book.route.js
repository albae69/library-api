import express from 'express'
import multer, { diskStorage } from 'multer'

import {
  getBooks,
  deleteBook,
  getBookById,
  createBook,
} from '../controller/book.controller.js'
import { verifToken } from '../middleware/auth.js'

const router = express.Router()
const upload = multer({
  limits: { fileSize: 5120 }, // limit 5mb
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, res, cb) => {
      cb(
        null,
        `${res.fieldname}-${Date.now()}-${res.originalname.split('.')[0]}.${
          res.mimetype.split('/')[1]
        }`
      )
    },
  }),
})
// GET - ALl Books
router.get('/', getBooks)

// GET - Book by id
router.get('/:id', getBookById)

// DELETE - BOOK
router.post('/:id/delete', verifToken, deleteBook)

// POST - Create Book
router.post('/', verifToken, upload.single('book_image'), createBook)

export default router
