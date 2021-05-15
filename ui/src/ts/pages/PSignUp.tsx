import React from 'react'
import {
    Avatar,
    Button,
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Link,
    makeStyles,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import userStore from '../store/UserStore'

import { urls } from '../router/urls'
import { useUpload } from '../hooks/useUpload'
import { useInput } from '../hooks/useInput'
import { useInputWithValidation } from '../hooks/useInputWithValidation'
import { getValidationProps } from '../utils/getValidationProps'
import { Upload } from '../components/Upload'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    formControl: {
        minWidth: 140,
    },
    avatarName: {
        marginLeft: 10,
        lineHeight: 2.5,
    },
}))

export const PSignUp = observer(() => {
    const classes = useStyles()

    const history = useHistory()

    const { loading, error, signUp, signUpFieldErrors } = userStore

    const firstName = useInputWithValidation({ isEmpty: true })
    const lastName = useInputWithValidation({ isEmpty: true })
    const nickname = useInputWithValidation({ isEmpty: true, minLenth: 3, maxLength: 12 })
    const email = useInputWithValidation({ isEmpty: true, isEmail: true })
    const password = useInputWithValidation({ isEmpty: true, isPassword: true })
    const confirmPassword = useInput('')
    const avatar = useUpload()

    const isDisabled = () => {
        return !(firstName.isValid &&
            lastName.isValid &&
            nickname.isValid &&
            email.isValid &&
            password.isValid &&
            password.value === confirmPassword.value)
    }

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        signUp({
            firstName: firstName.value,
            lastName: lastName.value,
            nickname: nickname.value,
            email: email.value,
            password: password.value,
            file: avatar.value as File,
        }).then(res => {
            if (res.redirect) {
                history.push('sign_in')
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
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firtName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First name"
                                {...getValidationProps(firstName)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last name"
                                {...getValidationProps(lastName)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="nickname"
                                variant="outlined"
                                required
                                fullWidth
                                label="Nickname"
                                {...getValidationProps(nickname, signUpFieldErrors.nickname)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                                {...getValidationProps(email, signUpFieldErrors.email)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                {...getValidationProps(password)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                label="Confirm password"
                                value={confirmPassword.value}
                                onChange={confirmPassword.onChange}
                                onBlur={confirmPassword.onBlur}
                                error={confirmPassword.isBlur && password.value !== confirmPassword.value}
                                helperText={confirmPassword.isBlur && password.value !== confirmPassword.value && "Пароли не совпадают."}
                            />
                        </Grid>
                        <Grid item container xs={12} wrap="nowrap">
                            <Upload onChange={avatar.onChange} />
                            <Typography className={classes.avatarName} noWrap>
                                {avatar.value && (avatar.value as File).name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignUp}
                        disabled={isDisabled()}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" component={RouterLink} to={urls.signIn}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
})
