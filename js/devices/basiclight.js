import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import DialogActions from '@material-ui/core/DialogActions';import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { HuePicker } from 'react-color';

const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },

    stackedLightControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
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

});

class BasicLight extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: false,
            target: null,
            open: false,
            endpointId: '',
            lastmessage: '',
        };
    }

 
    static getDerivedStateFromProps(nextProps, prevState) {
        return BasicLight.parseState(nextProps.deviceState, prevState.endpointId)
    
    }

    static parseState(data, endpointId) {
        
        
        var changes={}
        if (data===undefined) {
            return changes
        }
        
        if (data.hasOwnProperty('event')) {
            
            if (endpointId=='') {
                changes.endpointId=data.event.endpoint.endpointId
            }
            
            if ((endpointId==data.event.endpoint.endpointId) || changes.hasOwnProperty('endpointId')) {

                if (data.hasOwnProperty('context')){
                    for (var i = 0; i < data.context.properties.length; i++) {
                        if (data.context.properties[i].name=='powerState') {
                            changes.powerState= data.context.properties[i].value=='ON';
                        } 
                    }
                } 
                // might be both. We probably don't need to apply the ones from context in a change 
                // but might as well keep it all in sync.
                if (data.hasOwnProperty('payload')){
                    if (data.payload.hasOwnProperty('change')){
                        for (var i = 0; i < data.payload.change.properties.length; i++) {
                            if (data.payload.change.properties[i].name=='powerState') {
                                changes.powerState=data.payload.change.properties[i].value=='ON';
                            } 
                        }
                    }
                }


            }
        }
        return changes;
    }
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "value":event.target.checked}
        this.props.sender(JSON.stringify(ops));
    }; 

 
    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.paperLight}>
            <Avatar className={classes.avatar}>
                <LightbulbOutlineIcon />
            </Avatar>
                <List className={classes.stackedLightControl}>
                    <ListItem className={classes.nameAndSwitch}>
                        <ListItemText className={classes.deviceName} primary={this.props.device.friendlyName}/>
                        <ListItemSecondaryAction>
                            <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
                

            
        );
    }
}

BasicLight.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicLight);

