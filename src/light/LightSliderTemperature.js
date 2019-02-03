import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import SofaSlider from '../SofaSlider';
import Chip from '@material-ui/core/Chip';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const styles = theme => ({
        
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
    listItemLabel: {
        paddingBottom: 0,
    },
    chipLine: {
        paddingTop:0,
        paddingLeft:8,
        paddingRight:8,
    },
    indent: {
        paddingLeft: 40,
    }
});

class LightSliderTemperature extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            colorTemperatureInKelvin: 4000,
        };
    } 

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.colorTemperatureInKelvin !== prevState.colorTemperatureInKelvin) {
            changes['colorTemperatureInKelvin']=nextProps.colorTemperatureInKelvin
        }  
        return changes
    }    
    
    handlePreColorTemperatureChange = value => {
        this.setState({ colorTemperatureInKelvin: value });
    }; 

    handleColorTemperatureChange = value => {
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorTemperatureController", "SetColorTemperature", { "colorTemperatureInKelvin": value} )
    }; 
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem>
                <ListItemIcon className={classes.indent}><AcUnitIcon /></ListItemIcon>
                <SofaSlider
                    name="Temperature" smallText={true} unit={"°"}
                    value={this.state.colorTemperatureInKelvin}
                    min={2000} max={7000} step={100}
                    preChange={this.handlePreColorTemperatureChange}
                    change={this.handleColorTemperatureChange}
                    disabled={!this.props.powerState}
                />
            </ListItem>
        );
    }
}

export default withStyles(styles)(LightSliderTemperature);

