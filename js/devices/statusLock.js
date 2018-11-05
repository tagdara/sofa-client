import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import FlipIcon from '@material-ui/icons/Flip';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = theme => ({

    listItem: {
        padding: "8 0",
        width: '100%',
    },

});

class StatusLock extends React.Component {

    handlePress = commandName => {
        console.log(commandName,this.props.commands)
        var command = this.props.commands[commandName]
        console.log(commandName,command, this.props.commands)
        this.props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   
    
    render() {

        const { classes, name, commands, status } = this.props;

        return (
            <ListItem className={classes.listItem}>
                { status=='closed' ?
                    <Avatar onClick={ () => this.handlePress(commands.hasOwnProperty('toggle') ? 'toggle':'unlock') }><DialpadIcon /></Avatar>
                :
                    <Avatar onClick={ () => this.handlePress(commands.hasOwnProperty('toggle') ? 'toggle':'lock') }> <DialpadIcon /></Avatar>
                }                
                <ListItemText primary={name} secondary={ status } />

            </ListItem>
        );
    }
}

StatusLock.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatusLock);

