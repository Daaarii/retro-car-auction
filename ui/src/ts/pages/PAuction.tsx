import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, DialogTitle, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import { AuctionInfo } from '../components/AuctionInfo'
import { PlaceABidModel, CountdownModal, SetWinnerModal } from '../components/modals'

import auctionStore from '../store/AuctionStore'
import userStore from '../store/UserStore'
import { useInput } from '../hooks/useInput'

import Car from '../../../../../../../../retroCars/alfa-romeo-c52.jpg'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        alignSelf: 'center',
        marginBottom: 40,
        fontSize: 28,
        fontWeight: 500,
    },
    carPhoto: {
        height: 205,
        maxWidth: 431,
        display: 'block',
        width: '100%',
    },
    mainBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    currentInfo: {
        padding: 30,

    },
    bidInfo: {
        fontSize: 18,
        fontWeight: 500,
    },
    currentPrice: {
        color: '#f80c26',
        fontWeight: 700,
    },
    minimumBid: {
        color: '#30f368',
        fontWeight: 700,
    },
    placeABidBlock: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    bidInput: {
        width: 150,
    },
    placeBidBtn: {
        marginLeft: 20,
    },
    table: {
        marginBottom: 30,
    },
})

export const PAuction = observer(() => {
    const classes = useStyles()

    const bid = useInput()

    const [isOpen, setOpen] = useState(false)
    const [isOpenWinnerModal, setOpenWinnerModal] = useState(false)
    const [bidValid, setBidValid] = useState(true)

    const params = useParams<{ id: string }>()

    const { auctionData, countdown, fetchAuction, fetchAuctionBids, placeABid, setWinner } = auctionStore
    const { car, auction, user, bids } = auctionData

    useEffect(() => {
        fetchAuction(params.id)

        const eventSource = fetchAuctionBids()

        return () => {
            eventSource.close()
        }
    }, [])

    const handlePlaceABid = (bid: string) => {
        if (Number(bid) < auction.minBid) {
            setBidValid(false)
        } else {
            const data = {
                auctionId: auction.id,
                userId: user.id,
                bid: Number(bid),
            }
            placeABid(data)
            setBidValid(true)
        }
    }

    const handleDetermineTheWinner = () => {
        auctionStore.completed = true
        setWinner(user.id)
        setOpenWinnerModal(true)
    }

    const renderMainBlock = () => (
        <div className={classes.mainBlock}>
            {countdown && <CountdownModal
                isOpen={countdown}
                handleClose={() => { auctionStore.countdown = false }}
                handleDetermineTheWinner={handleDetermineTheWinner}
                price={bids.length ? auction.startPrice + bids.reduce((accum, value) => accum + value.price, 0) : auction.startPrice}
            />}

            <SetWinnerModal
                isOpen={isOpenWinnerModal}
                handleClose={() => setOpenWinnerModal(false)}
            />

            <div>
                <Typography>
                    Brand {car.model}
                </Typography>
                <img
                    className={classes.carPhoto}
                    src={Car}
                    alt='Car Photo'
                />
            </div>
            <div className={classes.currentInfo}>
                <Typography className={classes.bidInfo} gutterBottom>
                    Current price: <span className={classes.currentPrice}>
                        {bids.length ? auction.startPrice + bids.reduce((accum, value) => accum + value.price, 0) : auction.startPrice}
                    </span> $
                </Typography>
                <Typography className={classes.bidInfo} gutterBottom>
                    Minimum bid: <span className={classes.minimumBid}>{auction.minBid}</span> $
                </Typography>
                <div className={classes.placeABidBlock}>
                    <TextField
                        className={classes.bidInput}
                        value={bid.value}
                        onChange={bid.onChange}
                        onBlur={bid.onBlur}
                        size="small"
                        type="number"
                        variant="outlined"
                        helperText={bid.isBlur && !bidValid && "Bid must not be less than minimum bid and than current bid"}
                        error={bid.isBlur && !bidValid}
                    />
                    <Button
                        className={classes.placeBidBtn}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => handlePlaceABid(bid.value)}
                        disabled={!!auctionStore.completed}
                    >
                        Place a bid
                    </Button>
                </div>
            </div>
        </div>
    )

    const renderAuctionInfo = () => (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Typography>Auction info</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AuctionInfo auctionData={auctionData} />
            </AccordionDetails>
        </Accordion>
    )

    const renderBidList = () => (
        <TableContainer className={classes.table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Bid size</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bids.slice().reverse().map(bid => (
                        <TableRow key={bid.id}>
                            <TableCell><b>{bid.price} $</b></TableCell>
                            <TableCell>{dayjs(bid.time).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <Container maxWidth="md">

            <PlaceABidModel
                isOpen={isOpen}
                bidValid={bidValid}
                handleClose={() => setOpen(false)}
                handlePlaceABid={handlePlaceABid}
            />

            <div className={classes.root}>
                <Typography className={classes.title} component="h1" variant="h1">
                    Auction
                </Typography>
                {renderMainBlock()}
                {renderBidList()}
                {renderAuctionInfo()}
            </div>
        </Container>
    )
})
