import React from 'react'

import { urls } from './urls'
import { PCars } from '../pages/PCars'
import { PAddCar } from '../pages/PAddCar'
import { PAuth } from '../pages/PAuth'


export const routes = [
    { exact: true, path: urls.cars, render: () => <PCars /> },
    { exact: true, path: urls.newCar, render: () => <PAddCar /> },
    
    { exact: true, path: urls.login, render: () => <PAuth /> },
]
