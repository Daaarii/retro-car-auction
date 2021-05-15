import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Button, Chip, Container, Grid, Typography, makeStyles, TextField, Slider, FormControl, Select, InputLabel, MenuItem, List, ListItem, Divider, Input } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import userStore from '../store/UserStore'
import { useInput } from '../hooks/useInput'
import { useUpload } from '../hooks/useUpload'
import { useInputWithValidation } from '../hooks/useInputWithValidation'
import { getValidationProps } from '../utils/getValidationProps'
import { RequiredParametersModal } from '../components/modals'
import { Upload } from '../components/Upload'
import { Transmission, Equipment, Rating, Fuel, SteeringWheelLocation } from '../entities/auction'

import dumbAuction from '../api/dumbAuction'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rootGrid1: {
        maxWidth: 550,
    },
    rootGrid2: {
        maxWidth: 900,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 10,
    },
    step: {
        fontSize: 26,
        fontWeight: 700,
        marginBottom: 30,
    },
    fieldTitle: {
        fontSize: 18,
    },
    autoComplete: {
        width: 250,
    },
    slider: {
        width: 250,
    },
    multilineTypography: {
        display: 'inline',
    },
    photoList: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    photoListItem: {
        width: '50%',
    },
    carPhoto: {
        width: 150,
        height: 84.375,
    },
})

import brands from '../../../../server/brands'


export const PNewAuction = () => {
    const classes = useStyles()

    const [step, setStep] = useState(3)
    const [isOpen, setOpen] = useState(false)

    const model = useInput()
    const [brand, setBrand] = useState('')
    const prodYear = useInput()
    const [carCondition, setCarCondition] = useState(1)

    const historyOfTheCar = useInputWithValidation({ isEmpty: true, minLenth: 10 })
    const engineCapacity = useInputWithValidation({ isEmpty: true })
    const carInteriorRating = useInput(Rating.A)
    const numberOfDoors = useInputWithValidation({ isEmpty: true })
    const carMileage = useInputWithValidation({ isEmpty: true })
    const carColor = useInputWithValidation({ isEmpty: true })
    const fuelType = useInput(Fuel.Petrol)
    const carInteriorColor = useInputWithValidation({ isEmpty: true })
    const serviceLife = useInputWithValidation({ isEmpty: true })
    const steeringWheelLocation = useInput(SteeringWheelLocation.Left)
    const transmission = useInput(Transmission.AT)
    const [equipment, setEquipment] = useState([Equipment.Nothing])
    const numberOfSeatsInTheCar = useInputWithValidation({ isEmpty: true })
    const photos = useUpload(true)
    const auctionStartTime = useInput(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    const auctionEndTime = useInput(dayjs(Date.now() + 60 ** 2 * 1000).format('YYYY-MM-DDTHH:mm:ss'))
    const startPrice = useInputWithValidation({ isEmpty: true })
    const minBid = useInputWithValidation({ isEmpty: true })
    const blitzPrice = useInput()

    const handleBrandChange = (e: React.ChangeEvent, value: string) => {
        setBrand(value);
    }

    const handleCarConditionChange = (e: React.ChangeEvent, value: number) => {
        setCarCondition(value);
    }

    const handleEquipmentChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        let equipment = e.target.value as Equipment[]
        if (equipment[equipment.length - 1] === Equipment.Nothing || equipment.length === 0) {
            return setEquipment([Equipment.Nothing])
        }
        if (equipment.includes(Equipment.Nothing) && equipment.length > 1) {
            equipment = equipment.filter(equipment => equipment !== Equipment.Nothing)
        }
        setEquipment(equipment)
    }

    const checkBasicCharacteristics = () => {
        // if (Number(prodYear) > 1990 || carCondition < 6 || !brands.includes(brand)) {
            return false
        // }
        // return true
    }

    const isSecondStepDisabled = () => {
        return !(historyOfTheCar.isValid &&
            historyOfTheCar.isValid &&
            engineCapacity.isValid &&
            numberOfDoors.isValid &&
            carMileage.isValid &&
            carColor.isValid &&
            carInteriorColor.isValid &&
            serviceLife.isValid &&
            numberOfSeatsInTheCar.isValid &&
            (photos.value as FileList) && (photos.value as FileList).length > 2
        )
    }

    const isThirdStepDisabled = () => {
        return !(startPrice.isValid && minBid.isValid)
    }

    const handleNextStepClick = () => {
        if (step === 1) {
            if (checkBasicCharacteristics()) {
                setStep(2)
            } else {
                setOpen(true)
            }
        } else {
            setStep(3)
        }
    }

    const handleRequiredParametersModalClose = () => {
        setOpen(false)
    }

    const handleCreateAuction = () => {
        return userStore.createAuction(dumbAuction)
        // return userStore.createAuction({
        //     model: model.value,
        //     brand,
        //     prodYear: prodYear.value,
        //     carCondition: String(carCondition),
        //     historyOfTheCar: historyOfTheCar.value,
        //     engineCapacity: engineCapacity.value,
        //     carInteriorRating: carInteriorRating.value as Rating,
        //     numberOfDoors: numberOfDoors.value,
        //     carMileage: carMileage.value,
        //     carColor: carColor.value,
        //     fuelType: fuelType.value as Fuel,
        //     carInteriorColor: carInteriorColor.value,
        //     serviceLife: serviceLife.value,
        //     steeringWheelLocation: steeringWheelLocation.value as SteeringWheelLocation,
        //     transmission: transmission.value as Transmission,
        //     equipment: equipment.join(','),
        //     numberOfSeatsInTheCar: numberOfSeatsInTheCar.value,
        //     files: photos.value as FileList,
        //     auctionStartTime: auctionStartTime.value,
        //     auctionEndTime: auctionEndTime.value,
        //     startPrice: startPrice.value,
        //     minBid: minBid.value,
        //     blitzPrice: blitzPrice.value ? blitzPrice.value : undefined,
        // })
    }

    const firstStep = () => {
        return (
            <>
                <RequiredParametersModal isOpen={isOpen} handleClose={handleRequiredParametersModalClose} />
                <Grid className={classes.rootGrid1} container spacing={3}>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Input brand
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                className={classes.autoComplete}
                                value={brand}
                                onChange={handleBrandChange}
                                size="small"
                                fullWidth
                                options={brands}
                                renderInput={params => <TextField {...params} variant="outlined" />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Input model
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={model.value}
                                onChange={model.onChange}
                                size="small"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Input production year
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={prodYear.value}
                                onChange={prodYear.onChange}
                                size="small"
                                type="number"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Rate the car condition from 1 to 10
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Slider
                                className={classes.slider}
                                value={carCondition}
                                onChange={handleCarConditionChange}
                                defaultValue={1}
                                min={1}
                                step={1}
                                max={10}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item container justify="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNextStepClick}
                            >
                                Next step
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }

    const secondStep = () => {
        return (
            <>
                <Grid className={classes.rootGrid2} container spacing={3}>
                    <Grid item container spacing={2} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12} sm={4}>
                            <Typography>
                                History of the car
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                value={historyOfTheCar.value}
                                onChange={historyOfTheCar.onChange}
                                label="History of the car"
                                size="small"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                required
                                {...getValidationProps(historyOfTheCar)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Engine capacity (sm<sup>3</sup>)
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={engineCapacity.value}
                                onChange={engineCapacity.onChange}
                                label="Engine capacity"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                {...getValidationProps(engineCapacity)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Car interior rating (from A to D), where A - impeccable condition , D - the interior is dirty, there are unpleasant odors
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth size="small">
                                <InputLabel>Rating</InputLabel>
                                <Select
                                    value={carInteriorRating.value}
                                    onChange={carInteriorRating.onChange}
                                    label="Rating"
                                >
                                    {Object.values(Rating).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Number of doors at the car body
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={numberOfDoors.value}
                                onChange={numberOfDoors.onChange}
                                label="Number of doors"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                {...getValidationProps(numberOfDoors)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Сar mileage
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={carMileage.value}
                                onChange={carMileage.onChange}
                                label="Сar mileage"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                {...getValidationProps(carMileage)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Car color
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={carColor.value}
                                onChange={carColor.onChange}
                                label="Car color"
                                size="small"
                                variant="outlined"
                                fullWidth
                                required
                                {...getValidationProps(carColor)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Fuel type
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth size="small">
                                <InputLabel>Fuel type</InputLabel>
                                <Select
                                    value={fuelType.value}
                                    onChange={fuelType.onChange}
                                    label="Fuel type"
                                >
                                    {Object.values(Fuel).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Car interior color
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={carInteriorColor.value}
                                onChange={carInteriorColor.onChange}
                                label="Car interior color"
                                size="small"
                                variant="outlined"
                                fullWidth
                                required
                                {...getValidationProps(carInteriorColor)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                The service life of the car
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={serviceLife.value}
                                onChange={serviceLife.onChange}
                                label="The service life of the car"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                {...getValidationProps(serviceLife)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Steering wheel location
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth size="small">
                                <InputLabel>Steering wheel location</InputLabel>
                                <Select
                                    value={steeringWheelLocation.value}
                                    onChange={steeringWheelLocation.onChange}
                                    label="Steering wheel location"
                                >
                                    {Object.values(SteeringWheelLocation).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Transmission <br />
                                <Typography component="span" variant="body2" color="textSecondary">AT - automatic transmission</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">MT - manual gearbox</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">FA - automatic transmission with a gear lever installed in the floor</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">F6 - a mechanical box with a gear lever installed in the floor</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">F5 - a mechanical box with a gear lever installed in the floor</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">CA - automatic transmission with a gear lever mounted on the steering column</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">C5 - a manual transmission with a gear lever mounted on the steering column</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">C4 - a manual transmission with a gear lever mounted on the steering column</Typography> <br />
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth size="small">
                                <InputLabel>Transmission</InputLabel>
                                <Select
                                    value={transmission.value}
                                    onChange={transmission.onChange}
                                    label="Transmission"
                                >
                                    {Object.values(Transmission).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Equipment <br />
                                <Typography component="span" variant="body2" color="textSecondary">AC - air conditioner</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">AW - alloy wheels</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">TV - TV</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">LS - leather seats</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">PS - power steering</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">PW - power windows</Typography> <br />
                                <Typography component="span" variant="body2" color="textSecondary">SR - sunroof</Typography> <br />
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth size="small">
                                <InputLabel>Equipment</InputLabel>
                                <Select
                                    multiple
                                    value={equipment}
                                    onChange={handleEquipmentChange}
                                    label="Equipment"
                                    renderValue={(selected: string[]) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {Object.values(Equipment).map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                The number of seats in the car.
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={numberOfSeatsInTheCar.value}
                                onChange={numberOfSeatsInTheCar.onChange}
                                label="The number of seats"
                                size="small"
                                variant="outlined"
                                fullWidth
                                type="number"
                                required
                                {...getValidationProps(numberOfSeatsInTheCar)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="flex-start" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography>
                                Photos of the car (at least 3 pieces)
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Upload onChange={photos.onChange} multiple />
                            {(photos.value as FileList) && (photos.value as FileList).length && (
                                <List className={classes.photoList}>
                                    {Array.from((photos.value as FileList)).map(photo =>
                                        <ListItem key={photo.name} className={classes.photoListItem}>
                                            <img className={classes.carPhoto} src={URL.createObjectURL(photo)} />
                                        </ListItem>
                                    )}
                                </List>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container justify="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextStepClick}
                            disabled={step === 2 && isSecondStepDisabled()}
                        >
                            Next step
                            </Button>
                    </Grid>

                </Grid>
            </>
        )
    }

    const thirdStep = () => {
        return (
            <>
                <Grid className={classes.rootGrid1} container spacing={3}>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Auction start time
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={auctionStartTime.value}
                                onChange={auctionStartTime.onChange}
                                variant="outlined"
                                size="small"
                                type="datetime-local"
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Auction end time
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={auctionEndTime.value}
                                onChange={auctionEndTime.onChange}
                                variant="outlined"
                                size="small"
                                type="datetime-local"
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Start price
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={startPrice.value}
                                onChange={startPrice.onChange}
                                label="Start price"
                                size="small"
                                variant="outlined"
                                fullWidth
                                required
                                {...getValidationProps(startPrice)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Minimal bid
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={minBid.value}
                                onChange={minBid.onChange}
                                label="Minimal bid"
                                size="small"
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                                {...getValidationProps(minBid)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center" justify="space-between">
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.fieldTitle} variant="body1">
                                Blitz price
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={blitzPrice.value}
                                onChange={blitzPrice.onChange}
                                label="Blitz price"
                                size="small"
                                type="number"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justify="flex-end">
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            // disabled={isThirdStepDisabled()}
                            onClick={handleCreateAuction}
                        >
                            Create Auction
                        </Button>
                    </Grid>
                </Grid>
            </>
        )
    }

    const renderCreatingAuction = () => {
        switch (step) {
            case 1:
                return firstStep()
            case 2:
                return secondStep()
            case 3:
                return thirdStep()
        }
    }

    return (
        <Container className={classes.root} component="main">
            <Typography className={classes.mainTitle} component="h2" color="textSecondary">
                Creating an auction
            </Typography>
            <Typography className={classes.step} component="h3" color="textSecondary">
                Step {step}
            </Typography>
            {renderCreatingAuction()}
        </Container>
    )

}
