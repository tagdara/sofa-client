import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SofaSlider from '../sofaSlider';

import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Paper from '@material-ui/core/Paper';

import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';

import { HuePicker } from 'react-color';
import GroupDialog from './groupDialog';

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
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
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
    grouplight: {
        width: "100%",
        display: "flex",
        flexGrow: 1,
        maxWidth: 480,
        minWidth: 320,
    },
    litAvatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    stack: {
        height: 44,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: "center",
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
        minWidth: 320,
        backgroundColor: theme.palette.primary[50],
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    }

});

class GroupLight extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: 50,
            powerState: false,
            colorTemperatureInKelvin: 4000,
            color: {hue: 200, saturation:1, brightness: 1},
            target: null,
            open: false,
            endpointId: '',
            lastmessage: '',
            controllermap: [],
            areaState: {},
        };
    }

    componentDidMount() {
        var controllermap={ 'ColorController': [], 'ColorTemperatureController': [], 'BrightnessController':[], 'PowerController':[] }
        for (var dev in this.props.devices) {
            if (this.props.devices[dev].hasOwnProperty('displayCategories')) {
                switch(this.props.devices[dev].displayCategories[0]) {
                    case 'LIGHT':
                        for (var j = 0; j < this.props.devices[dev].capabilities.length; j++) {
                            if (controllermap.hasOwnProperty(this.props.devices[dev].capabilities[j].interface.split('.')[1])) {
                                controllermap[this.props.devices[dev].capabilities[j].interface.split('.')[1]].push(this.props.devices[dev].friendlyName)
                            }
                        }
                }
            }
        }
  	    this.setState({ 'controllermap': controllermap })
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
    
    handlePowerChange = event => {
        
        this.setState({ powerState: event.target.checked });
        for (var i = 0; i < this.props.devices.length; i++) {
            if (event.target.checked) {
                this.props.sendAlexaCommand(this.props.devices[i].friendlyNamee, this.props.devices[i].endpointId, "PowerController", "TurnOn")
             } else {
                this.props.sendAlexaCommand(this.props.devices[i].friendlyNamee, this.props.devices[i].endpointId, "PowerController", "TurnOff")
            }
        }

    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.friendlyName});
    }; 


    handleBrightnessChange = event => {
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.deviceProperties[this.props.devices[i].friendlyName].hasOwnProperty('brightness')) {
                this.props.sendAlexaCommand(this.props.devices[i].friendlyNamee, this.props.devices[i].endpointId, "BrightnessController", "SetBrightness", event)
            }
        }
    }; 

    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };  
    
    render() {

        const { classes,  } = this.props;

        return (
            <Paper className={classes.sliderPaper} elevation={0}>
                <Avatar className={ this.avgState('on') ? classes.litAvatar: classes.avatar} onClick={ () => this.handleClickOpen()}>
                    <PlaceIcon />
                </Avatar>
                <SofaSlider name={this.props.name+' Lights'} min={0} max={100} step={1} value={this.avgState('brightness')}
                        preChange={this.handlePreBrightnessChange} change={this.handleBrightnessChange} 
                        disabled={ !this.avgState('on') && !(this.brightness=='no') } padLeft={true}
                    />
                <Switch color="primary" checked={ this.avgState('on') } onChange={this.handlePowerChange} />
                <GroupDialog    powerState={this.avgState('on')} brightness={this.avgState('brightness')} open={this.state.open} close={this.handleClose}
                                color={this.avgState('color')} colorTemperatureInKelvin={this.avgState('colorTemperatureInKelvin')} 
                                controllermap={this.state.controllermap} devices={this.props.devices} sendAlexaCommand={this.props.sendAlexaCommand}  />
            </Paper>
        );
    }
}

GroupLight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupLight);

