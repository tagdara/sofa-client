import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TuneIcon from '@mui/icons-material/Tune';

export default function DeviceExpandProperties(props) {

    function getProperties(device, controller) {
        var proplist=[]
        for (var i = 0; i < device.capabilities.length; i++) {
            if (device.capabilities[i].hasOwnProperty('properties') && device.capabilities[i].properties.hasOwnProperty('supported')) {
                for (var j = 0; j < device.capabilities[i].properties.supported.length; j++) {
                    if (device.capabilities[i].interface.split(".")[1]===controller || controller==null) {
                        proplist.push(device.capabilities[i].properties.supported[j].name)
                    }
                }
            } 
        }
        //console.log('proplist',device.friendlyName,proplist)
        return proplist
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