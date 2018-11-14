import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


import LightDialogPower from './lightDialogPower';
import LightDialogBrightness from './lightDialogBrightness';
import LightDialogTemperature from './lightDialogTemperature';
import LightDialogColor from './lightDialogColor';

import SofaDialog from '../sofaDialog';

const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    expansionList: {
        paddingLeft: 4,
        paddingRight: 4,
        
    },
    halves: {
        width: '40%',
    },

    halfSlider: {
        width: '40%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },
    chip: {
        background: "silver",
        color: "black",
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        margin: theme.spacing.unit,
    },

    stackedLightControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    buttonsAndSlider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    nameAndSwitch: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },
    deviceName: {
        flex: 1,
    },
    listItemLabel: {
        paddingBottom: 0,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    chipLine: {
        paddingTop:0,
        paddingLeft:8,
        paddingRight:8,
    },
    dialogContent: {
        height: "100%",
        padding: 0,
    },
    list: {
        flexGrow: 1,
    },
});

class LightDialog extends React.Component {

    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.name});
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.device.endpointId, "PowerController", "TurnOn")
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.device.endpointId, "PowerController", "TurnOff")
        }
    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.name});
    }; 

    handleBrightnessChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.device.endpointId, "BrightnessController", "SetBrightness", event)
    }; 

    handlePreColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.name});
    }; 

    handleColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.friendlyName});
        this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.device.endpointId, "ColorTemperatureController", "SetColorTemperature", event)
    }; 
    
    sb2sl(color) {
        console.log(this.props.deviceProperties)
        var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
        var SL = {h:color.hue, s:0, l:0};
        SL.l = (2 - SB.saturation) * SB.brightness / 2;
        SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
        return SL
    }
        
    sl2sb(color) {
        var SL = {h:color.h, s:color.s, l:color.l};
        var SB = {hue:color.h, saturation:0, brightness:0};
        var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
        SB.brightness = SL.l+t;
        SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
        return SB
    }
    
    handleColorSliderChange = color => {
        var hsb=this.sl2sb(color.hsl)
        this.setState({ color: hsb, target:this.props.friendlyName});
        this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.devices.endpointId, "ColorController", "SetColor", hsb)
    }

    handleColorChange = hsb => {
        this.setState({ color: hsb, target:this.props.friendlyName});
        this.props.sendAlexaCommand(this.props.device.friendlyNamee, this.props.devices.endpointId, "ColorController", "SetColor", hsb)
    }

 
    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };    
    render() {

        const { classes } = this.props;

        return (
            <SofaDialog title={this.props.name} open={this.props.open} close={this.props.handleClose} fullWidth={true} >
                <DialogContent className={classes.dialogContent}>
                    <List className={classes.list} >
                        <LightDialogPower sendAlexaCommand={this.props.sendAlexaCommand} name={this.props.name} endpointId={this.props.device.endpointId} powerState={this.props.deviceProperties.powerState=='ON'}/>
                        { this.props.deviceProperties.hasOwnProperty('brightness') ?
                        <LightDialogBrightness sendAlexaCommand={this.props.sendAlexaCommand} name={this.props.name} endpointId={this.props.device.endpointId} powerState={this.props.deviceProperties.powerState=='ON'} brightness={this.props.deviceProperties.brightness}/>
                        : null }
                        { this.props.deviceProperties.hasOwnProperty('colorTemperatureInKelvin') ?
                        <LightDialogTemperature sendAlexaCommand={this.props.sendAlexaCommand} name={this.props.name} endpointId={this.props.device.endpointId} powerState={this.props.deviceProperties.powerState=='ON'} colorTemperatureInKelvin={this.props.deviceProperties.colorTemperatureInKelvin}/>
                        : null }
                        { this.props.deviceProperties.hasOwnProperty('color') ?
                        <LightDialogColor sendAlexaCommand={this.props.sendAlexaCommand} name={this.props.name} endpointId={this.props.device.endpointId} color={this.props.deviceProperties.color}/>
                        : null }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </SofaDialog>
        );
    }
}

LightDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialog);

