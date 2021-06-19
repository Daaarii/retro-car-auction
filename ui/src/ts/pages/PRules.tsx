import React from 'react'
import { Container, List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core'

import rules from '../rules'

const useStyles = makeStyles({
    root: {
    },
    ul: {
        padding: 0,
    },
    listSubheader: {
        color: '#000',
        fontSize: 18,
        background: '#CECECE',
    },
})

export const PRules = () => {
    const classes = useStyles()

    return (
        <Container maxWidth="md">
            <List className={classes.root} subheader={<li />}>
                {rules.map(ruleItem => (
                    <li key={ruleItem.title}>
                        <ul className={classes.ul}>
                            <ListSubheader className={classes.listSubheader}>{ruleItem.title}</ListSubheader>
                            {ruleItem.rules.map((rule) => (
                                <ListItem key={rule}>
                                    <ListItemText primary={rule} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        </Container>
    )
}
