import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Box } from '@material-ui/core'

import { routes } from './router/routes'
import { Header } from './components/Header'
import { NotFound } from './pages/NotFound'

const App = () => {

    const renderRoutes = () => (
        <Switch>
            {routes.map(route => (
                <Route {...route} key={route.path} />
            ))}

            <Route component={NotFound} />
        </Switch>
    )


    return (
        <Box>
            <Header />

            <Box component="main" py={3}>
                {renderRoutes()}
            </Box>
        </Box>
    )
}

export default App
