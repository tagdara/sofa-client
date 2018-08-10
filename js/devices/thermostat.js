import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DataUsageIcon from '@material-ui/icons/DataUsage';

const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    expansionList: {
        paddingLeft: 8,
        paddingRight: 10,
    },
    thermostatName: {
        flex:1,
    },
});

class Thermostat extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            temperature: 90,
            target: null,
            open: false,
            endpointId: '',
            lastmessage: '',
        };
    }

 
    static getDerivedStateFromProps(nextProps, prevState) {
        return Thermostat.parseState(nextProps.wsUpdate, prevState.endpointId)
    
    }

    static parseState(data, endpointId) {
        
        var changes={}
        
        if (data.hasOwnProperty('event')) {
            if (endpointId=='') {
                changes.endpointId=data.event.endpoint.endpointId
            }
            if ((endpointId==data.event.endpoint.endpointId) || changes.hasOwnProperty('endpointId')) {

                if (data.hasOwnProperty('context')){
                    for (var i = 0; i < data.context.properties.length; i++) {
                        if (data.context.properties[i].name=='temperature') {
                            //this.setState({brightness: data.context.properties[i].value})
                            changes.temperature=data.context.properties[i].value;
                        }   
                    }
                }
            }
        }
        return changes;
    }
    
    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/devices/'+this.props.friendlyName+'?stateReport')
 		    .then(result=>result.json())
 		    .then(data=>this.setState(Thermostat.parseState(data,'')))
    }
 
    render() {

        const { classes } = this.props;

        return (
            <ListItem>
                <ListItemIcon className={classes.expansionList}>
                    <DataUsageIcon />
                </ListItemIcon>
                <Typography className={classes.thermostatName}>{this.props.friendlyName}</Typography>
                <Typography variant="subheading">{this.state.temperature}&deg;</Typography>
           </ListItem>
            
        );
    }
}

Thermostat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Thermostat);

