import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BasicLight from './devices/basiclight';
import DimmableLight from './devices/dimmablelight';
import TunableLight from './devices/tunablelight';
import ColorLight from './devices/colorlight';
import Thermostat from './devices/thermostat';
import Zone from './devices/zone';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from  '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GroupLight from './devices/grouplight'
import Light from './devices/light'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    nogrow: {
        flex: 1,
    },
    slider: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        
    },
    touchSized: {
        height: 72,
    },
    halves: {
        width: '50%',
    },
    halfSlider: {
        width: '50%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },

    brilabel: {
        width: '100%',
    },
    expansionDetails: {
        padding:4,
    },
    appBar: {
        paddingTop: "env(safe-area-inset-top)",
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paperItem: {
        display: "flex",
        height: 40,
        padding: "16px",
        alignItems: "center",
    }
};



function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class Area extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            brightness: 0,
            powerState: false,
            colorTemperatureInKelvin: 4000,
            target: null,
            open: false,
            endpointIdCache: [],
            lastmessage: '',
            updates: {},
            areaState: {},
        };
        this.avgState = this.avgState.bind(this);

    }

    avgState(prop) {
        
        if (prop=='on') {
            
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        return true
                    }
                }
            }
            
            return false
            
        } else if (prop=='brightness') {
            
            var brightnessCount=0;
            var totalbrightness=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {
                    brightnessCount=brightnessCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totalbrightness=totalbrightness+this.props.deviceProperties[dev].brightness;
                    }
                }
            }
        
            if (brightnessCount==0) { return 0 }

            var avgb=totalbrightness/brightnessCount
            return avgb;
        
        } else if (prop=='temperature') {
            var temperatureCount=0;
            var totaltemperature=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('colorTemperatureInKelvin')) {
                    temperatureCount=temperatureCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totaltemperature=totaltemperature+this.props.deviceProperties[dev].colorTemperatureInKelvin;
                    }
                }
            }
            
            if (temperatureCount==0) { return 0 }

            var avgb=totaltemperature/temperatureCount
            return avgb;
        
        } else {
            return 0;
        }
        
    }
    
    anyOn() {
        for (var dev in this.props.deviceProperties) {
            if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                if (this.props.deviceProperties[dev].powerState=='ON') {
                    return true
                }
            }
        }
        
        return false
        
    }


    renderSwitch(device) {

        if (device==={} || device==undefined) {
            return null;
        }
        if (device.hasOwnProperty('displayCategories')) {
            switch(device.displayCategories[0]) {
                case 'LIGHT':
                    var capabilities=[]
                    for (var i = 0; i < device.capabilities.length; i++) {
                        capabilities.push(device.capabilities[i].interface)
                    }
                    return <Light key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />

                default:
                    return null;
            }
        }
    }
    
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;
        const { devices } = this.state;  
        return (
            <Paper elevation={2} className={classes.paperItem} >
                <Typography variant="subheading" className={classes.halves} onClick={ () => this.handleClickOpen()}>{this.props.name}</Typography>
                <Slider className={classes.halves} min={0} max={100} defaultValue={this.avgState('brightness')} value={this.avgState('brightness')} 
                        trackStyle={{ backgroundColor: 'orangeRed', height: 2 }}
                        handleStyle={{
                            borderColor: 'orangeRed',
                            backgroundColor: 'orangeRed',
                        }}
                />
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle id="area-dialog-title">
                    { this.props.name!='All' ?

                    <GroupLight key={ this.props.name } name={ this.props.name } deviceProperties={ this.props.deviceProperties } devices={ this.props.devices } avgState={ this.avgState } sendMessage={this.props.sendMessage} />
                    : null
                    
                    }
                </DialogTitle>
                <DialogContent>
                    <List className={classes.root}>
                    {
                        Object.keys(this.props.devices).sort().map(c => (
                        
                            this.renderSwitch(this.props.devices[c])))
                    }
                  </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
            </Paper>
        );
    }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};


export default withStyles(styles)(withMobileDialog()(Area));

