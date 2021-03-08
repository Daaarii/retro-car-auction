import { ICar } from '../Store/CarStore'


const apiUrl = 'http://localhost:3001'

class RetroCarAuctionClient {

    public getCars() {
        return fetch(`${apiUrl}/cars`)
    }

    public addCar(data: FormData) {
        return fetch(`${apiUrl}/cars/add_car`, {
            method: 'POST',
            body: data,
        })
    }

    public editCar(data: any) {
        return fetch(`${apiUrl}/cars/edit_car`, {
            method: 'POST',
            body: data,
        })
    }

    public deleteCar() {
        return fetch(`${apiUrl}/deleteCar:id`, {
            method: 'DELETE',
        })
    }

}

export default new RetroCarAuctionClient()
