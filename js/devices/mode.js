import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TuneIcon from '@material-ui/icons/Tune';

const styles = theme => ({
        
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    cool: {
        backgroundColor: "#00796B"
    },
    mid: {
        backgroundColor: "#558B2F"
    },
    hot: {
        backgroundColor: "#E65100"
    }
});

class Mode extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: "OFF",
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('powerState')) {
            changes.powerState=data.powerState
        }
        
        return changes
    }
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked });
        console.log('power change on ', this.props.name, event.target.checked)
        if (event.target.checked) {
            this.setState({ powerState: 'ON' });
            this.props.sendAlexaCommand(this.props.name, 'logic:mode:'+this.props.name, 'PowerController', 'TurnOn')
        } else {
            this.setState({ powerState: 'OFF' });
            this.props.sendAlexaCommand(this.props.name, 'logic:mode:'+this.props.name, 'PowerController', 'TurnOff')
        }
    }; 
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={classes.hot}><TuneIcon /></Avatar>
                <ListItemText primary={this.props.name}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={this.state.powerState=='ON'} onChange={this.handlePowerChange} />
                </ListItemSecondaryAction>
           </ListItem>
            
        );
    }
}

Mode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mode);

