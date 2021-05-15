import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import userStore from './store/UserStore'

import { routes } from './router/routes'
import { Header, Footer } from './components/layout'
import { NotFound } from './pages/NotFound'

const App = observer(() => {

    const renderRoutes = () => (
        <Switch>
            {routes.map(({ exact, path, render, isAuthNeeded }) => (
                isAuthNeeded ? userStore.isAuth ?
                    <Route
                        key={path}
                        exact={exact}
                        path={path}
                        render={render}
                    /> : null
                    :
                    <Route
                        key={path}
                        exact={exact}
                        path={path}
                        render={render}
                    />
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

            <Footer />
        </Box>
    )
})

export default App
