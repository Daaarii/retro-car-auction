import { Router } from 'express'

import carController from '../controllers/carController'

const carsRouter = Router()

carsRouter.get('/', carController.getCars)

carsRouter.post('/add_car', carController.addCar)
carsRouter.get('/', carController.getCars)

export default carsRouter
