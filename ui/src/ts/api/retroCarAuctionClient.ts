import { client, authClient } from '../utils/enhancedFetch'
import { ISignInData, ISignUpData } from '../entities/auth'
import { IAuctionDataRequest, IBidData, ICountry, IBrand, IModel, IApplicationDataRequest } from '../entities/auction'

class RetroCarAuctionClient {

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

    getCountries() {
        return client('auction/countries')
    }

    getBrands() {
        return client('auction/brands')
    }

    addCountry(data: ICountry) {
        return authClient('auction/add_country', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }

    addBrand(data: IBrand) {
        return authClient('auction/add_brand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }

    addModel(data: IModel) {
        return authClient('auction/add_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }

    makeRequest(data: IApplicationDataRequest) {
        const formData = new FormData()
        for (const key in data) {
            if (key === 'carInfo') {
                for (const key1 in data[key]) {
                    if (key1 === 'files') {
                        Array.from(data[key][key1]).forEach(file => formData.append('files', file))
                    } else {
                        // @ts-ignore
                        formData.append(`${key1}`, data[key][key1])
                    }
                }
            } else {
                // @ts-ignore
                formData.append(`${key}`, data[key])
            }
        }

        return authClient('auction/make_request', {
            method: 'POST',
            body: formData,
        })
    }

    // createAuction(data: IAuctionDataRequest) {
    //     const formData = new FormData()
    //     for (const key in data) {
    //         if (key === 'carInfo') {
    //             for (const key1 in data[key]) {
    //                 if (key1 === 'files') {
    //                     Array.from(data[key][key1]).forEach(file => formData.append('files', file))
    //                 } else {
    //                     // @ts-ignore
    //                     formData.append(`${key1}`, data[key][key1])
    //                 }
    //             }
    //         } else {
    //             // @ts-ignore
    //             formData.append(`${key}`, data[key])
    //         }
    //     }

    //     return authClient('auction/create_auction', {
    //         method: 'POST',
    //         body: formData,
    //     })
    // }

    acceptApplication(id: number, auctionStartTime: string) {
        return authClient(`auction/accept_application`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                auctionStartTime
            })
        })
    }

    rejectApplication(id: number) {
        return authClient(`auction/reject_application/${id}`)
    }

    getAuctions() {
        return client('auction/list')
    }

    getRequests() {
        return authClient('auction/applications')
    }

    getAuctionStatuses() {
        return new EventSource('http://localhost:3001/api/auction/statuses')
    }

    getAuction(id: string) {
        return client(`auction/${id}`)
    }

    getApplication(id: string) {
        return authClient(`auction/application/${id}`)
    }

    registerInAuction(userId: string, auctionId: string) {
        return authClient(`auction/register_in_auction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                auctionId
            }),
        })
    }

    placeABid(data: IBidData) {
        return authClient(`auction/place_a_bid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    getAuctionBids() {
        return new EventSource('http://localhost:3001/api/auction/bids')
    }

    setWinner(id: number) {
        return authClient(`auction/set_winner/${id}`)
    }

}

export default new RetroCarAuctionClient()
