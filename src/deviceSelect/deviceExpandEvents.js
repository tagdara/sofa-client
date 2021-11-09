import React from 'react';
import { makeStyles } from '@mui/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TuneIcon from '@mui/icons-material/Tune';

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
