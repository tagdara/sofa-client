import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
    }
};

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
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return Area.parseEndpoint(nextProps)
    }


    static parseEndpoint(data) {
        
        var changes={}
        changes.updates={}
        for (var i = 0; i < data.devices.length; i++) {
            changes.updates[data.devices[i].endpointId]={}
        }
        
        if (data.wsUpdate.hasOwnProperty('event')) {
            changes.updates[data.wsUpdate.event.endpoint.endpointId]=data.wsUpdate;
        }
        return changes;
    
    }
    
    renderSwitch(device) {
        //console.log(device)
        if (device==={}) {
            return null;
        }
        
        switch(device.displayCategories[0]) {
            case 'LIGHT':
                var capabilities=[]
                for (var i = 0; i < device.capabilities.length; i++) {
                    capabilities.push(device.capabilities[i].interface)
                }
                if (capabilities.includes('Alexa.ColorController')) {
                    return <ColorLight key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;
                } else if (capabilities.includes('Alexa.ColorTemperatureController')) {
                    return <TunableLight key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;
                } else if (capabilities.includes('Alexa.BrightnessController')) {
                    return <DimmableLight key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;
                } else {
                    return <BasicLight key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;
                }

            case 'THERMOSTAT':
                return <Thermostat key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;
            case 'ZONE':
                return <Zone key={ device.endpointId } friendlyName={ device.friendlyName } wsUpdate={this.state.updates[device.endpointId]} sender={this.props.sender}/>;

            default:
                return null;
        }
}

    render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel elevation={2}>
                <ExpansionPanelSummary className={classes.touchSized} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.halves}>{this.props.name}</Typography>
                    <div className={ classes.halfSlider }>
                    <Slider min={0} max={3} defaultValue={0}
                            trackStyle={{ backgroundColor: 'orangeRed', height: 2 }}
                            handleStyle={{
                                borderColor: 'orangeRed',
                                backgroundColor: 'orangeRed',
                            }}
                    />
                    </div>
                    <Typography />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetails}>

                    <List className={classes.root}>
                    {
                        this.props.devices.map(c => (
                            this.renderSwitch(c)))
                    }
                    
                  </List>


                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Area);

