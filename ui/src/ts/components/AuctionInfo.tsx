import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Button, MobileStepper, makeStyles, Typography, Divider } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

import { IAuctionDataResponse, IRequestResponse, IAuctionResponse } from '../entities/auction'
import { mapVariablesToHuman } from '../entities/auction'

const useStyles = makeStyles({
    title: {
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 400,
        marginBottom: 20,
    },
    photos: {
        maxWidth: 631,
        marginBottom: 20,
    },
    carPhoto: {
        height: 355,
        maxWidth: 631,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    infoItem: {
        marginBottom: 10,
    },
    divider: {
        width: '100%',
        marginBottom: 15,
    },
})

const carImages = [
    'https://avatars.mds.yandex.net/get-zen_doc/1918821/pub_5da8c5f8f557d000ada86ec8_5da8c6129c944600aef922fa/scale_1200',
    'https://www.1zoom.ru/big2/375/326422-svetik.jpg',
    'https://s1.1zoom.ru/big7/341/Retro_1930_Cord_L-29_488564.jpg',
    'http://arte1.ru/images/detailed/5/25217.jpg',
]

interface IAuctionInfoProps {
    auctionData: IAuctionDataResponse,
}


export const AuctionInfo = ({ auctionData: { car, carInfo, auction, user } }: IAuctionInfoProps) => {
    const classes = useStyles()

    const [activeStep, setActiveStep] = useState(0)

    const renderCarInfo = () => {
        return carInfo.map(info => (
            <Typography key={info.title} className={classes.infoItem}>
                <b>{mapVariablesToHuman.get(info.title)}</b>: {info.description}
            </Typography>
        ))
    }

    return (
        <div>
            <div className={classes.photos}>
                <img
                    className={classes.carPhoto}
                    src={carImages[activeStep]}
                    alt='Car Photo'
                />
                <MobileStepper
                    steps={carImages.length}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            disabled={activeStep === carImages.length - 1}
                            onClick={() => setActiveStep(activeStep + 1)}
                        >
                            Next <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            <KeyboardArrowLeft /> Back
                        </Button>
                    }
                />
            </div>
            <Typography className={classes.title} variant="h2" component="h2">
                General information
            </Typography>
            <Typography className={classes.infoItem}>
                <b>Start price</b>: {auction.startPrice}$
            </Typography>
            <Typography className={classes.infoItem}>
                {/* @ts-ignore */}
                {auction.startTime ?
                    <><b>Start auction</b> : {dayjs((auction as IAuctionResponse).startTime).format('DD.MM.YYYY HH:mm:ss')}</>
                :
                    <><b>Applicatiom time</b>: {dayjs((auction as IRequestResponse).applicationTime).format('DD.MM.YYYY HH:mm:ss')}</>
                }
            </Typography>
            <Typography className={classes.infoItem}>
                <b>Minimal bid</b>: {auction.minBid}$
            </Typography>
            {auction.blitzPrice &&
                <Typography className={classes.infoItem}>
                    <b>Blitz price</b>: {auction.blitzPrice}
                </Typography>
            }
            <Divider className={classes.divider} />
            <Typography className={classes.title} variant="h2" component="h2">
                Car info
            </Typography>
            <Typography className={classes.infoItem}>
                <b>Car condition (1-10)</b>: {car.carCondition}$
            </Typography>
            <Typography className={classes.infoItem}>
                <b>Production year</b>: {car.prodYear}$
            </Typography>
            {renderCarInfo()}
        </div>
    )
}