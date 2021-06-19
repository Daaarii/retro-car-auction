import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { AppBar, Avatar, Container, Toolbar, Button, makeStyles, List, ListItemText } from '@material-ui/core'
import { PersonOutlineOutlined } from '@material-ui/icons'

import userStore from '../../store/UserStore'

import { urls } from '../../router/urls'
import Logo from '../../../assets/Logo.png'
import { ListItem } from '@material-ui/core'


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
        marginRight: 10,
        cursor: 'pointer',
    },
    languageList: {
        position: 'absolute',
        width: '100%',
        maxWidth: 100,
        top: 40,
        right: 0,
        background: '#fff',
        color: '#000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, .2)',
        borderRadius: 5,
    },
}))
export const Header = observer(() => {
    const classes = useStyles()

    const history = useHistory()

    const [languageListOpen, setLanguageListOpen] = useState(false)
    const [language, setLanguage] = useState('EN')

    const { isAuth, role, signOut } = userStore

    const languageList = () => {
        return (
            <div className={classes.languageList}>
                <List>
                    <ListItem button onClick={() => { setLanguage('EN');setLanguageListOpen(false)}}>
                        <ListItemText primary="EN" />
                    </ListItem>
                    <ListItem button onClick={() => { setLanguage('RU'); setLanguageListOpen(false)}}>
                        <ListItemText primary="RU" />
                    </ListItem>
                </List>
            </div>
        )
    }

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.logoWrapper}>
                        <Link to={urls.auctions}><img className={classes.logo} src={Logo} alt="logo" /></Link>
                    </div>
                    <Button color="inherit" component={Link} to={urls.rules}>Rules</Button>
                    {isAuth && <Button color="inherit" component={Link} to={urls.newAuction}>Create an auction</Button>}
                    <Button color="inherit" component={Link} to={urls.auctions}>Auctions</Button>
                    {!isAuth ?
                        <Button color="inherit" component={Link} to={urls.signIn}>Sign In</Button>
                        :
                        <Button color="inherit" onClick={() => { signOut(); history.push(urls.signIn) }}>Sign Out</Button>
                    }
                    {role === 'admin' && isAuth &&
                        <Button color="inherit" component={Link} to={urls.admin}>Admin</Button>
                    }
                    {isAuth &&
                        <Avatar component={Link} to={urls.userProfile} className={classes.avatar}>
                            <PersonOutlineOutlined />
                        </Avatar>
                    }
                    <Button color="inherit" onClick={() => setLanguageListOpen(prev => !prev)}>{language}</Button>
                    {languageListOpen && languageList()}
                </Toolbar>
            </Container>
        </AppBar>
    )
})