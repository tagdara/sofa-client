import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const styles = theme => ({
        
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    cool: {
        backgroundColor: "#00796B"
    },
    mid: {
        backgroundColor: "#558B2F"
    },
    hot: {
        backgroundColor: "#E65100"
    }
});

class Computer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            lockState: "OFF",
            powerState: "OFF",
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('powerState')) {
            changes.powerState=data.powerState
        }
        
        if (data.hasOwnProperty('lockState')) {
            changes.lockState=data.lockState
        }

        return changes
    }
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked });
        console.log('power change on ', this.props.name)
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={classes.hot}><DesktopWindowsIcon /></Avatar>
                { this.state.powerState=='ON' ?
                <ListItemText primary={this.props.name} secondary={this.state.lockState=='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={this.props.name} secondary={'Powered off'}/>
                }
                
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={this.state.powerState=='ON'} onChange={this.handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
            
        );
    }
}

Computer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Computer);

