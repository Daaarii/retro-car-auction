import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@material-ui/core'


interface IRequiredParametersModalProps {
    isOpen: boolean,
    handleClose: () => void,
}

const messages = [
    'Brand must be one of the suggested.',
    'Production year must be earlier than 1990.',
    'Car condition rate must be greater than 6.',
]

export const RequiredParametersModal = ({ isOpen, handleClose }: IRequiredParametersModalProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Unfortunately you cannot put the car with such characteristics up for auction.</DialogTitle>
            <DialogContent>
                <List >
                    {messages.map(message => (
                        <ListItem>
                            <ListItemText
                                primary={`\u2013 ${message}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}
