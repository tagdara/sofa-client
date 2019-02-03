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

class LightDialogOnLevel extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            onLevel: "no",
        };
    } 
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps
        var changes={}
        
        if (data.hasOwnProperty('onLevel')) {
            changes.onLevel=data.onLevel
        }

        return changes
    } 
    
    handlePreOnLevelChange = (value) => {
        this.setState({ onLevel: value });
    }; 

    handleOnLevelChange = event => {
        console.log('Levelchange', this.state.onLevel)
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "SwitchController", "SetOnLevel", { "onLevel" : event } )
    }; 

    render() {

        const { classes } = this.props;

        return (
                <ListItem>
                    <SofaSlider
                        name="On Level" value={this.state.onLevel} unit="%"
                        min={0} max={100} step={10}
                        preChange={this.handlePreOnLevelChange}
                        change={this.handleOnLevelChange}
                        disabled={!this.props.powerState}
                    />
                </ListItem>
        );
    }
}

LightDialogOnLevel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogOnLevel);

