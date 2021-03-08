import React from 'react'
import { Box, Grid, Card, CardContent, CardHeader, CardMedia } from '@material-ui/core'

import { CarCard } from './CarCard'
import carStore from '../Store/CarStore'


export const CarList = () => {

    const { cars } = carStore

    return (
        <Box>
            <Grid container spacing={2}>
                {cars.map(car => (
                    <Grid item xs={12} md={6} lg={4} key={car.id}>
                        <CarCard {...car} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )

}