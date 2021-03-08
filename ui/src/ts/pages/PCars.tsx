import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'

import retroCarAuctionClient from '../api/retroCarAuctionClient'

import { CarList } from '../components/CarList'
import cars from '../Store/CarStore'


export const PCars = () => {

    // useEffect(() => {
    //     retroCarAuctionClient.getCars()
    //         .then(response => response.json())
    //         .then(r => console.log('response', r))
    // }, [])

    return (
        <Container maxWidth="lg">
            <CarList />
        </Container>
    )

}
