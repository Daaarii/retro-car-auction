import React from 'react'
import { Box, Grid } from '@material-ui/core'

import { CarCard } from './CarCard'
import { ICar } from '../store/CarStore'

interface ICarListProps {
    cars: ICar[],
}

export const CarList = ({cars}: ICarListProps) => {


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