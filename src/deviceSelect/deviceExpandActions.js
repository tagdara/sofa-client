import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TuneIcon from '@mui/icons-material/Tune';

export default function DeviceExpandActions(props) {

    return (
        <List>
            { Object.keys(props.controllers).sort().map((controller) => {
                return Object.keys(props.controllers[controller]).sort().map((action) => (
                    <ListItem button key={controller+action} onClick={() => props.select('command', props.device.friendlyName, props.device.endpointId, controller, action)}>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary={action} secondary={controller} />
                    </ListItem>
                ));
            })}
        </List>
    )
}
