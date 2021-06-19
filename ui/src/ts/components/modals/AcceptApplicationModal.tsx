import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import dayjs from 'dayjs';


interface IAcceptApplicationModalProps {
    isOpen: boolean,
    handleClose: () => void,
    handleApproveApplication: (auctionStartTime: string) => void,
}

export const AcceptApplicationModal = ({ isOpen, handleClose, handleApproveApplication }: IAcceptApplicationModalProps) => {
    const [date, setDate] = useState('')

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>The confirmation</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>Set auction start time</Typography>
                <TextField
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { handleApproveApplication(date); handleClose() }} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
