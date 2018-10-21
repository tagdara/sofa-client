import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


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

class LightDialogBrightness extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: "no",
        };
    } 
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps
        var changes={}
        
        if (data.hasOwnProperty('brightness')) {
            changes.brightness=data.brightness
        }

        return changes
    } 
    
    handlePreBrightnessChange = event => {
        this.setState({ brightness: event, target:this.props.name});
    }; 

    handleBrightnessChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "BrightnessController", "SetBrightness", event)
    }; 

    render() {

        const { classes } = this.props;

        return (
                <List>
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="Brightness" />
                    </ListItem>
                    <ListItem>
                        <Slider min={0} max={100} defaultValue={0} step={10} value={this.state.brightness} disabled={!this.props.powerState}
                            onChange={this.handlePreBrightnessChange} 
                            onAfterChange={this.handleBrightnessChange} 
                            trackStyle={ this.props.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 3 } : { backgroundColor: 'silver', height: 3 }}
                            handleStyle={this.props.powerState ? 
                                { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} :
                                { borderColor: 'silver', backgroundColor: 'silver', marginTop: -5, height: 12, width: 12}
                            }
                            railStyle={{ height: 3 }}
                        />
                    </ListItem>
                </List>
        );
    }
}

LightDialogBrightness.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogBrightness);

