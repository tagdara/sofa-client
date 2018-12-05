import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import LightDialogPower from './lightDialogPower';
import LightDialogBrightness from './lightDialogBrightness';
import LightDialogOnLevel from './lightDialogOnLevel';

import LightDialogTemperature from './lightDialogTemperature';
import LightDialogColor from './lightDialogColor';

import SofaDialog from '../sofaDialog';

const styles = theme => ({
        
    dialogContent: {
        height: "100%",
        padding: 0,
    },
    list: {
        flexGrow: 1,
    },
});

class LightDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };    
    render() {

        const { classes, device, deviceProperties, open, name } = this.props;

        return (
            <SofaDialog title={name} open={open} close={this.props.handleClose} fullWidth={true} >
                <DialogContent className={classes.dialogContent}>
                    <List className={classes.list} >
                        <LightDialogPower sendAlexaCommand={this.props.sendAlexaCommand} name={name} endpointId={device.endpointId} powerState={deviceProperties.powerState=='ON'}/>
                        { deviceProperties.hasOwnProperty('brightness') ?
                        <LightDialogBrightness sendAlexaCommand={this.props.sendAlexaCommand} name={name} endpointId={device.endpointId} powerState={deviceProperties.powerState=='ON'} brightness={deviceProperties.brightness}/>
                        : null }
                        { deviceProperties.hasOwnProperty('onLevel') ?
                        <LightDialogOnLevel sendAlexaCommand={this.props.sendAlexaCommand} name={name} endpointId={device.endpointId} powerState={deviceProperties.powerState=='ON'} onLevel={deviceProperties.onLevel}/>
                        : null }
                        { deviceProperties.hasOwnProperty('colorTemperatureInKelvin') ?
                        <LightDialogTemperature sendAlexaCommand={this.props.sendAlexaCommand} name={name} endpointId={device.endpointId} powerState={deviceProperties.powerState=='ON'} colorTemperatureInKelvin={deviceProperties.colorTemperatureInKelvin}/>
                        : null }
                        { deviceProperties.hasOwnProperty('color') ?
                        <LightDialogColor sendAlexaCommand={this.props.sendAlexaCommand} name={name} endpointId={device.endpointId} color={deviceProperties.color}/>
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

