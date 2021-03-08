import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Container, Toolbar, Box, Button, makeStyles } from '@material-ui/core'

import { urls } from '../router/urls'
import Logo from '../../assets/logo.png'


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


export const Header = () => {
    const classes = useStyles()

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Box className={classes.logoWrapper}>
                        <Link to={urls.cars}><img className={classes.logo} src={Logo} alt="logo" /></Link>
                    </Box>
                    <Button  color="inherit" component={Link} to={urls.cars}>Cars</Button>
                    <Button color="inherit" component={Link} to={urls.newCar}>Add Car</Button>
                    <Button color="inherit" component={Link} to={urls.login}>Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}