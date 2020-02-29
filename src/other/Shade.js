import React, { useContext } from 'react';
import { DeviceContext } from '../DataContext/DeviceProvider';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';

import GridItem from '../GridItem';


export default function Shade(props) {
    
    const { directive } = useContext(DeviceContext);
    
    function handlePress(commandName) {
        var command = props.commands[commandName]
        directive(command.endpointId, command.controller, command.command, command.value)
    }   

    return (
        <GridItem>
        <ListItem>
            <ListItemAvatar>
                <Avatar><TonalityIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name}/>
            <ListItemSecondaryAction>
                <ButtonGroup size="small" >
                    <Button onClick={ () => handlePress('down') }><ExpandMoreIcon /></Button>
                    <Button onClick={ () => handlePress('stop') }><RemoveIcon /></Button>
                    <Button onClick={ () => handlePress('up') }><ExpandLessIcon /></Button>
                </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
        </GridItem>
    );
}
