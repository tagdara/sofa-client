import React from 'react';

import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import GridItem from '../GridItem';

export default function Device(props) {

    function handlePress(commandName) {
        if (commandName=="OFF") {
            props.sendAlexaCommand(props.name, props.device.endpointId, 'PowerController', 'TurnOff')
        } else if (commandName=="ON") {
            props.sendAlexaCommand(props.name, props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }   

    return (
        <GridItem>
            <ListItem>
                <ToggleAvatar avatarState={"on"}><TuneIcon /></ToggleAvatar>
                <ListItemText primary={props.name}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={ () => handlePress('ON') }>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={ () => handlePress('OFF') }>
                        <CloseIcon />
                    </IconButton>
                </ListItemSecondaryAction>
           </ListItem>
        </GridItem> 
    );
}


