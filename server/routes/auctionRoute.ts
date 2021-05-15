import { Router } from 'express'

import auctionController from '../controllers/auctionController'

import isAuth from '../middlewares/isAuth'

const router = Router()

router.post('/create_auction', isAuth, auctionController.createAuction)

export default router
