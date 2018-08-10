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
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { HuePicker } from 'react-color';

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
    }
});

class TunableLight extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: 0,
            powerState: false,
            colorTemperatureInKelvin: 4000,
            target: null,
            open: false,
            endpointId: '',
            lastmessage: '',
        };
    }

 
    static getDerivedStateFromProps(nextProps, prevState) {
        return TunableLight.parseState(nextProps.deviceState, prevState.endpointId)
    
    }

    static parseState(data, endpointId) {
        
        
        var changes={}
        if (data===undefined) {
            return changes
        }
        
        if (data.hasOwnProperty('event')) {
            
            if (endpointId=='') {
                changes.endpointId=data.event.endpoint.endpointId
            }
            
            if ((endpointId==data.event.endpoint.endpointId) || changes.hasOwnProperty('endpointId')) {

                if (data.hasOwnProperty('context')){
                    for (var i = 0; i < data.context.properties.length; i++) {
                        if (data.context.properties[i].name=='powerState') {
                            changes.powerState= data.context.properties[i].value=='ON';
                        } 
                        else if (data.context.properties[i].name=='brightness') {
                            changes.brightness=data.context.properties[i].value;
                        }   
                        else if (data.context.properties[i].name=='colorTemperatureInKelvin') {
                            changes.colorTemperatureInKelvin=data.context.properties[i].value;
                        } 

                    }
                } 
                // might be both. We probably don't need to apply the ones from context in a change 
                // but might as well keep it all in sync.
                if (data.hasOwnProperty('payload')){
                    if (data.payload.hasOwnProperty('change')){
                        for (var i = 0; i < data.payload.change.properties.length; i++) {
                            if (data.payload.change.properties[i].name=='powerState') {
                                changes.powerState=data.payload.change.properties[i].value=='ON';
                            } 
                            else if (data.payload.change.properties[i].name=='brightness') {
                                changes.brightness=data.payload.change.properties[i].value;
                            }   
                            else if (data.payload.change.properties[i].name=='colorTemperatureInKelvin') {
                                changes.colorTemperatureInKelvin=data.payload.change.properties[i].value;
                            } 
                        }
                    }
                }


            }
        }
        return changes;
    }
    
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "value":event.target.checked}
        this.props.sender(JSON.stringify(ops));
    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.device.friendlyName});
    }; 

    handleBrightnessChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/BrightnessController/brightness", "value":event}
        this.props.sender(JSON.stringify(ops));
    }; 

    handlePreColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.device.friendlyName});
    }; 

    handleColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/ColorTemperatureController/colorTemperatureInKelvin", "value":event}
        this.props.sender(JSON.stringify(ops));
    }; 
    
 
    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };    
    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.paperLight}>
            <Avatar className={classes.avatar} onClick={ () => this.handleClickOpen()}>
                <LightbulbOutlineIcon />
            </Avatar>
                <List className={classes.stackedLightControl}>
                    <ListItem className={classes.nameAndSwitch}>
                        <ListItemText className={classes.deviceName} primary={this.props.device.friendlyName}/>
                        <ListItemSecondaryAction>
                            <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem className={classes.buttonsAndSlider}>
                        <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.state.powerState}
                            onChange={this.handlePreBrightnessChange} 
                            onAfterChange={this.handleBrightnessChange} 
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 10 } : { backgroundColor: 'silver', height: 10 }}
                            handleStyle={this.state.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: 0, height: 10}
                            }
                            railStyle={{ height: 10 }}
                        />
                    </ListItem>
                </List>
            <Dialog open={this.state.open} onClose={this.handleClose} >
                <DialogTitle >{this.props.name}</DialogTitle>
                <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Power" onClick={ () => this.handleClickOpen()}/>
                        <ListItemSecondaryAction>
                            <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="Brightness" />
                    </ListItem>
                    <ListItem>
                        <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.state.powerState}
                            onChange={this.handlePreBrightnessChange} 
                            onAfterChange={this.handleBrightnessChange} 
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 10 } : { backgroundColor: 'silver', height: 10 }}
                            handleStyle={this.state.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: 0, height: 10}
                            }
                            railStyle={{ height: 10 }}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="White Color Temperature" />
                    </ListItem>
                    <ListItem>
                        <Slider min={2000} max={7000} defaultValue={0} step={100} value={this.state.colorTemperatureInKelvin} disabled={!this.state.powerState}
                            onChange={this.handlePreColorTemperatureChange} 
                            onAfterChange={this.handleColorTemperatureChange} 
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 10 } : { backgroundColor: 'silver', height: 10 }}
                            handleStyle={this.state.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: 0, height: 10}
                            }
                            railStyle={{ height: 10 }}
                        />
                    </ListItem>
                    <ListItem>
                    <Paper elevation={0}>
                    <Chip 
                        key = 'warm'
                        label= "warm" 
                        className={  (this.state.colorTemperatureInKelvin==2200) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(2200)}
                    />
                    <Chip 
                        key = 'soft'
                        label= "soft" 
                        className={ (this.state.colorTemperatureInKelvin==2700) ? classes.hotchip : classes.chip}
                        onClick={ () => this.handleColorTemperatureChange(2700)}
                    />
                    <Chip 
                        key = 'white'
                        label= "white" 
                        className={  (this.state.colorTemperatureInKelvin==4000) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(4000)}
                    />
                    <Chip 
                        key = 'day'
                        label= "day" 
                        className={  (this.state.colorTemperatureInKelvin==5500) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(5500)}
                    />
                    <Chip 
                        key = 'cool'
                        label= "cool" 
                        className={  (this.state.colorTemperatureInKelvin==7000) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(7000)}
                    />
                    </Paper>
                    </ListItem>
                </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
                

            
        );
    }
}

TunableLight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TunableLight);

