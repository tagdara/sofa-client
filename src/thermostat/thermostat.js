import React from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from '../GridItem'

export default function Thermostat(props) { 
    
    function tempColor(temp) {
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }

    return (

        <GridItem wide={props.wide} >
            <ListItem onClick={props.onClick}>
                <ToggleAvatar avatarState={ tempColor(props.deviceProperties.temperature)}>{props.deviceProperties.temperature}</ToggleAvatar>
                { props.deviceProperties.hasOwnProperty('targetSetpoint') ?
                    <ListItemText primary={props.name} secondary={props.deviceProperties.thermostatMode=='OFF' ? 'Off' : 'Heat set to '+props.deviceProperties.targetSetpoint}/>
                    :
                    <ListItemText primary={props.name} />
                }
           </ListItem>
       </GridItem>
    );
}
