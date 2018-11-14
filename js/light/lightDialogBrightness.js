import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import SofaSlider from '../sofaSlider';

const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
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
    
    handlePreBrightnessChange = (event, value) => {
        this.setState({ brightness: event, target:this.props.name});
    }; 

    handleBrightnessChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "BrightnessController", "SetBrightness", this.state.brightness)
    }; 

    render() {

        const { classes } = this.props;

        return (
                <ListItem>
                    <SofaSlider
                        name="Brightness" value={this.state.brightness} unit="%"
                        min={0} max={100} step={10}
                        preChange={this.handlePreBrightnessChange}
                        change={this.handleBrightnessChange}
                        disabled={!this.props.powerState}
                    />
                </ListItem>
        );
    }
}

LightDialogBrightness.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogBrightness);

