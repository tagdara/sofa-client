import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
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

class LightDialogTemperature extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            colorTemperatureInKelvin: 4000,
        };
    } 
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps
        var changes={}
        
        if (data.hasOwnProperty('colorTemperatureInKelvin')) {
            changes.colorTemperatureInKelvin=data.colorTemperatureInKelvin
        }

        return changes
    } 
    
    handlePreColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event });
    }; 

    handleColorTemperatureChange = event => {
        this.setState({ colorTemperatureInKelvin: event });
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorTemperatureController", "SetColorTemperature", event)
    }; 
    
    render() {

        const { classes } = this.props;

        return (

                <List>
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="White Color Temperature" />
                    </ListItem>
                    <ListItem>
                        <Slider min={2000} max={7000} defaultValue={0} step={100} value={this.state.colorTemperatureInKelvin} disabled={!this.props.powerState}
                            onChange={this.handlePreColorTemperatureChange} 
                            onAfterChange={this.handleColorTemperatureChange} 
                            trackStyle={ this.props.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            handleStyle={this.props.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                            }
                            railStyle={{ height: 3 }}
                        />
                    </ListItem>
                    <ListItem>
                    <Paper elevation={0}>
                    <Chip 
                        key = 'warm'
                        label= "warm" 
                        className={  (this.props.colorTemperatureInKelvin==2200) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(2200)}
                    />
                    <Chip 
                        key = 'soft'
                        label= "soft" 
                        className={ (this.props.colorTemperatureInKelvin==2700) ? classes.hotchip : classes.chip}
                        onClick={ () => this.handleColorTemperatureChange(2700)}
                    />
                    <Chip 
                        key = 'white'
                        label= "white" 
                        className={  (this.props.colorTemperatureInKelvin==4000) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(4000)}
                    />
                    <Chip 
                        key = 'day'
                        label= "day" 
                        className={  (this.props.colorTemperatureInKelvin==5500) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(5500)}
                    />
                    <Chip 
                        key = 'cool'
                        label= "cool" 
                        className={  (this.props.colorTemperatureInKelvin==7000) ? classes.hotchip : classes.chip }
                        onClick={ () => this.handleColorTemperatureChange(7000)}
                    />
                    </Paper>
                    </ListItem>
                </List>
        );
    }
}

LightDialogTemperature.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogTemperature);

