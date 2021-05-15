import { makeAutoObservable } from 'mobx'

import RCAClient from '../api/retroCarAuctionClient'


export interface ICar {
    id: number
    model: string
    brand: string
    image: string
    country: string
    prodYear: number
    description: string,
}

const cars = [
    {
        id: 1,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
    {
        id: 2,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
    {
        id: 3,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
    {
        id: 4,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
    {
        id: 5,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
    {
        id: 6,
        model: 'a',
        brand: 'a1',
        image: 'a3',
        country: 'b',
        prodYear: 101,
        description: 'jnasjfnjkasbfbdsnfbhsdbfbsdfnsdbfhsdbfhsdbnfnsd',
    },
]


class Cars {
    constructor() {
        makeAutoObservable(this)
    }

    public cars: ICar[] = cars
    public error: Error = null

    fetchCars = async () => {
        try {
            const data = await RCAClient.getCars()
            this.cars = await data.json()
        } catch(e) {
            this.error = e
        }
    }

}

export default new Cars()
