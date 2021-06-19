import React from 'react'

import { urls } from './urls'
import { PAuctions } from '../pages/PAuctions'
import { PSignIn } from '../pages/PSignIn'
import { PSignUp } from '../pages/PSignUp'
import { PUserProfile } from '../pages/PUserProfile'
import { PNewAuction } from '../pages/PNewAuction'
import { PAuction } from '../pages/PAuction'
import { PRegistrationInAuction } from '../pages/PRegistrationInAuction'
import { PAdmin } from '../pages/PAdmin'
import { PApplication } from '../pages/PApplication'
import { PRules } from '../pages/PRules'

export interface IRoute {
    exact: boolean,
    path: string,
    render: () => JSX.Element,
    isAuthNeeded?: boolean,
    isRoleAdminNeeded?: boolean,
}

export const routes = [
    { exact: true, path: urls.rules, render: () => <PRules /> },

    { exact: true, path: urls.auctions, render: () => <PAuctions /> },

    { exact: true, path: urls.signIn, render: () => <PSignIn /> },
    { exact: true, path: urls.signUp, render: () => <PSignUp /> },

    { exact: true, path: urls.userProfile, render: () => <PUserProfile /> },

    { exact: true, path: urls.newAuction, isAuthNeeded: true, render: () => <PNewAuction /> },
    { exact: true, path: urls.auction, render: () => <PAuction /> },
    
    { exact: true, path: urls.application, render: () => <PApplication /> },

    { exact: true, path: urls.registrationInAuction, render: () => <PRegistrationInAuction /> },

    { exact: true, path: urls.admin, isAuthNeeded: true, isRoleAdminNeeded: true, render: () => <PAdmin /> },
]
