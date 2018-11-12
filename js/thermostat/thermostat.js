import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
        
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    cool: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#00796B"
    },
    mid: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#558B2F"
    },
    hot: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#E65100"
    }
});

class Thermostat extends React.Component {
    
    tempColor = (temp) => {
        if (temp>=74) { return this.props.classes.hot }
        if (temp<70) { return this.props.classes.cool }
        return this.props.classes.mid;
    }
    

    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={this.tempColor(this.props.deviceProperties.temperature)}>{this.props.deviceProperties.temperature}</Avatar>
                { this.props.deviceProperties.hasOwnProperty('targetSetPoint') ?
                    <ListItemText primary={this.props.name} secondary={this.props.deviceProperties.thermostatMode=='OFF' ? 'Off' : 'Heat set to '+this.props.deviceProperties.targetSetPoint}/>
                    :
                    <ListItemText primary={this.props.name} />
                }
           </ListItem>
            
        );
    }
}

Thermostat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thermostat);

