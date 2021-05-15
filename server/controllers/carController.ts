import { Request, response, Response } from 'express'

import { CarInfo, Car, Brand } from '../models/index'

interface ICarInfo {
    title: string,
    description: string,
}


class CarController {

    fetchCars = async (req: Request, res: Response) => {
        const cars = await Car.findAll()
        res.json(cars)
    }

    fetchBrands = async (req: Request, res: Response) => {
        const brands = await Brand.findAll()
        res.json(brands)
    }

    addCar = async (req: Request, res: Response) => {
        try {
            const { carModel, carBrand, carProdYear, carInfo } = req.body
            // const carImage = req.file.path
            // const car = await Car.create({ model: carModel, image: carImage, prodYear: carProdYear })

            // if (carInfo) {
            //     const info: ICarInfo[] = JSON.parse(carInfo)
            //     info.forEach(({ title, description }) => {
            //         CarInfo.create({ title, description, carId: car.id })
            //     })
            // }
            return res.json({ message: 'created' })
        } catch (e) {
        }
    }

}

export default new CarController()
