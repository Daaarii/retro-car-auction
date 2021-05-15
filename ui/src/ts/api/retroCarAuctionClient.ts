import { client, authClient } from '../utils/enhancedFetch'
import { ISignInData, ISignUpData } from '../entities/auth'
import { IAuctionData } from '../entities/auction'

class RetroCarAuctionClient {

    getCars() {
        return client('cars')
    }

    addCar(data: FormData) {
        return authClient('add_car', {
            method: 'POST',
            body: data,
        })
    }

    editCar(data: any) {
        return authClient('edit_car', {
            method: 'POST',
            body: data,
        })
    }

    deleteCar() {
        return client('deleteCar:id', {
            method: 'DELETE',
        })
    }

    signUp(data: ISignUpData) {
        const formData = new FormData()
        for (const key in data) {
            formData.append(`${key}`, data[key])
        }

        return client('auth/sign_up', {
            method: 'POST',
            body: formData,
        })
    }

    signIn(data: ISignInData) {
        return client('auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }

    getUserData(userId: number) {
        return authClient(`users/get_user_data/${userId}`)
    }

    getBrands() {
        return client('cars/brands')
    }

    createAuction(data: IAuctionData) {
        const formData = new FormData()
        for (const key in data) {
            if (key === 'carInfo') {
                for (const key1 in data[key]) {
                    if (key1 === 'files') {
                        Array.from(data[key][key1]).forEach(file => formData.append('files', file))
                    } else {
                        // @ts-ignore
                        formData.append(`${key}`, data[key][key1])
                    }
                }
            } else {
                // @ts-ignore
                formData.append(`${key}`, data[key])
            }
        }

        formData.forEach(console.log)

        return authClient('auction/create_auction', {
            method: 'POST',
            body: formData,
        })
    }

}

export default new RetroCarAuctionClient()
