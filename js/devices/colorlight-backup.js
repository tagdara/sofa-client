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
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


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
    briSlider: {
        flex:1, 
        height: 48,
        paddingRight: 16,
        paddingLeft: 8,
    },
    briLabel: {
        marginBottom: 12,
    },
    halfSlider: {
        width: '40%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },
    chip: {
        margin: theme.spacing.unit,
    },    
});

class ColorLight extends React.Component {
    
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
        return ColorLight.parseState(nextProps.wsUpdate, prevState.endpointId)
    
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
    
    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/devices/'+this.props.friendlyName+'?stateReport')
 		    .then(result=>result.json())
 		    .then(data=>this.setState(ColorLight.parseState(data,'')))
    }
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.friendlyName+"/PowerController/powerState", "value":event.target.checked}
        this.props.sender(JSON.stringify(ops));
    }; 

    handleBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.friendlyName+"/BrightnessController/brightness", "value":event}
        this.props.sender(JSON.stringify(ops));
    }; 

    handleColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.friendlyName+"/ColorTemperatureController/colorTemperatureInKelvin", "value":event}
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
            <ListItem className={classes.expansionList}>
                <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                <div className={classes.briSlider}>
                    <Typography className={classes.briLabel}>
                        {this.props.friendlyName} 
                    </Typography>
                    <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.state.powerState}
                            onChange={this.handleBrightnessChange} 
                            trackStyle={{ backgroundColor: 'orangeRed', height: 3 }}
                            handleStyle={{
                                borderColor: 'orangeRed',
                                backgroundColor: 'orangeRed',
                            }}
                    />
                </div>
                <IconButton color="secondary" onClick={ () => this.handleClickOpen()}>
                    <Icon>tune</Icon>
                </IconButton>

            <Dialog open={this.state.open}>
                <List className={classes.root}>
                    <ListItem>
                        <FormControlLabel label={this.props.friendlyName} control={
                            <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                            }
                        />             
                    </ListItem>
                    <ListItem>
                    <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.state.powerState}
                        onChange={this.handleBrightnessChange} 
                        trackStyle={{ backgroundColor: 'orangeRed', height: 3 }}
                        handleStyle={{
                            borderColor: 'orangeRed',
                            backgroundColor: 'orangeRed',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <Paper elevation={0}>
                    <Chip 
                        key = 'cool'
                        label= "cool" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(7000)}
                    />
                    <Chip 
                        key = 'daylight'
                        label= "daylight" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(5500)}
                    />
                    <Chip 
                        key = 'white'
                        label= "white" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(4000)}
                    />
                    <Chip 
                        key = 'soft'
                        label= "sofa" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(2700)}
                    />
                    <Chip 
                        key = 'warm'
                        label= "warm" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(2200)}
                    />
                    </Paper>
                    </ListItem>
                    <ListItem>
                    <Button color="inherit" onClick={this.handleClose}>
                        OK
                    </Button>
                    </ListItem> 
                </List>
            </Dialog>
            </ListItem>
                

            
        );
    }
}

ColorLight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColorLight);

