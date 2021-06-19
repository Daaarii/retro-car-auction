import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@material-ui/core'

import { useInput } from '../../hooks/useInput'

interface IPlaceABidModalProps {
    isOpen: boolean,
    bidValid: boolean,
    handleClose: () => void,
    handlePlaceABid: (bid: string) => void,
}

export const PlaceABidModel = ({ isOpen, bidValid, handleClose, handlePlaceABid }: IPlaceABidModalProps) => {
    const bid = useInput()

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Select the size of the bet</DialogTitle>
            <DialogContent>
                <TextField
                    value={bid.value}
                    onChange={bid.onChange}
                    onBlur={bid.onBlur}
                    size="small"
                    type="number"
                    variant="outlined"
                    fullWidth
                    helperText={bid.isBlur && !bidValid && "Bid must not be less than minimum bid and than current bid"}
                    error={bid.isBlur && !bidValid}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handlePlaceABid(bid.value)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}
