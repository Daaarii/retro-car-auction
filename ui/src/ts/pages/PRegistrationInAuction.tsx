import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Container, makeStyles, Typography, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import {AuctionInfo} from '../components/AuctionInfo'

import auctionStore from '../store/AuctionStore'
import userStore from '../store/UserStore'
import authStorage from '../utils/authStorage'
import { urls } from '../router/urls'


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    root2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: 700,
    },
    mainTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 400,
        marginBottom: 30,
    },
    title: {
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 400,
        marginBottom: 20,
    },
    btn: {
        alignSelf: 'flex-end',
    },
})


export const PRegistrationInAuction = observer(() => {
    const classes = useStyles()

    const params = useParams<{ id: string }>()
    const history = useHistory()
    
    const { auctionData, fetchAuction, loading, error } = auctionStore
    const { car, auction } = auctionData
    
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    useEffect(() => {
        fetchAuction(params.id)
    }, [])

    const handleRegister = async () => {
        if (!userStore.isAuth) {
            history.push(urls.signIn)
        } else {
            if (userStore.moneyBalance > auction.startPrice) {
                await userStore.registerInAuction(authStorage.getUserid(), String(auction.id))
                if (!userStore.error) {
                    setSnackbarOpen(true)
                }
            }
        }
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                >
                    You have succesfully registered!
                </Alert>
            </Snackbar>
            <Container className={classes.root}>
                <div className={classes.root2}>
                    <Typography className={classes.mainTitle} variant="h1" component="h1">
                        Registration in auction
                    </Typography>
                    <Typography>
                        Brand {car.model}
                    </Typography>

                    <AuctionInfo auctionData={auctionData} />
                    
                    <Button
                        className={classes.btn}
                        variant="outlined"
                        color="primary"
                        onClick={handleRegister}
                    >
                        Register as a participant
                    </Button>
                </div>
            </Container>
        </>
    )
})
