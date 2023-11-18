import express from 'express'
import blogController from '../controllers/blogController.js'
import todoController from '../controllers/todoController.js'
import authController from '../controllers/authController.js'
import requireAuth from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/blogs', blogController.get_allblogs)
router.get('/blogs/:id', blogController.get_details)
router.post('/blogs/create', requireAuth, blogController.post_newblog)
router.patch('/blogs/:id', requireAuth, blogController.update_blog)
router.delete('/blogs/:id', requireAuth, blogController.delete_blog)

router.route('/todo').get(todoController.get_alltodos).post(todoController.post_newtodo)
router.delete('/todo/:id', todoController.delete_todo)

router.post('/signup', authController.post_signup)
router.post('/login', authController.post_login)
router.get('/logout', authController.get_logout)
router.post('/forgetpassemail', authController.post_forgetpassemail)
router.patch('/resetpass/:id', authController.patch_resetpass)
router.delete('/deleteaccount', authController.delete_account)

router.get('/onloadauth', authController.get_onloadauth)

export default router