import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'

import retroCarAuctionClient from '../api/retroCarAuctionClient'

import { CarList } from '../components/CarList'
import carStore from '../store/CarStore'


export const PCars = () => {
    const { cars } = carStore

    // useEffect(() => {
    //     retroCarAuctionClient.getCars()
    //         .then(response => response.json())
    //         .then(r => console.log('response', r))
    // }, [])

    return (
        <Container maxWidth="lg">
            <CarList cars={cars} />
        </Container>
    )

}
