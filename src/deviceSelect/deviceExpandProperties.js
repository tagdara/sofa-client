import React, { memo } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TuneIcon from '@material-ui/icons/Tune';

export default function DeviceExpandProperties(props) {

    function getProperties(device, controller) {
        var proplist=[]
        for (var i = 0; i < device.capabilities.length; i++) {
            if (device.capabilities[i].hasOwnProperty('properties') && device.capabilities[i].properties.hasOwnProperty('supported')) {
                for (var j = 0; j < device.capabilities[i].properties.supported.length; j++) {
                    if (device.capabilities[i].interface.split(".")[1]==controller || controller==null) {
                        proplist.push(device.capabilities[i].properties.supported[j].name)
                    }
                }
            } 
        }
        //console.log('proplist',device.friendlyName,proplist)
        return proplist
    }

    function getControllerCommands(controller) {
        var cmds=[]
        return props.controllers[controller]
    }
    
    return (
        <List>
            { Object.keys(props.controllers).sort().map(controller => {
                return getProperties(props.device,controller).map(prop => 
                    <ListItem key={controller+prop} onClick={() => props.select('property',props.device.friendlyName, props.device.endpointId, controller, prop)}>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary={prop} secondary={controller} />
                    </ListItem>
                );
            })}
        </List>
    )
}