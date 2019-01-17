import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles({
        
    detailList: {
        paddingLeft: 24,
    },
});

export default function DeviceExpandEvents(props) {

    const classes = useStyles();

    return (
        <List className={classes.detailList}>
            { Object.keys(props.eventSources).map(source => {
                return props.eventSources[source].map(event => 
                    <ListItem key={source} onClick={() => props.select('event',props.device.friendlyName, props.device.endpointId, source, event.name)}>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary={event.name} />
                    </ListItem>
                )
            })}
        </List>
    )
}
