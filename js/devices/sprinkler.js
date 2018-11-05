import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const styles = theme => ({

    listItem: {
        padding: "8 0",
        width: '100%',
    },
    waterIcon: {
        backgroundColor: "#6666FF",
    }
});

class Sprinkler extends React.Component {

    handlePress = commandName => {
        console.log(commandName,this.props.commands)
        var command = this.props.commands[commandName]
        console.log(commandName,command, this.props.commands)
        this.props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   
    
    render() {

        const { classes, name, commands } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={classes.waterIcon}><InvertColorsIcon /></Avatar>
                <ListItemText primary={name}/>
                <IconButton className={classes.button} onClick={ () => this.handlePress('on') }>
                    <CheckIcon />
                </IconButton>
                <IconButton className={classes.button} onClick={ () => this.handlePress('off') }>
                    <CloseIcon />
                </IconButton>
            </ListItem>
        );
    }
}

Sprinkler.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sprinkler);

