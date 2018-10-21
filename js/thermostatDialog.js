import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Thermostat from './devices/thermostat';
import ThermostatSettable from './devices/thermostatSettable';


const styles = theme => ({
        
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={this.props.open}  
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle className={classes.tabTitle}>

                        <Toolbar className={classes.appBar} elevation={0}>
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                                Temperatures
                            </Typography>
                        </Toolbar>
          
                </DialogTitle>
                <Divider />
                <DialogContent className={classes.dialogContent }>
                        <List className={classes.thermostatList} >
                    { 
                    this.settableDevices().map((device) => (
                        <ThermostatSettable sendAlexaCommand={this.props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />
                        :
                        null
                    ))}
                        <Divider />

                    { 
                    this.nonSettableDevices().map((device) => (
                        <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] }  />
                        : null
                    ))}
                        </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }

}

ThermostatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ThermostatDialog));
