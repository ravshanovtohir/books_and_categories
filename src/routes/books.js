import { Router } from 'express'
import books from "../controllers/books.js"
import modelBook from '../model/model.book.js'

const router = Router()

router.get('/api/books', books.GET)
router.get('/api/books/:bookId', books.GET)
router.post('/api/books', books.POST)
router.put('/api/books', books.PUT)
router.delete('/api/books', books.DELETE)
// router.post('/addcategory', category.POST)


export default router