import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Snackbar, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { useInputWithValidation } from '../hooks/useInputWithValidation'
import { getValidationProps } from '../utils/getValidationProps'
import RCAClient from '../api/retroCarAuctionClient'
import { Alert } from '@material-ui/lab'

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
    select: {
        marginBottom: 15,
    },
})

export const AddBrand = () => {
    const classes = useStyles()

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState<{ name: string, id: number }>()
    const brand = useInputWithValidation({ isEmpty: true })

    const handleAddBrand = () => {
        RCAClient.addBrand({ brand: brand.value, countryId: country.id })
            .then(() => setSnackbarOpen(true))
    }

    useEffect(() => {
        RCAClient.getCountries()
            .then(response => response.json())
            .then(result => setCountries(result.countries))
    }, [])

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
                    You have succesfully add brand!
                </Alert>
            </Snackbar>

            <Typography className={classes.title}>Input brand</Typography>
            <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                placeholder="Brand"
                {...getValidationProps(brand)}
            />
            <FormControl
                className={classes.select}
                variant="outlined"
                size="small"
            >
                <InputLabel>Country</InputLabel>
                <Select
                    value={country}
                    onChange={e => setCountry(e.target.value as { name: string, id: number })}
                    label="Country"
                >
                    {countries.map(country => <MenuItem key={country.id} value={country}>{country.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Button
                onClick={handleAddBrand}
                variant="contained"
                color="primary"
            >
                Add brand
            </Button>
        </div>
    )
}
