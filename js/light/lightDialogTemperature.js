import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SofaSlider from '../sofaSlider';
import Chip from '@material-ui/core/Chip';

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
                <>
                    <ListItem>
                        <SofaSlider
                            name="White Color Temperature" unit={"°"}
                            value={this.state.colorTemperatureInKelvin}
                            min={2000} max={7000} step={100}
                            preChange={this.handlePreColorTemperatureChange}
                            change={this.handleColorTemperatureChange}
                            disabled={!this.props.powerState}
                        />
                    </ListItem>
                    <ListItem>
                        <Chip key = 'warm' label= "warm" 
                            className={  (this.props.colorTemperatureInKelvin==2200) ? classes.hotchip : classes.chip }
                            onClick={ () => this.handleColorTemperatureChange(2200)}
                        />
                        <Chip key = 'soft' label= "soft" 
                            className={ (this.props.colorTemperatureInKelvin==2700) ? classes.hotchip : classes.chip}
                            onClick={ () => this.handleColorTemperatureChange(2700)}
                        />
                        <Chip key = 'white' label= "white" 
                            className={  (this.props.colorTemperatureInKelvin==4000) ? classes.hotchip : classes.chip }
                            onClick={ () => this.handleColorTemperatureChange(4000)}
                        />
                        <Chip key = 'day' label= "day" 
                            className={  (this.props.colorTemperatureInKelvin==5500) ? classes.hotchip : classes.chip }
                            onClick={ () => this.handleColorTemperatureChange(5500)}
                        />
                        <Chip key = 'cool' label= "cool" 
                            className={  (this.props.colorTemperatureInKelvin==7000) ? classes.hotchip : classes.chip }
                            onClick={ () => this.handleColorTemperatureChange(7000)}
                        />
                    </ListItem>
                </>
        );
    }
}

LightDialogTemperature.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogTemperature);

