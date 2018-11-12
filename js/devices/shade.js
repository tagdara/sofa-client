import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';

const styles = theme => ({

    listItem: {
        padding: "8 0",
        width: '100%',
    },
});

class Shade extends React.Component {

    handlePress = commandName => {
        console.log(commandName,this.props.commands)
        var command = this.props.commands[commandName]
        console.log(commandName,command, this.props.commands)
        this.props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   
    
    render() {

        const { classes, name } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar><TonalityIcon /></Avatar>
                <ListItemText primary={name}/>
                <IconButton onClick={ () => this.handlePress('down') }><ExpandMoreIcon /></IconButton>
                <IconButton onClick={ () => this.handlePress('stop') }><RemoveIcon /></IconButton>
                <IconButton onClick={ () => this.handlePress('up') }><ExpandLessIcon /></IconButton>
            </ListItem>
        );
    }
}

Shade.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shade);

