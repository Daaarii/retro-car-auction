import React from 'react'

import { urls } from './urls'
import { PCars } from '../pages/PCars'
import { PAddCar } from '../pages/PAddCar'
import { PSignIn } from '../pages/PSignIn'
import { PSignUp } from '../pages/PSignUp'
import { PUserProfile } from '../pages/PUserProfile'
import { PNewAuction } from '../pages/PNewAuction'


export const routes = [
    { exact: true, path: urls.cars, render: () => <PCars /> },
    { isAuthNeeded: true, exact: true, path: urls.newCar, render: () => <PAddCar /> },

    { exact: true, path: urls.signIn, render: () => <PSignIn /> },
    { exact: true, path: urls.signUp, render: () => <PSignUp /> },

    { exact: true, path: urls.userProfile, render: () => <PUserProfile /> },

    { exact: true, path: urls.newAuction, render: () => <PNewAuction /> },
]
