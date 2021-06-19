import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, CircularProgress } from '@material-ui/core'

import { AuctionList } from '../components/AuctionList'
import auctionsStore from '../store/AuctionsStore'


export const PAuctions = observer(() => {
    const { auctionsData, fetchAuctions, fetchAuctionStatuses, loading, error } = auctionsStore

    useEffect(() => {
        fetchAuctions()

        const eventSource = fetchAuctionStatuses()

        return () => {
            eventSource.close()
        }
    }, [])
    console.log(JSON.stringify(auctionsData))
    return (
        <Container maxWidth="lg">
            {
                auctionsData.auctions.length ?
                    <AuctionList auctionsData={auctionsData} />
                    :
                    <h1>No auctions...</h1>
            }
        </Container>
    )

})
