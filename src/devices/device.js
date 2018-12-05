import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
        
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    hot: {
        backgroundColor: "#E65100"
    }
});

class Device extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: "OFF",
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('powerState')) {
            changes.powerState=data.powerState
        }
        
        return changes
    }
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked });
        console.log('power change on ', this.props.name, event.target.checked)
        if (event.target.checked) {
            this.setState({ powerState: 'ON' });
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            this.setState({ powerState: 'OFF' });
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    handlePress = commandName => {
        if (commandName=="OFF") {
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOff')
        } else if (commandName=="ON") {
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }   
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={classes.hot}><TuneIcon /></Avatar>
                <ListItemText primary={this.props.name}/>
                <IconButton className={classes.button} onClick={ () => this.handlePress('ON') }>
                    <CheckIcon />
                </IconButton>
                <IconButton className={classes.button} onClick={ () => this.handlePress('OFF') }>
                    <CloseIcon />
                </IconButton>
           </ListItem>
            
        );
    }
}

Device.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Device);

