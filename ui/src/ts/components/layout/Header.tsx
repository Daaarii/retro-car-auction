import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { AppBar, Avatar, Container, Toolbar, Button, makeStyles } from '@material-ui/core'
import { PersonOutlineOutlined } from '@material-ui/icons'

import userStore from '../../store/UserStore'

import { urls } from '../../router/urls'
import Logo from '../../../assets/Logo.png'


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
    },
    avatar: {
        marginLeft: 10,
        cursor: 'pointer',
    },
}))


export const Header = observer(() => {
    const classes = useStyles()

    const { isAuth, signOut } = userStore

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.logoWrapper}>
                        <Link to={urls.cars}><img className={classes.logo} src={Logo} alt="logo" /></Link>
                    </div>
                    {isAuth && <Button color="inherit" component={Link} to={urls.newAuction}>Create an auction</Button>}
                    <Button color="inherit" component={Link} to={urls.cars}>Cars</Button>
                    {isAuth && <Button color="inherit" component={Link} to={urls.newCar}>Add Car</Button>}
                    {!isAuth ?
                        <Button color="inherit" component={Link} to={urls.signIn}>Sign In</Button>
                        :
                        <Button color="inherit" onClick={signOut}>Sign Out</Button>
                    }
                    {isAuth &&
                        <Avatar component={Link} to={urls.userProfile} className={classes.avatar}>
                            <PersonOutlineOutlined />
                        </Avatar>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
})