import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { useInputWithValidation } from '../hooks/useInputWithValidation'
import { getValidationProps } from '../utils/getValidationProps'
import RCAClient from '../api/retroCarAuctionClient'

const useStyles = makeStyles({
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

export const AddModel = () => {
    const classes = useStyles()

    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState<{name: string, id: number}>()
    const model = useInputWithValidation({ isEmpty: true })

    const handleAddModel = () => {
        RCAClient.addModel({ model: model.value, brandId: brand.id})
    }

    useEffect(() => {
        RCAClient.getCountries()
            .then(response => response.json())
            .then(result => setBrands(result.brands))
    }, [])

    return (
        <div>
            <Typography className={classes.title}>Input model</Typography>
            <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                placeholder="Model"
                {...getValidationProps(model)}
            />
            <FormControl
                className={classes.select}
                variant="outlined"
                size="small"
            >
                <InputLabel>Brand</InputLabel>
                <Select
                    multiple
                    value={brand}
                    onChange={e => setBrand(e.target.value as {name: string, id: number})}
                    label="Country"
                >
                    {brands.map(brand => <MenuItem key={brand.id} value={brand}>{brand.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Button
                onClick={handleAddModel}
                variant="contained"
                color="primary"
            >
                Add model
            </Button>
        </div>
    )
}
