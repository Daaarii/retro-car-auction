import { Router } from 'express'

import carController from '../controllers/carController'

import isAuth from '../middlewares/isAuth'

const router = Router()

router.get('/', carController.fetchCars)

router.post('/add_car', isAuth, carController.addCar)
router.get('/brands', carController.fetchBrands)

export default router
