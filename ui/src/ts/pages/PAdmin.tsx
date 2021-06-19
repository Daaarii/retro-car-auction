import React, { useState } from 'react'
import { Container, makeStyles, Tab, Tabs, Theme } from '@material-ui/core'

import { AuctionList } from '../components/AuctionList'
import { AddCountry } from '../components/AddCountry'
import { AddBrand } from '../components/AddBrand';

import auctionsStore from '../store/AuctionsStore'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    tabs: {
        width: '20%',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    main: {
        padding: 30,
        width: '80%',
    },
}));

enum TabsEnum {
    APPLICATIONS = 'Applications',
    ADD_COUNTRY = 'Add country',
    ADD_BRAND = 'Add brand',
}

export const PAdmin = observer(() => {
    const classes = useStyles()
    
    const { auctionsData, applications, fetchApplications } = auctionsStore

    const [tab, setTab] = useState(0)

    useEffect(() => {
        fetchApplications()
    }, [])

    const renderMain = () => {
        switch (tab) {
            case 0:
                return <AuctionList applications={applications} auctionsData={auctionsData} areRequests />
            case 1:
                return <AddCountry />
            case 2:
                return <AddBrand />
        }
    }

    const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
        setTab(value)
    }

    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    value={tab}
                    onChange={handleTabChange}
                    className={classes.tabs}
                >
                    {Object.values(TabsEnum).map(tab => <Tab key={tab} label={tab} />)}
                </Tabs>
                <div className={classes.main}>
                    {renderMain()}
                </div>
            </div>
        </Container>
    )
})
