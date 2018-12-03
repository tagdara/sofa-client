import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
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

});

class GroupDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: 50,
        };
    }
    
    deviceByName = devname => {
        var fn=[]
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i]['friendlyName']==devname) {
                return this.props.devices[i]
            } 
        }
    }
 
    sendGroupAlexaCommand = (devicename, fakeEndpointId, controller, directive, value) => {
        console.log('cm',controller,this.props.controllermap)
        for (var i = 0; i < this.props.controllermap[controller].length; i++) {
            var dev=this.deviceByName(this.props.controllermap[controller][i])
            this.props.sendAlexaCommand(dev.friendlyName, dev.endpointId, controller, directive, value)
        }
    }
 
    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };    
    
    render() {

        const { classes, open, name, color, brightness, colorTemperatureInKelvin, powerState } = this.props;

        return (
            <SofaDialog name={name} open={open} close={this.props.close} fullWidth={true} >
                <DialogContent className={classes.dialogContent}>
                    <List className={classes.list} >
                        <LightDialogPower sendAlexaCommand={this.sendGroupAlexaCommand} name={name} endpointId={name} powerState={powerState}/>
                        <LightDialogBrightness sendAlexaCommand={this.sendGroupAlexaCommand} name={name} endpointId={name} powerState={powerState} brightness={brightness}/>
                        <LightDialogTemperature sendAlexaCommand={this.sendGroupAlexaCommand} name={name} endpointId={name} powerState={powerState} colorTemperatureInKelvin={colorTemperatureInKelvin}/>
                        <LightDialogColor sendAlexaCommand={this.sendGroupAlexaCommand} name={name} endpointId={name} color={color}/>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </SofaDialog>
        );
    }
}

GroupDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupDialog);
