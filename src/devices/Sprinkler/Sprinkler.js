import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { DeviceStateContext } from 'context/DeviceStateContext';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

import GridItem from 'components/GridItem';

const useStyles = makeStyles({
    
    waterIcon: {
        backgroundColor: "#6666FF",
    }
});

export default function Sprinkler(props) {

    const classes = useStyles();
    const { deviceByEndpointId } = useContext(DeviceStateContext);

    function handlePress(commandName) {
        var command = props.commands[commandName]
        deviceByEndpointId(command.endpointId)[command.controller].directive(command.command, command.value)
    }   

    return (
        <GridItem nopaper={true} >
            <ListItem>
                <Avatar className={classes.waterIcon}><InvertColorsIcon /></Avatar>
                <ListItemText primary={props.name}/>
                <ListItemSecondaryAction>
                    <IconButton className={classes.button} onClick={ () => handlePress('on') }>
                        <CheckIcon />
                    </IconButton>
                    <IconButton className={classes.button} onClick={ () => handlePress('off') }>
                        <CloseIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </GridItem>

    );

}
