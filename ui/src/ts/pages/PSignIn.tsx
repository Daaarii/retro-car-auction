import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Avatar, Button, Container, Grid, Typography, TextField, Link, FormControlLabel, makeStyles, Box } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

import userStore from '../store/UserStore'

import { useInput } from '../hooks/useInput'
import { urls } from '../router/urls'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const PSignIn = observer(() => {
    const classes = useStyles()
    
    const history = useHistory()

    const email = useInput()
    const password = useInput()

    const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        userStore.signIn({ email: email.value, password: password.value })
            .then(res => {
                if (res && res.redirect) {
                    history.push('/')
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className={classes.root}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email.value}
                        onChange={email.onChange}
                        error={!!userStore.signInFieldErrors.email}
                        helperText={!!userStore.signInFieldErrors.email && userStore.signInFieldErrors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password.value}
                        onChange={password.onChange}
                        error={!!userStore.signInFieldErrors.password}
                        helperText={!!userStore.signInFieldErrors.password && userStore.signInFieldErrors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/cars" variant="body2" component={RouterLink} to={urls.signUp} >
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
})
