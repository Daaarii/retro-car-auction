import { Router } from 'express'

import userController from '../controllers/userController'
import isAuth from '../middlewares/isAuth'

const router = Router()

router.get('/', () => {})
router.get('/get_user_data/:id', isAuth, userController.getUserData)

export default router
