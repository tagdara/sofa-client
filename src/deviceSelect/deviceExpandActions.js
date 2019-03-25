import React, { memo } from 'react';
import { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TuneIcon from '@material-ui/icons/Tune';

export default function DeviceExpandActions(props) {

    function getControllerCommands(controller) {
        var cmds=[]
        if (props.directives.hasOwnProperty(controller)) {
            return Object.keys(props.directives[controller])
        }
        console.log('Did not find',controller,'in',props.directives)
        return []
    }

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
