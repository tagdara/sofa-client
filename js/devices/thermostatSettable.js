import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const wrapperStyle = { width: 400, margin: 50 };

const styles = theme => ({

    listItem: {
        padding: "16 0 8 0",
        width: '100%',
    },
    speedlistItem: {
        padding: "0 0 8 40",
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
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    stackLabel: {
        alignSelf: "center",
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    },
    labeledSlider: {
        display: "flex",
    },
    chipLine: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
        padding: "0 32 8 0",
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

});

class ThermostatSettable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            targetSetPoint: 70,
        };

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('targetSetPoint')) {
            changes.targetSetPoint=data.targetSetPoint
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
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'PowerLevelController', 'SetPowerLevel', event)
    }; 

    handlePreSetPointChange = event => {
        this.setState({ targetSetPoint: event });
    }; 
    
    handleSetPointChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, 'ThermostatController', 'SetTargetTemperature', event)
    }; 


    handleSetMode = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "ThermostatController", "SetThermostatMode", event)
    }; 


    render() {

        const { classes } = this.props;

        return (
            <div>
            <ListItem className={classes.listItem}>
                <Avatar className={this.tempColor(this.props.deviceProperties.temperature)}>{this.props.deviceProperties.temperature}</Avatar>
                    <div className={classes.stack}>
                        <Typography variant="subheading" className={classes.stackLabel} gutterBottom>{this.props.name}</Typography>
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.targetSetPoint+"°"}</Typography>
                        <Slider min={60} max={90} defaultValue={70} step={1} value={this.state.targetSetPoint}
                                onChange={this.handlePreSetPointChange} 
                                onAfterChange={this.handleSetPointChange} 
                                trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                                handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12}}
                                railStyle={{ height: 3 }}
                                disabled={this.props.deviceProperties.thermostatMode!='HEAT'}
                        />
                    </div>
            </ListItem>
            <ListItem className={classes.chipLine}>
                    { this.supportedModes().map((mode) => (
                        <Chip 
                            key = {mode+'-mode'}
                            label= {mode}
                            className={ (this.props.deviceProperties.thermostatMode==mode) ? classes.hotchip : classes.chip }
                            onClick={ (e) => this.handleSetMode(mode)}
                        />
                    ))}
            </ListItem>
            { this.state.hasOwnProperty('powerLevel') ?
            <ListItem className={classes.speedlistItem}>
                    <div className={classes.stack}>
                        <Typography variant="subheading" className={classes.stackLabel} gutterBottom>Speed</Typography>
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.powerLevel+"%"}</Typography>
                        <Slider min={0} max={100} defaultValue={50} step={10} value={this.state.powerLevel}
                            onChange={this.handlePrePowerLevelChange} 
                            onAfterChange={this.handlePowerLevelChange} 
                            trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                            handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12}}
                            railStyle={{ height: 3 }}
                        />
                    </div>
            </ListItem>
            : null }

            </div>
            
        );
    }
}

ThermostatSettable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThermostatSettable);

