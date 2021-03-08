import { Router } from 'express'

import carRoute from './carRoute'

const router = Router()

router.use('/cars', carRoute)

export default router
