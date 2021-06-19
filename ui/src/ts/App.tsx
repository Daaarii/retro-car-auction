import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import userStore from './store/UserStore'

import { routes, IRoute } from './router/routes'
import { Header, Footer } from './components/layout'
import { NotFound } from './pages/NotFound'
import authStorage from './utils/authStorage'

import './index.scss'

const App = observer(() => {

    useEffect(() => {
        if (userStore.isAuth) {
            userStore.fetchUserData(userStore.id)
        }
    }, [])

    const checkAndRenderRoute = ({ exact, path, render, isAuthNeeded, isRoleAdminNeeded }: IRoute) => {
        if (isAuthNeeded && !userStore.isAuth) {
            return null
        }
        if (isRoleAdminNeeded && userStore.role !== 'admin') {
            return null
        }
        return (
            <Route
                key={path}
                exact={exact}
                path={path}
                render={render}
            />
        )
    }

    const renderRoutes = () => (
        <Switch>
            {routes.map(checkAndRenderRoute)}

            <Route component={NotFound} />
        </Switch>
    )

    return (
        <Box>
            <Header />

            <Box component="main" py={3}>
                {renderRoutes()}
            </Box>

            <Footer />
        </Box>
    )
})

export default App
