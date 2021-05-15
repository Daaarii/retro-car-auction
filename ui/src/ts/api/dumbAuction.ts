import { Fuel, Equipment, SteeringWheelLocation, Rating, Transmission } from '../entities/auction'

const data = 'Здесь текст для файла или положите в переменную Blob'
const file = new File([data], 'primer.txt', {type: 'text/plain'})

var dt = new DataTransfer()
dt.items.add(file)
dt.items.add(file)
dt.items.add(file)
dt.items.add(file)
const file_list = dt.files

export default {
    model: 'model',
    brand: 'brand',
    prodYear: '1980',
    carCondition: '10',
    carInfo: {
        historyOfTheCar: new Array(15).fill('loremlorem').join('-'),
        engineCapacity: '1000',
        carInteriorRating: Rating.A,
        numberOfDoors: '5',
        carMileage: '100',
        carColor: 'yellow',
        fuelType: Fuel.Petrol,
        carInteriorColor: 'creme',
        serviceLife: '41',
        steeringWheelLocation: SteeringWheelLocation.Left,
        transmission: Transmission.AT,
        equipment: [Equipment.AC, Equipment.PS].join(','),
        numberOfSeatsInTheCar: '4',
        files: dt.files,
    },
    auctionStartTime: '2021-05-10T14:15:31',
    auctionEndTime: '2021-05-10T14:15:31',
    startPrice: '4000',
    minBid: '100',
}
