import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';
import ToggleAvatar from '../ToggleAvatar'
import GridItem from '../GridItem';

const useStyles = makeStyles(theme => {
    return {      
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        buttonRight: {
            padding: "3px 8px",
            backgroundColor: theme.palette.background.button,
        },
        
        item: {
            minHeight: 54,
        }
    }
})

export default function Shade(props) {

    const classes = useStyles();

    function handlePress(commandName) {
        var command = props.commands[commandName]
        props.directive(command.endpointId, command.controller, command.command, command.value)
    }
    
    function nestLine(item) {
        if (props.nested) { return item }
        return <GridItem>{item}</GridItem>
    }

    return ( nestLine(
        <ListItem className={classes.item} >
            <ToggleAvatar noback={true} avatarState={ 'off' }>{ props.icon ? props.icon : <TonalityIcon />}</ToggleAvatar>
            <ListItemText primary={props.name}/>
            <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                <Button className={classes.button} onClick={ () => handlePress('down') }><ExpandMoreIcon /></Button>
                <Button className={classes.button} onClick={ () => handlePress('stop') }><RemoveIcon /></Button>
                <Button className={classes.buttonRight} onClick={ () => handlePress('up') }><ExpandLessIcon /></Button>
            </ButtonGroup>
        </ListItem>
        )
    );
}
