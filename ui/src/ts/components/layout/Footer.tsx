import React from 'react'
import { Box, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    toolbar: {
        height: 70,
    },
    logoWrapper: {
        position: 'relative',
        marginRight: 'auto',
    },
    logo: {
        width: 120,
        height: 80,
    }

}))


export const Footer = () => {
    const classes = useStyles()

    return (
        <Box>
            {/* Footer */}
        </Box>
    )
}