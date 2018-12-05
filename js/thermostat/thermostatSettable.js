import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ToysIcon from '@material-ui/icons/Toys';

import SofaSlider from '../sofaSlider'

const styles = theme => ({

    listItem: {
        padding: "16 0 8 0",
        width: '100%',
    },
    listItemIndent: {
        padding: "16 0 8 64",
        width: '100%',
    },
    speedlistItem: {
        padding: "0 0 8 40",
        width: '100%',
    },
    cool: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#00796B"
    },
    mid: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#558B2F"
    },
    hot: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#E65100"
    },
    buttonLine: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        padding: "0 8 8 0",
    },
    button: {
        minWidth: 36
    },
    hotButton: {
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
});

class ThermostatSettable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            targetSetpoint: 70,
        };

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('targetSetpoint')) {
            changes.targetSetpoint=data.targetSetpoint
        }
        if (data.hasOwnProperty('powerLevel')) {
            changes.powerLevel=data.powerLevel
        }

        return changes
    }

    supportedModes = () => {
        for (var i = 0; i < this.props.device.capabilities.length; i++) {
            if (this.props.device.capabilities[i]['interface']=='Alexa.ThermostatController') {
                if (this.props.device.capabilities[i].hasOwnProperty('configuration')) {
                    if (this.props.device.capabilities[i]['configuration'].hasOwnProperty('supportedModes')) {
                        return this.props.device.capabilities[i]['configuration']['supportedModes']
                    }
                }
            }
        }
        return []
    }
                    
    
    tempColor = (temp) => {
        if (temp>=74) { return this.props.classes.hot }
        if (temp<70) { return this.props.classes.cool }
        return this.props.classes.mid;
    }
    
    handlePrePowerLevelChange = event => {
        this.setState({ powerLevel: event });
    }; 
    
    handlePowerLevelChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "PowerLevelController", "SetPowerLevel", {"powerLevel": event})
    }; 

    handlePreSetpointChange = event => {
        this.setState({ targetSetpoint: event });
    }; 
    
    handleSetpointChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "ThermostatController", "SetTargetTemperature", { "targetSetpoint": { "value": event, "scale": "FAHRENHEIT"}} )
    }; 


    handleSetMode = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "ThermostatController", "SetThermostatMode",  {"thermostatMode" : { "value": event }} )
    }; 

    render() {

        const { classes, name, deviceProperties } = this.props;
        const { targetSetpoint, powerLevel } = this.state;

        return (
            <React.Fragment>
                <ListItem className={classes.listItem}>
                    <Avatar className={ this.tempColor(deviceProperties.temperature) }>{ deviceProperties.temperature }</Avatar>
                    <SofaSlider min={60} max={90} defaultValue={70} value={targetSetpoint} unit={"°"} name={name} padLeft={true}
                                preChange={this.handlePreSetpointChange} change={this.handleSetpointChange} 
                                dis={ deviceProperties.thermostatMode!='HEAT' } />
                </ListItem>
                <ListItem className={classes.buttonLine}>
                        { this.supportedModes().map((mode) => (
                            <Button onClick={ (e) => this.handleSetMode(mode)} size="small" key = {mode+'m'} className={( deviceProperties.thermostatMode==mode ) ? classes.hotButton : classes.button }>
                            {mode}
                            </Button>
                        ))}
                </ListItem>
                { this.state.hasOwnProperty('powerLevel') ?
                <ListItem className={classes.listItemIndent}>
                    <ListItemIcon><ToysIcon /></ListItemIcon>
                    <SofaSlider value={powerLevel} step={10} unit={"%"} name={"Fan Speed"} padLeft={false}
                                preChange={this.handlePrePowerLevelChange} change={this.handlePowerLevelChange} />
                </ListItem>
                : null }
            </React.Fragment>
        );
    }
}

ThermostatSettable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThermostatSettable);

