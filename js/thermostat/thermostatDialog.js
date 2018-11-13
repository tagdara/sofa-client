import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import SofaDialog from '../sofaDialog'
import Thermostat from './thermostat';
import ThermostatSettable from './thermostatSettable';


const styles = theme => ({
        
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    list: {
        width: "100%",
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },

});

class ThermostatDialog extends React.Component {
    
    settableDevices = () => {
        
        var settable=[]
        for (var i = 0; i < this.props.devices.length; i++) {
            for (var j = 0; j < this.props.devices[i].capabilities.length; j++) {
                if (this.props.devices[i].capabilities[j].interface=="Alexa.ThermostatController") {
                    settable.push(this.props.devices[i])
                    break
                }
            }
        }
        return settable;
    }; 
    
    nonSettableDevices = () => {
        
        var nonSettable=[]
        for (var i = 0; i < this.props.devices.length; i++) {
            var devSettable=false
            for (var j = 0; j < this.props.devices[i].capabilities.length; j++) {
                if (this.props.devices[i].capabilities[j].interface=="Alexa.ThermostatController") {
                    devSettable=true;
                    break
                }
            }
            if (!devSettable) {
                nonSettable.push(this.props.devices[i])    
            }
        }
        return nonSettable;
    }; 
    
    
    render() {
        
        const { classes } = this.props;
        const settable = this.settableDevices();
        const nonSettable = this.nonSettableDevices();
        
        return (
            <SofaDialog title={'Temperatures'} open={this.props.open} close={this.props.close} >
                <DialogContent className={classes.dialogContent }>
                    <List  >

                    { settable.map(device => 
                        <ThermostatSettable sendAlexaCommand={this.props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } 
                                            device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } />
                    )}
                        <Divider />
                    { nonSettable.map(device => 
                        <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } 
                                    deviceProperties={ this.props.deviceProperties[device.friendlyName] }  />
                    )}
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }
}

ThermostatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThermostatDialog);
