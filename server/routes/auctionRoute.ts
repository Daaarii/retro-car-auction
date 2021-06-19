import { Router } from 'express'

import auctionController from '../controllers/auctionController'

import isAuth from '../middlewares/isAuth'

const router = Router()

router.get('/list', auctionController.fetchAuctions)
router.get('/applications', auctionController.fetchApplications)
router.post('/add_country', auctionController.addCountry)
router.post('/add_brand', auctionController.addBrand)
router.get('/countries', auctionController.getCountries)
router.get('/statuses', auctionController.fetchAuctionStatuses)
// router.post('/create_auction', isAuth, auctionController.createAuction)
router.post('/accept_application', auctionController.acceptApplication)
router.get('/reject_application/:id', auctionController.rejectApplication)
router.post('/make_request', isAuth, auctionController.makeRequest)
router.post('/register_in_auction', isAuth, auctionController.registerInAuction)
router.post('/place_a_bid', auctionController.placeABid)
router.get('/bids', auctionController.fetchBids)

router.get('/application/:id', auctionController.fetchApplication)
router.get('/:id', auctionController.fetchAuction)

export default router
