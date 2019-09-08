import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TuneIcon from '@material-ui/icons/Tune';

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
