import { Request, Response } from 'express'

import { CarInfo, Car } from '../models/index'

interface ICarInfo {
    title: string,
    description: string,
}


export class CarController {

    getCars = async (req: Request, res: Response) => {
        const cars = await Car.findAll()
        res.json(cars)
    }

    addCar = async (req: Request, res: Response) => {
        try {
            const { carModel, carBrand, carProdYear, carInfo } = req.body
            const carImage = req.file.path
            const car = await Car.create({ model: carModel, image: carImage, prodYear: carProdYear })
    
            if (carInfo) {
                const info: ICarInfo[] = JSON.parse(carInfo)
                info.forEach(({ title, description }) => {
                    CarInfo.create({ title, description, carId: car.id })
                })
            }
    
            return res.json(car)
        } catch(e) {
            console.log('errrrror', e)
        }
    
    }

}

export default new CarController()
