import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { AuctionCard } from './AuctionCard'
import { IAuctionResponse, IAuctionsDataResponse, ICarResponse, IUserResponse } from '../entities/auction'

interface IAuctionListProps {
    auctionsData: IAuctionsDataResponse,
    applications?: any[],
    areRequests?: boolean,
}

export const AuctionList = observer(({ auctionsData, areRequests, applications }: IAuctionListProps) => {
    const { auctions, cars, users } = auctionsData
    
    const getCarByAuction = (carId: number, cars: ICarResponse[]) => {
        return cars.find(car => car.id === carId)
    }

    const getUserByAuction = (userId: number, users: IUserResponse[]) => {
        return users.find(user => user.id === userId)
    }

    const getAuctionByApplication = (auctionId: number, auctions: IAuctionResponse[]) => {
        return auctions.find(auction => auction.id === auctionId)
    }

    return (
        <div>
            <Grid container spacing={2}>
                {areRequests && (applications.length && Object.keys(auctions).length ?
                    applications.map(application => {
                        const auction = getAuctionByApplication(application.AuctionId, auctions)
                        const car = getCarByAuction(auction.CarId, cars)
                        const user = getUserByAuction(auction.UserId, users)
                        return (
                            <Grid item xs={12} md={6} lg={4} key={auction.id}>
                                <AuctionCard isRequest={Boolean(areRequests)} data={{ ...auction, ...car, ...user }} application={application} />
                            </Grid>
                        )
                    })
                    :
                    <h2>No applications ...</h2>)
                }
                {!areRequests && (Object.keys(auctions).length ?
                    auctions.map(auction => {
                        const car = getCarByAuction(auction.CarId, cars)
                        const user = getUserByAuction(auction.UserId, users)
                        return (
                            <Grid item xs={12} md={6} lg={4} key={auction.id}>
                                <AuctionCard isRequest={Boolean(areRequests)} data={{ ...auction, ...car, ...user }} />
                            </Grid>
                        )
                    })
                    :
                    <h2>No auctions ...</h2>)
                }
            </Grid>
        </div>
    )

})
