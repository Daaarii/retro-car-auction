import { makeAutoObservable } from 'mobx'

import RCAClient from '../api/retroCarAuctionClient'

import { IAuctionDataResponse, IAuctionResponse, IAuctionsDataResponse } from '../entities/auction'


class Auctions {
    constructor() {
        makeAutoObservable(this)
    }

    loading: boolean = false
    error: Error = null
    auctionsData: IAuctionsDataResponse = {
        auctions: [],
        cars: [],
        users: [],
    }
    applications: any[] = []

    fetchAuctions = async () => {
        this.loading = true
        try {
            const response = await RCAClient.getAuctions()
            const auctionsData = await response.json()
            this.auctionsData = auctionsData
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    fetchApplications = async () => {
        this.loading = true
        try {
            const response = await RCAClient.getRequests()
            const requestsData = await response.json()
            this.auctionsData = requestsData.auctionsData
            this.applications = requestsData.applications
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    fetchAuctionStatuses = () => {
        const eventSource = RCAClient.getAuctionStatuses()
        eventSource.onmessage = (event) => {
            const auctionStatus = JSON.parse(event.data) as any
            (this.auctionsData.auctions as IAuctionResponse[]).find(auction => auction.id === auctionStatus.auctionId).status = auctionStatus.status
        }

        return eventSource
    }

}

export default new Auctions()
