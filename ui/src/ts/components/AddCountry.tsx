import { Button, makeStyles, Snackbar, TextField, Theme, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useState } from 'react'

import { useInputWithValidation } from '../hooks/useInputWithValidation'
import { getValidationProps } from '../utils/getValidationProps'
import RCAClient from '../api/retroCarAuctionClient'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 17,
        marginBottom: 15,
    },
    input: {
        marginBottom: 15,
    },
})

export const AddCountry = () => {
    const classes = useStyles()
    
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const country = useInputWithValidation({ isEmpty: true })

    const handleAddCountry = () => {
        RCAClient.addCountry({ country: country.value })
            .then(r => {console.log('res', r); return r})
            .then(() => setSnackbarOpen(true))
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
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
                    You have succesfully add country!
                </Alert>
            </Snackbar>

            <Typography className={classes.title}>Input country</Typography>
            <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                placeholder="Country"
                {...getValidationProps(country)}
            />
            <Button
                onClick={handleAddCountry}
                variant="contained"
                color="primary"
            >
                Add country
            </Button>
        </div>
    )
}
