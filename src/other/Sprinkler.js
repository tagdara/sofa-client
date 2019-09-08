import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from '../DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

import GridItem from '../GridItem';

const useStyles = makeStyles({
    
    waterIcon: {
        backgroundColor: "#6666FF",
    }
});

export default function Sprinkler(props) {

    const classes = useStyles();
    const { deviceByEndpointId } = useContext(DataContext);

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
