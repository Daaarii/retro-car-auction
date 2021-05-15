import React, { useState } from 'react'
import { Avatar, Button, Card, CardContent, CardHeader, CardActionArea, CardMedia, CardActions, Typography, makeStyles } from '@material-ui/core'

import { ICar } from '../store/CarStore'
import DummyCar from '../../assets/dummy-car.png'
import Car from '../../../../../../../../retroCars/alfa-romeo-c52.jpg'


const useStyles = makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
}))


export const CarCard = (props: ICar) => {
    const classes = useStyles()

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    avatar={<Avatar />}
                    title={`${props.model}`}
                    subheader={props.brand}
                />
                <CardMedia
                    className={classes.media}
                    image={Car}
                    title="Car image"
                />
                <CardContent>
                    <Typography variant="body2" component="p" >
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary">Участвовать</Button>
            </CardActions>
        </Card>
    )
}
