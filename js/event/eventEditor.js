import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withData } from '../dataContext';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import TuneIcon from '@material-ui/icons/Tune';

import DeviceActionSelect from "../deviceActionSelect"
import EventTrigger from "./eventTrigger"
import EventAction from "./eventAction"

const styles = theme => ({
        
    list: {
        minWidth: 320,
        padding: "0 16",
    },
    dialogContent: {
        padding: 0,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },
    chipPad: {
        margin: "0 4",
    }
});


class EventEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            builder: false,
            deviceSelect: false,
            controllers: [],
            scheduleAction: false,
            ready: false,
            enabled: true,
            eventAction: {},
        };
    }
    
    getActionValue = (controller, command) => {

        var payload=this.props.controllers[controller][command]
        for (var prop in payload) {
            if (payload[prop]=='value') {
                return prop
            }
        } 
        return ''
    }  
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        this.setState({ deviceSelect:false, eventAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}})
    }

    render() {

        
        const { classes, name, event} = this.props;
        const { deviceSelect } = this.state;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                { this.state.deviceSelect ?
                    <DeviceActionSelect select={this.handleActionSelect} />
                :
                    <List className={classes.list}>
                        <ListItemText primary={name} />
                    </List>
                }
                { event.triggers.map((trigger,index) =>
                    <EventTrigger moveUp={this.moveConditionUp} moveDown={this.moveConditionDown} save={this.saveTrigger} edit={this.state.editingActions} delete={this.deleteTrigger} trigger={trigger} index={index} name={this.props.deviceByEndpointId(trigger.endpointId).friendlyName} key={ this.props.name+index } />
                )}
                <EventAction moveUp={this.moveActionUp} moveDown={this.moveActionDown} save={this.saveAction} edit={this.state.editingActions} action={event.action} delete={this.deleteAction} actionValue={this.getActionValue(event.action.controller, event.action.command)} index={0} device={ this.props.deviceByEndpointId(event.action.endpointId) } name={this.props.deviceByEndpointId(event.action.endpointId).friendlyName} key={ this.props.name+'act' } />
                <Divider />

                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    { deviceSelect ?
                        <Button onClick={() => this.setState({deviceSelect: false})}  color="primary">CANCEL</Button>
                    :
                        <Button onClick={(e) => this.props.close()} color="primary">CANCEL</Button>
                    }
                </DialogActions>
            </React.Fragment>
        )
    }

}

EventEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(EventEditor));
