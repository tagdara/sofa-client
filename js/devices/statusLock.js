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
    
    closed: {
        backgroundColor: "#6a6",
        color: theme.palette.primary.contrastText,
    },
    open: {
        backgroundColor: "#e66",
        color: theme.palette.primary.contrastText,
    },

    listItem: {
        padding: 0,
        width: '100%',
        minHeight: 48,
    },

});

class StatusLock extends React.Component {

    render() {

        const { classes, name, commands, status } = this.props;

        return (
            <ListItem className={classes.listItem}>
                { status=='closed' ?
                    <Avatar className={ classes.closed} onClick={ () => this.props.handlePress(commands.hasOwnProperty('toggle') ? 'toggle':'unlock') }><DialpadIcon /></Avatar>
                :
                    <Avatar className={ classes.open} onClick={ () => this.props.handlePress(commands.hasOwnProperty('toggle') ? 'toggle':'lock') }> <DialpadIcon /></Avatar>
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

