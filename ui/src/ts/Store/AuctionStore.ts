import { makeAutoObservable } from 'mobx'

import RCAClient from '../api/retroCarAuctionClient'

import { IAuctionDataResponse, IBidData, IBid } from '../entities/auction'


class Auctions {
    constructor() {
        makeAutoObservable(this)
    }

    timer: NodeJS.Timeout
    countdown: boolean

    loading: boolean = true
    error: Error = null
    auctionData: IAuctionDataResponse = {
        auction: {},
        car: {},
        user: {},
        carInfo: [],
        bids: [],
    }

    application: any = {}

    completed: boolean = false

    fetchAuction = async (id: string) => {
        try {
            const response = await RCAClient.getAuction(id)
            const auctionData = await response.json()
            this.auctionData = auctionData
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    fethApplication = async (id: string) => {
        try {
            const applicationResponse = await RCAClient.getApplication(id)
            await this.fetchAuction(this.application.AuctionId)

            this.application = await applicationResponse.json()
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    placeABid = async (data: IBidData) => {
        try {
            await RCAClient.placeABid(data)
        } catch (err) {

        }
    }

    fetchAuctionBids = () => {
        const eventSource = RCAClient.getAuctionBids()
        eventSource.onmessage = (event) => {
            if (this.timer) {
                clearTimeout(this.timer)
                this.countdown = false
            }
            const bid = JSON.parse(event.data) as any
            (this.auctionData as IAuctionDataResponse).bids.push(bid)
            this.timer = setTimeout(() => this.countdown = true, 1000 * 57)
        }

        return eventSource
    }
    
    setWinner = async (id: number) => {
        try {
            const response = await RCAClient.setWinner(id)
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

}

export default new Auctions()
