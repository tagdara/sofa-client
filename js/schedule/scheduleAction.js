import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import TuneIcon from '@material-ui/icons/Tune';

import ScheduleInterval from './scheduleInterval'
import ScheduleStart from './scheduleStart'
import ScheduleTime from './scheduleTime'
import ScheduleDays from './scheduleDays'
import ScheduleDaysInterval from './scheduleDaysInterval'

import ScheduleName from './scheduleName'
import ScheduleChoice from './scheduleChoice'


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


class ScheduleEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scheduleName: "",
            scheduleType: "",
            
            scheduleStart: "",
            scheduleInterval: 1,
            scheduleIntervalUnit: 'hours',
            scheduleDaysType: "",
            
            actionValue: "",
            
            scheduleTime: "09:00:00",
            scheduleDays: [],
            schedule: {},

            daysType:"",
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
            intervalUnits: ['days','hours','minutes'],
            builder: false,
            deviceSelect: false,
            controllers: [],
            scheduleAction: false,
            ready: false,
            enabled: true,
            actionValueName: "",
        };
    }

    getActionValue = (controller, command) => {

        if (this.state.controllers.hasOwnProperty(controller)) {
            var payload=this.state.controllers[controller][command]
            for (var prop in payload) {
                if (payload[prop]=='value') {
                    return prop
                }
            } 
        }
        return ''
    }  
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        this.setState({ deviceSelect:false, scheduleAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}}, 
            () => this.readyToSave()
        )
        
        this.setState({ deviceSelect:false}, 
            () => this.readyToSave()
        )
    }

    componentDidMount() {
        
  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));
    }

    render() {

        
        const { classes, action } = this.props;
        
        return (
            <ListItem className={classes.listItem} >
                <Avatar className={action ? classes.activeIcon : classes.passiveIcon }><TuneIcon /></Avatar>
                { action ?
                    <React.Fragment>
                        <ListItemText onClick={() => this.props.deviceSelect() } primary={action.deviceName} secondary={action.controller.replace('Controller','')+" / "+action.command} />
                        { this.getActionValue(action.controller, action.command) ?
                            <TextField
                                className={classes.areaInput}
                                id={'action'}
                                label={this.getActionValue(action.controller, action.command)}
                                margin="normal"
                                value={action.value}
                                onChange={ (e) => this.props.edit( e.target.value) } />
                        : null }
                        </React.Fragment>
                :
                    <ListItemText onClick={() => this.props.deviceSelect() } primary={"Action"} secondary={"Click Here to Select Scheduled Action"} />
                }
            </ListItem>
        )
    }

}

ScheduleEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleEditor);
