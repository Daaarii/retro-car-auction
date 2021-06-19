import { NextFunction, Request, response, Response } from 'express'
import events from 'events'

import { User, Car, CarInfo, Auction, Brand, Bid, Country, Application } from '../models'

import ApiError from '../utils/apiError'

import { scheduleJob, Job } from 'node-schedule'
import UserAuction from '../models/userAuctionModel'



enum AuctionStatus {
    PENDING = 'Pending',
    STARTED = 'Started',
    ENDED = 'Ended',
}

enum ApplicationStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
}

const emitter = new events.EventEmitter()

class AuctionController {

    endAuctionJob?: Job

    addCountry = async (req: Request, res: Response, next: NextFunction) => {
        const { country } = req.body

        await Country.create({ name: country })

        res.json({ message: `Country ${country} has been created.` })
    }

    getCountries = async (req: Request, res: Response, next: NextFunction) => {
        const countries = await Country.findAll()

        res.json({ countries })
    }

    addBrand = async (req: Request, res: Response, next: NextFunction) => {
        const { brand, countryId } = req.body

        await Brand.create({ name: brand, CountryId: countryId })

        res.json({ message: `Brand ${brand} has been created.` })
    }

    fetchAuctions = async (req: Request, res: Response, next: NextFunction) => {
        const auctions = await Auction.findAll()
        const carIds: number[] = []
        const userIds: number[] = []
        auctions.forEach((auction: any) => {
            carIds.push(auction.CarId)
            userIds.push(auction.UserId)
        })
        const brands = await Brand.findAll()
        const cars = await Car.findAll({ where: { id: carIds } })
        const users = await User.findAll({ where: { id: userIds }, attributes: { exclude: ['password'] } })

        const response = {
            auctions,
            cars,
            users,
            brands,
        }

        res.status(200).json(response)
    }

    fetchApplications = async (req: Request, res: Response, next: NextFunction) => {
        const applications = await Application.findAll() as any

        const auctiondIds = applications.map((application: any) => application.AuctionId)

        const auctions = await Auction.findAll({ where: { id: auctiondIds } })

        const carIds: number[] = []
        const userIds: number[] = []

        auctions.forEach((auction: any) => {
            carIds.push(auction.CarId)
            userIds.push(auction.UserId)
        })
        const brands = await Brand.findAll()
        const cars = await Car.findAll({ where: { id: carIds } })
        const users = await User.findAll({ where: { id: userIds }, attributes: { exclude: ['password'] } })

        const response = {
            applications,
            auctionsData: {
                auctions,
                cars,
                users,
                brands,
            },
        }

        res.status(200).json(response)
    }

    fetchAuction = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const auction = await Auction.findOne({ where: { id } }) as any
        let bids: any = []
        bids = await Bid.findAll({ where: { AuctionId: auction.id } })
        const car = await Car.findOne({ where: { id: auction.CarId } }) as any
        const brand = await Brand.findOne({ where: { id: car.BrandId } })
        const user = await User.findOne({ where: { id: auction.UserId } })
        const carInfo = await CarInfo.findAll({ where: { CarId: auction.CarId } })

        const response = {
            auction,
            brand,
            car,
            user,
            carInfo,
            bids: bids || [],
        }

        res.status(200).json(response)
    }

    fetchApplication = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const application = await Application.findOne({ where: { id } }) as any

        res.status(200).json(application)
    }

    makeRequest = async (req: Request, res: Response, next: NextFunction) => {
        const {
            model,
            prodYear,
            carCondition,
            applicationTime,
            startPrice,
            minBid,
            blitzPrice,
            brand,
            ...carInfo
        } = req.body

        const filePathes = (req.files as any).files.map((file: any) => file.path)

        const user = await User.findOne({ where: { id: req.user.id } })
        const car = await Car.create({ UserId: user!.id, model, image: filePathes, prodYear, carCondition })

        for (const info in carInfo) {
            await CarInfo.create({ CarId: car.id, title: info, description: carInfo[info] })
        }

        const auction = await Auction.create(
            {
                CarId: car.id,
                UserId: user!.id,
                startTime: applicationTime,
                startPrice,
                minBid,
                blitzPrice,
                status: AuctionStatus.PENDING,
            }
        )
        
        const request = await Application.create(
            {
                UserId: user!.id,
                AuctionId: auction!.id,
                applicationTime: applicationTime,
                status: ApplicationStatus.PENDING,
            }
        )

    }

    acceptApplication = async (req: Request, res: Response, next: NextFunction) => {
        const { id, auctionStartTime } = req.body

        const application = await Application.findOne({ where: { id } }) as any
        const auction = await Auction.findOne({ where: { id: application.AuctionId } })

        await application.update({ status: ApplicationStatus.ACCEPTED })
        await auction!.update({ auctionStartTime })
        
        scheduleJob(new Date(auctionStartTime), async () => {
            await auction!.update({ status: AuctionStatus.STARTED })
            emitter.emit('changeAuctionStatus', { AuctionId: auction!.id, status: AuctionStatus.STARTED })
        })

        this.endAuctionJob = scheduleJob((new Date(auctionStartTime)).valueOf() + 1000 * 60, async () => {
            await auction!.update({ status: AuctionStatus.ENDED })
            emitter.emit('changeAuctionStatus', { AuctionId: auction!.id, status: AuctionStatus.ENDED })
        })

    }

    rejectApplication = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const application = await Application.findOne({ where: { id } })

        await application!.update({ status: ApplicationStatus.REJECTED })

    }

    fetchAuctionStatuses = (req: Request, res: Response, next: NextFunction) => {
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
        })

        emitter.on('changeAuctionStatus', (auctionStatus) => {
            res.status(201).write(`data: ${JSON.stringify(auctionStatus)} \n\n`)
        })
    }

    registerInAuction = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, auctionId } = req.body
        const userAuction = await UserAuction.create({ UserId: userId, AuctionId: auctionId }) as any

        res.status(200).json({ id: userAuction.AuctionId })
    }

    placeABid = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, auctionId, bid } = req.body
        const newBid = await Bid.create({ UserId: userId, AuctionId: auctionId, price: bid, time: Date.now() }) as any
        this.endAuctionJob!.reschedule(Date.now() + (1000 * 60))
        emitter.emit('placeABid', { price: newBid.price, time: newBid.time, id: newBid.id, userId: newBid.UserId })
    }

    fetchBids = async (req: Request, res: Response, next: NextFunction) => {
        res.writeHead(200, {
            'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
        })

        emitter.on('placeABid', (bid) => {
            res.status(201).write(`data: ${JSON.stringify(bid)} \n\n`)
        })
    }

}

export default new AuctionController()
