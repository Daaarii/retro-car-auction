import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core';


const  useStyles = makeStyles({
    dialogTitle: {
        color: '#33ff33',
        paddingBottom: 0,
    },
    dialogContent: {
        padding: 20,
        paddingTop: 0,
    },
})

interface ISetWinnerModalProps {
    isOpen: boolean,
    handleClose: () => void,
}

export const SetWinnerModal = ({ isOpen, handleClose }: ISetWinnerModalProps) => {
    const classes = useStyles()

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle className={classes.dialogTitle}>Congratulations !</DialogTitle>
            <DialogContent>
                <Typography className={classes.dialogContent}>
                    You have become a winner. <br></br>
                    For further steps, go to your mail, there is an instruction.
                </Typography>
            </DialogContent>
        </Dialog>
    )
}
