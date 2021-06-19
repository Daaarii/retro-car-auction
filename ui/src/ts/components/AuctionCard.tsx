import React from 'react'
import { Avatar, Button, Card, CardContent, CardHeader, CardActionArea, CardMedia, CardActions, Typography, makeStyles, Divider } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { IAuctionResponse, ICarResponse, IUserResponse, IRequestResponse, AuctionStatus } from '../entities/auction'
import userStore from '../store/UserStore'

import { urls } from '../router/urls'
import Car from '../../../../../../../../retroCars/alfa-romeo-c52.jpg'
// import DummyAvatar from '../../assets/dummyAvatar.png'
import DummyAvatar from '../../assets/logo.png'

const useStyles = makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
}))

type AuctionData = IAuctionResponse & ICarResponse & IUserResponse 

interface IAuctionCardProps {
    data: AuctionData
    application?: any
    isRequest?: boolean
}


export const AuctionCard = observer((props: IAuctionCardProps) => {
    const classes = useStyles()
    const { data, application, isRequest } = props

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    avatar={<Avatar src={DummyAvatar} />}
                    title={`Brand ${data.model}`}
                    subheader={data.nickname}
                />
                <CardMedia
                    className={classes.media}
                    image={Car}
                    title="Car image"
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        Production year: <b>{data.prodYear}</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p">
                        Car condition: <b>{data.carCondition}/10</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p">
                        Status: <b>{data.status}</b>
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p">
                        {data.status === AuctionStatus.PENDING ?
                            <>Start price: <b>{data.startPrice}$</b></>
                            :
                            <>Current bid: <b>{data.startPrice}$</b></>
                        }
                    </Typography>
                    <Divider />
                    {data.status === AuctionStatus.PENDING &&
                        <>
                            <Typography variant="body2" component="p">
                                {isRequest ? 'Application time' : 'Start time'}: <b>{isRequest ?
                                    dayjs(application.applicationTime).format('DD.MM.YYYY HH:mm:ss')
                                    :
                                    dayjs(data.startTime).format('DD.MM.YYYY HH:mm:ss')
                                }</b>
                            </Typography>
                            <Divider />
                        </>
                    }
                    <Divider />
                    <Typography variant="body2" component="p">
                        Minimal bid: <b>{data.minBid}$</b>
                    </Typography>
                    <Divider />
                </CardContent>
            </CardActionArea>
            <CardActions>
                {isRequest ?
                    <Button
                        color="primary"
                        component={Link}
                        to={urls.applicationPath(data.id)}
                    >
                        Check
                    </Button>
                    :
                    data.status === AuctionStatus.PENDING ?
                        <Button
                            color="primary"
                            component={Link}
                            to={userStore.auctionsUserParticipates.includes(data.id) ?
                                urls.auctionPath(data.id)
                                :
                                urls.registrationInAuctionPath(data.id)
                            }
                        >
                            {userStore.auctionsUserParticipates.includes(data.id) ? 'Participate' : 'Register'}
                        </Button>
                        :
                        <Button
                            color="primary"
                            component={Link}
                            to={urls.registrationInAuctionPath(data.id)}
                        >
                            See
                        </Button>
                }
            </CardActions>
        </Card >
    )
})
