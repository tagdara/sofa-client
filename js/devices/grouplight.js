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
import DialogActions from '@material-ui/core/DialogActions';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import { HuePicker } from 'react-color';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import PlaceIcon from '@material-ui/icons/Place';
import deepOrange from '@material-ui/core/colors/deepOrange';

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
        color: '#fff',
        backgroundColor: deepOrange[500],
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

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        changes.brightness=nextProps.avgState('brightness')
        return changes
    }

    static parseState(data) {
        
        
        var changes={}
        if (data===undefined) {
            return changes
        }
        
        var brightnessCount=0;
        var totalbrightness=0;
        var temperatureCount=0;
        var totaltemperature=0;


        changes.areaState=data;
        changes.powerState=false;
        
        for (var dev in data) {
            if (data[dev].hasOwnProperty('context')) {
                for (var i = 0; i < data[dev].context.properties.length; i++) {
                    if (data[dev].context.properties[i].name=='powerState') {
                        if (data[dev].context.properties[i].value=='ON') {
                            changes.powerState=true;
                        }
                    } else if (data[dev].context.properties[i].name=='brightness') {
                        brightnessCount=brightnessCount+1;
                        totalbrightness=totalbrightness+data[dev].context.properties[i].value;
                        changes.brightness=totalbrightness/brightnessCount;
                    } else if (data[dev].context.properties[i].name=='colorTemperatureInKelvin') {
                        temperatureCount=temperatureCount+1;
                        totaltemperature=totaltemperature+data[dev].context.properties[i].value;
                        changes.colorTemperatureInKelvin=totaltemperature/temperatureCount;
                    }
                }
            }
        } 
        return changes;
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

    
    handlePowerChange = event => {
        
        this.setState({ powerState: event.target.checked });
        for (var i = 0; i < this.props.devices.length; i++) {
            if (event.target.checked) {
                var ops={"op":"set", "path":"discovery/"+this.props.devices[i].friendlyName+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
            } else {
                var ops={"op":"set", "path":"discovery/"+this.props.devices[i].friendlyName+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
            }
            this.props.sendMessage(JSON.stringify(ops));
        }

    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.friendlyName});
    }; 


    handleBrightnessChange = event => {
        //for (var i = 0; i < this.state.controllermap['BrightnessController'].length; i++) {
        
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.deviceProperties[this.props.devices[i].friendlyName].hasOwnProperty('brightness')) {
                var ops={"op":"set", "path":"discovery/"+this.props.devices[i].friendlyName+"/BrightnessController/brightness", "command":"SetBrightness", "value":event}
                this.props.sendMessage(JSON.stringify(ops));
            }
        }
    }; 

    handlePreColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event, target:this.props.friendlyName});
    }; 

    handleColorTemperatureChange = event => {

        for (var i = 0; i < this.state.controllermap['ColorTemperatureController'].length; i++) {
            var ops={"op":"set", "path":"discovery/"+this.state.controllermap['ColorTemperatureController'][i]+"/ColorTemperatureController/colorTemperatureInKelvin", "command":"SetColorTemperature", "value":event}
            this.props.sendMessage(JSON.stringify(ops));
        }
    }; 


    sb2sl(color) {

        var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
        var SL = {h:color.hue, s:0, l:0};
        SL.l = (2 - SB.saturation) * SB.brightness / 2;
        SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
        return SL
    }
        
    sl2sb(color) {
        var SL = {h:color.h, s:color.s, l:color.l};
        var SB = {hue:color.h, saturation:0, brightness:0};
        var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
        SB.brightness = SL.l+t;
        SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
        return SB
    }
    
    handleColorSliderChange = color => {
        var hsb=this.sl2sb(color.hsl)
        this.setState({ color: hsb, target:this.props.friendlyName});
        for (var i = 0; i < this.state.controllermap['ColorController'].length; i++) {
            var ops={"op":"set", "path":"discovery/"+this.state.controllermap['ColorController'][i]+"/ColorController/color", "command":"SetColor","value":hsb}
            this.props.sendMessage(JSON.stringify(ops));
        }

    }

    handleColorChange = hsb => {
        this.setState({ color: hsb, target:this.props.friendlyName});
        for (var i = 0; i < this.state.controllermap['ColorController'].length; i++) {
            var ops={"op":"set", "path":"discovery/"+this.state.controllermap['ColorController'][i]+"/ColorController/color", "command":"SetColor", "value":hsb}
            this.props.sendMessage(JSON.stringify(ops));
        }
    }

 
    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handleClose = () => {
        this.setState({ open: false });
    };    
    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.sliderPaper} elevation={0}>
                <Avatar className={ this.props.avgState('on') ? classes.litAvatar: classes.avatar} onClick={ () => this.handleClickOpen()}>
                    <PlaceIcon />
                </Avatar>
                <div className={classes.stack}>
                    <Typography variant="subheading" gutterBottom>{this.props.name+' Lights'}</Typography>
                    {this.state.brightness=="no" ?
                    null :
                    <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.brightness}
                        onChange={this.handlePreBrightnessChange} 
                        onAfterChange={this.handleBrightnessChange} 
                        trackStyle={ this.props.avgState('on')  ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                        handleStyle={ this.props.avgState('on')  ? 
                            { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                            { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                        }
                        railStyle={{ height: 3 }}
                        className={classes.stackSlider}
                        disabled={ !this.props.avgState('on') }
                    />
                    }
                </div>
                <Switch color="primary" checked={ this.props.avgState('on') } onChange={this.handlePowerChange} />
            <Dialog open={this.state.open} onClose={this.handleClose} >
                <DialogTitle >{this.props.name}</DialogTitle>
                <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Power" onClick={ () => this.handleClickOpen()}/>
                        <ListItemSecondaryAction>
                            <Switch color="primary" checked={ this.props.avgState('on') } onChange={this.handlePowerChange} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="Brightness" />
                    </ListItem>
                    <ListItem>
                        <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness}
                            onChange={this.handlePreBrightnessChange} 
                            onAfterChange={this.handleBrightnessChange} 
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            handleStyle={this.state.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                            }
                            railStyle={{ height: 3 }}
                            disabled={ !this.props.avgState('on') }
                        />
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="White Color Temperature" />
                    </ListItem>
                    <ListItem>
                        <Slider min={2000} max={7000} defaultValue={0} step={100} value={this.state.colorTemperatureInKelvin}
                            onChange={this.handlePreColorTemperatureChange} 
                            onAfterChange={this.handleColorTemperatureChange} 
                            trackStyle={ this.state.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            handleStyle={this.state.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                            }
                            railStyle={{ height: 3 }}
                            disabled={ !this.props.avgState('on') }
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
                    <Divider />
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="Color" />
                    </ListItem>
                    <ListItem>
                        <HuePicker
                            color={ this.sb2sl(this.state.color) }
                            onChangeComplete={ this.handleColorSliderChange }
                        />
                    </ListItem>
                    <ListItem className={classes.chipLine}>
                    <Paper elevation={0}>
                    <Chip 
                        key = 'reveal'
                        label= "reveal" 
                        className={ classes.chip }
                        onClick={ () => this.handleColorChange({hue: 43.5, saturation:0.27, brightness: 1}) }
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

GroupLight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupLight);

