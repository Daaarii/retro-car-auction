import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Container, makeStyles, Typography, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { AuctionInfo } from '../components/AuctionInfo'
import { AcceptApplicationModal } from '../components/modals'

import auctionStore from '../store/AuctionStore'
import userStore from '../store/UserStore'
import authStorage from '../utils/authStorage'
import { urls } from '../router/urls'

import {dumbAuction} from '../api/dumbAuction'

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


export const PApplication = observer(() => {
    const classes = useStyles()

    const params = useParams<{ id: string }>()
    const history = useHistory()

    const { auctionData, application, fethApplication, loading, error } = auctionStore
    const { acceptApplication } = userStore
    const { car, auction } = auctionData

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        fethApplication(params.id)
    }, [])

    const handleApproveApplication = async (auctionStartTime: string) => {
        console.log('application', JSON.stringify(application))
        const response = await acceptApplication(application.id, auctionStartTime)
        if (response.result === 0) {
            setSnackbarOpen(true)
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
                    Application approved!
                </Alert>
            </Snackbar>

            <AcceptApplicationModal
                isOpen={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleApproveApplication={handleApproveApplication}
            />

            <Container className={classes.root}>
                <div className={classes.root2}>
                    <Typography className={classes.mainTitle} variant="h1" component="h1">
                        Application
                    </Typography>
                    <Typography>
                        Brand {car.model}
                    </Typography>

                    <AuctionInfo auctionData={auctionData} />

                    <Button
                        className={classes.btn}
                        variant="outlined"
                        color="primary"
                        onClick={() => setModalOpen(true)}
                    >
                        Accept the application
                    </Button>
                </div>
            </Container>
        </>
    )
})
