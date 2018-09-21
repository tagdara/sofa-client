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
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
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
                <Paper className={classes.sliderPaper} elevation={0}>
                    <Avatar className={this.state.powerState=="ON" ? classes.litAvatar: classes.avatar} onClick={ () => this.handleClickOpen()}>
                        <LightbulbOutlineIcon />
                    </Avatar>
                    <div className={classes.stack}>
                        <Typography variant="subheading">{this.props.name}</Typography>
                        {this.state.brightness=="no" ?
                        null :
                        <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.brightness}
                            onChange={this.handlePreBrightnessChange} 
                            onAfterChange={this.handleBrightnessChange} 
                            trackStyle={ this.state.powerState=='ON' ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            handleStyle={this.state.powerState=='ON' ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                            }
                            railStyle={{ height: 3 }}
                            className={classes.stackSlider}
                            disabled={ !this.state.powerState=='ON' }
                        />
                        }
                    </div>
                    <Switch color="primary" checked={this.state.powerState=='ON'} onChange={this.handlePowerChange} />
                    <LightDialog open={this.state.open} name={ this.props.name } handleClose={this.handleClose} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                </Paper>

        );
    }
}

Light.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Light);

