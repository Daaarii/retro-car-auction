import { Router } from 'express'

import carRouter from './carRoute'
import userRouter from './userRoute'
import authRouter from './authRoute'
import auctionRouter from './auctionRoute'

const router = Router()

router.use('/cars', carRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/auction', auctionRouter)

export default router
