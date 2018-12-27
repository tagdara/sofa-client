import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridListTile from '@material-ui/core/GridListTile';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';

import LightDialog from './lightDialog';
import SofaSlider from "../sofaSlider"

const styles = theme => ({
 
    litAvatar: {
        color: theme.palette.primary.main,
    },
    iconSize: {
        height: 24,
        width: 24,
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
    xsliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 0 16 16",
        alignItems: "center",
        minWidth: 320,
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    },
    tile: {
        display: "flex",
        flexGrow: 1,
        height: 90,
        paddingRight: 8,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
    },
    nostack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
        marginRight: 8,
    },
    lightSwitch: {
        marginLeft: 8,
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
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "PowerController", "TurnOn")
        } else {
            this.setState({ powerState: 'OFF', target: this.props.name});
            this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "PowerController", "TurnOff")
        }
    }; 

    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.device.name});
    }; 

    handleBrightnessChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "BrightnessController", "SetBrightness", { "brightness" : event } )
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
                <GridListTile className={classes.tile} cols={1} rows={1}>
                    <Paper className={classes.sliderPaper} elevation={0} >
                    <ListItemIcon className={this.state.powerState=="ON" ? classes.litAvatar: classes.avatar} onClick={ () => this.handleClickOpen()}>
                        <LightbulbOutlineIcon className={classes.iconSize} />
                    </ListItemIcon>
                    {this.state.brightness=="no" ?
                        <Typography variant="subtitle1" className={classes.nostack} gutterBottom>{this.props.name}</Typography>
                        :
                        <SofaSlider value={this.state.brightness} preChange={this.handlePreBrightnessChange} change={this.handleBrightnessChange} 
                                    disabled={this.state.powerState=='OFF'} name={this.props.name} padLeft={false} minWidth={240} />
                    }
                    <Switch color="primary" className={classes.lightSwitch} checked={this.state.powerState=='ON'} onChange={this.handlePowerChange} />
                    <LightDialog sendAlexaCommand={this.props.sendAlexaCommand} open={this.state.open} name={ this.props.name } handleClose={this.handleClose} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                </Paper>
                </GridListTile>

        );
    }
}

Light.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Light);

