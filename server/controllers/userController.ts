import { NextFunction, Request, Response } from 'express'

import { User } from '../models'
import UserAuction from '../models/userAuctionModel'
import ApiError from '../utils/apiError'


class UserController {

    getUsers = async () => {

    }

    getUserData = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        
        if (req.user.id !== Number(id)) {
            return next(new ApiError(401, { message: 'You can\'t get another user\'s data' }))
        }

        try {
            const user = await User.findOne({ where: { id } })

            const userAuction = await UserAuction.findAll({where: { UserId: user!.id }}) as any
            const auctionsUserParticipates = userAuction.map((item: any) => item.AuctionId)

            res.json({ auctionsUserParticipates })

        } catch {

        }
    }

}

export default new UserController()
