import { Router } from 'express'

import authController from '../controllers/authController'

const router = Router()


router.post('/sign_up', authController.signUp)
router.post('/sign_in', authController.signIn)

export default router
