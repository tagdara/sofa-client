import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@material-ui/core/Icon';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Avatar from '@material-ui/core/Avatar';
import LightDialog from './lightDialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        padding: "8 24 8 24",
        flexWrap: 'wrap',
        alignItems: "center",
    },
    content: {
        display: 'flex',
        margin: 8,
        boxSizing: "border-box",
        padding: "8 24 8 24",
        flexWrap: 'wrap',
        alignItems: "center",
        flexGrow: 1,
        minWidth: "320px",
    },

    xcard: {
        display: 'flex',
        maxWidth: '480px',
        margin: 1,
        boxSizing: "border-box",
        justifyContent: "space-between",
        padding: "8 16 8 24",
        alignItems: "center",
    },        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    stackedLightControl: {
        minHeight: 84,
        paddingLeft: 16,
        paddingRight: 0,
        flex:1,
		paddingTop: 0,
		paddingBottom: 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
    },
    buttonsAndSlider: {
        paddingTop: 0,
        paddingRight: 24,
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

    litAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    }

});

class Light extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            powerState: "OFF",
            brightness: "no",
        };
        this.handleClose = this.handleClose.bind(this);

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('powerState')) {
            changes.powerState=data.powerState
        }
        if (data.hasOwnProperty('brightness')) {
            changes.brightness=data.brightness
        }

        return changes
    }



    handlePowerChange = event => {
        if (event.target.checked) {
            this.setState({ powerState: 'ON', target: this.props.name});
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
        } else {
            this.setState({ powerState: 'OFF', target: this.props.name});
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.device.name});
    }; 

    handleBrightnessChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/BrightnessController/brightness", "command":"SetBrightness", "value":event}
        this.props.sendMessage(JSON.stringify(ops));
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
            <Paper elevation={0} className={classes.content}>
                    <Avatar className={this.state.powerState=="ON" ? classes.litAvatar: classes.avatar} onClick={ () => this.handleClickOpen()}>
                        <LightbulbOutlineIcon />
                    </Avatar>
                    <List className={classes.stackedLightControl}>
                        <ListItem className={classes.nameAndSwitch}>
                            <ListItemText className={classes.deviceName} primary={this.props.name}/>
                            <ListItemSecondaryAction>
                                <Switch color="primary" checked={this.state.powerState=='ON'} onChange={this.handlePowerChange} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        {this.state.brightness=="no" ?
                        null :
                        <ListItem className={classes.buttonsAndSlider}>
                            <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.state.powerState=='ON'}
                                onChange={this.handlePreBrightnessChange} 
                                onAfterChange={this.handleBrightnessChange} 
                                trackStyle={ this.state.powerState=='ON' ? { backgroundColor: 'orangeRed', opacity: .5, height: 10 } : { backgroundColor: 'silver', height: 10 }}
                                handleStyle={this.state.powerState=='ON' ? 
                                    { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16} :
                                    { borderColor: 'silver', backgroundColor: 'silver', marginTop: 0, height: 10, width: 10}
                                }
                                railStyle={{ height: 10 }}
                            /> 
                        </ListItem>
                        }
                    </List>
                <LightDialog open={this.state.open} name={ this.props.name } handleClose={this.handleClose} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
            </Paper>
        );
    }
}

Light.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Light);

