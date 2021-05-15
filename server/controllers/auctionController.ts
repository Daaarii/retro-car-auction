import { NextFunction, Request, Response } from 'express'

import { User, Car, CarInfo, Auction } from '../models'

import ApiError from '../utils/apiError'

import { IAuctionData } from '../../ui/src/ts/entities/auction'

import { scheduleJob } from 'node-schedule'

// const startTime = new Date(Date.now() + 5000);
// const endTime = new Date(startTime.getTime() + 5000);
// const job = scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
//   console.log('Time for tea!');
// });


class AuctionController {

    createAuction = async (req: Request, res: Response, next: NextFunction) => {
        const {
            model,
            prodYear,
            carCondition,
            carInfo,
            auctionStartTime,
            auctionEndTime,
            startPrice,
            minBid,
            blitzPrice,
        } = req.body as IAuctionData
        console.log('step1')
        const filePathes = (req.files as any).files.map((file: any) => file.path)
        console.log('step2')

        const user = await User.findOne({ where: { id: req.user.id } })
        console.log('step3', model)

        const car = await Car.create({ model, image: filePathes, prodYear, carCondition })
        console.log('step4')

        for (const info in carInfo) {
            await CarInfo.create({ where: { CarId: car.id }, title: info, description: carInfo[info] })
        }
        console.log('step5')

        await Auction.create(
            {
                where: { CarId: car.id, UserId: user!.id },
                startTime: auctionStartTime,
                endTime: auctionEndTime,
                startPrice,
                minBid,
                blitzPrice,
                status: 'pending',
            })
        console.log('auctionStartTime', auctionStartTime)
        // scheduleJob()
    }

}

export default new AuctionController()
