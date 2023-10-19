import express from 'express'
import book from './book.route.js'
import user from './user.route.js'
import auth from './auth.route.js'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/books', book)

export default router
