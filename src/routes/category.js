import { Router } from 'express'
import categories from "../controllers/categories.js"

const router = Router()

router.get('/api/categories', categories.GET)
router.get('/api/books/:categoryId', categories.GET)
router.post('/api/category', categories.POST)
router.put('/api/category', categories.PUT)
router.delete('/api/category', categories.DELETE)
// router.post('/addcategory', category.POST)


export default router