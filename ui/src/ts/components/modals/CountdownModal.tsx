import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from '@material-ui/core'

import { useInput } from '../../hooks/useInput'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { observer } from 'mobx-react-lite'

interface ICountdownModalProps {
    isOpen: boolean,
    handleClose: () => void,
    price: number,
    handleDetermineTheWinner: () => void,
}

const counts = ['one', 'two', 'three', 'sold']

export const CountdownModal = observer(({ isOpen, handleClose, price, handleDetermineTheWinner }: ICountdownModalProps) => {
    const [count, setCount] = useState(0)

    const timerId = useRef<NodeJS.Timeout>()

    const handleCountdown = (i = 0) => {
        timerId.current = setTimeout(() => {
            if (i > 3) {
                handleDetermineTheWinner()
                handleClose()
                clearTimeout(timerId.current)
            } else {
                setCount(count => ++count)
                handleCountdown(++i)
            }
        }, 1000)
    }

    useEffect(() => {
        handleCountdown()
    }, [])

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                ${price} {count < 4 && counts[count].toUpperCase()} ...
            </DialogTitle>
        </Dialog>
    )
})
