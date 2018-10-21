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

import DeviceActionSelect from "../deviceActionSelect"
import ScheduleInterval from './scheduleInterval'
import ScheduleStart from './scheduleStart'
import ScheduleTime from './scheduleTime'
import ScheduleDays from './scheduleDays'


const styles = theme => ({
        
    list: {
        minWidth: 320,
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
        backgroundColor: "#6666FF",
    },
    chipPad: {
        margin: "0 4",
    }
});


class ScheduleEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scheduleName: '',
            scheduleType: "",
            scheduleStart: "",
            scheduleInterval: 1,
            scheduleIntervalUnit: 'hours',
            
            scheduleTime: "08:00:00",
            scheduleDays: [],
            schedule: {},
            typeSelect: "",
            daysType:"",
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
            intervalUnits: ['days','hours','minutes'],
            builder: false,
            deviceSelect: false,
            controllers: [],
            scheduleAction: false,
        };
    }
    
    saveSchedule = () => {
        scheduledata={};
        
        //type should be 'time' or 'interval'
        scheduledata['type']=this.state.scheduleType;
        scheduledata['name']=this.state.scheduleName;
        scheduledata['start']=this.state.scheduleStart;
        // action is a single action taken from DAS
        scheduledata['action']=this.state.scheduleAction;
        if (this.state.scheduleType=='time') {
            scheduledata['data']
        }
        console.log(scheduledata);
    }
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        console.log(deviceName, endpointId, controller, cmd)
        this.setState({ scheduleAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}})
        this.setState({ deviceSelect:false})
    }

    editScheduleName = (scheduleName) => {
        this.setState({scheduleName: scheduleName})
    }
    
    editScheduleStart = (scheduleStart) => {
        this.setState({scheduleStart: scheduleStart})
    }

    editScheduleInterval = (scheduleInterval) => {
        this.setState({scheduleInterval: scheduleInterval})
    }

    editScheduleIntervalUnit = (scheduleIntervalUnit) => {
        this.setState({scheduleIntervalUnit: scheduleIntervalUnit})
    }
    
    editScheduleTime = (scheduleTime) => {
        console.log('time',scheduleTime)
        this.setState({scheduleTime: scheduleTime})
    }
    
    editScheduleDays = (day) => {
        var sdays=this.state.scheduleDays
        if (sdays.includes(day)) {
            var sdays=this.state.scheduleDays
            sdays.splice(sdays.indexOf(day),1)
        } else {
            sdays.push(day)
        }
        this.setState({scheduleDays: sdays})
    }

    
    testClear = () => {
        this.setState({typeSelect: '', daysType:'', deviceSelect: false})
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                { this.state.deviceSelect ?
                    <DeviceActionSelect select={this.handleActionSelect} devices={this.props.devices} controllers={this.props.controllers} />
                :
                    <List>
                        <form className={classes.container} noValidate autoComplete="off">
                        <ListItem className={classes.listItem}>
                            <Avatar><EditIcon /></Avatar>
                            <ListItemText>
                                <TextField
                                    className={classes.nameInput}
                                    id="required"
                                    label="New schedule name"
                                    margin="none"
                                    value={this.state.scheduleName}
                                onChange={(e) => this.editScheduleName(e)}
                                />
                            </ListItemText>
                        </ListItem>
                        </form>
                        <Divider />
                        { !this.state.typeSelect ?
                        <ListItem className={classes.listItem} onClick={() => this.setState({typeSelect:'specificTime'})}>
                            <Avatar className={this.state.typeSelect=="specificTime" ? classes.activeIcon : classes.passiveIcon }><ScheduleIcon /></Avatar>
                            <ListItemText primary="At a specific time" secondary="At a specific time on certain days" />
                        </ListItem>
                        : null }
                        { this.state.typeSelect=="specificTime" ?
                            <ScheduleTime editTime={this.editScheduleTime} time={this.state.scheduleTime} />
                        : null }
                        { this.state.typeSelect=="specificTime" ?
                            <React.Fragment>
                            { this.state.daysType=="interval" || !this.state.daysType ?
                            <ListItem className={classes.listItem} onClick={() => this.setState({daysType:'interval'})}> 
                                <Avatar className={this.state.daysType=="interval" ? classes.activeIcon : classes.passiveIcon }><ScheduleIcon /></Avatar>
                                { this.state.daysType=="interval" ?
                                    <React.Fragment>
                                        <ListItemText primary="Every" />
                                        <TextField
                                            className={classes.areaInput}
                                            id={'spectime'}
                                            label={'Days'}
                                            margin={"normal"}
                                            value={'2'}
                                            onChange={(e) => this.editActionValue(index,e)}
                                        />
                                        <ListItemText primary="days" />
                                    </React.Fragment>
                                : 
                                <ListItemText primary="Every x days" />
                                }
                            </ListItem>
                            : null }
                            { !this.state.daysType ?
                                <ListItem className={classes.listItem} onClick={() => this.setState({daysType:'dow'})}>
                                    <Avatar className={this.state.daysType=="dow" ? classes.activeIcon : classes.passiveIcon }><ScheduleIcon /></Avatar>
                                    <ListItemText primary="Specific days of the week" />
                                </ListItem>
                            : null }
                            { this.state.daysType=="dow" ?
                                <ScheduleDays days={this.state.scheduleDays} editDays={this.editScheduleDays} start={this.state.scheduleDays} />
                            : null }
                            </React.Fragment>
                        : null }
                        { !this.state.typeSelect ?
                        <ListItem className={classes.listItem} onClick={() => this.setState({typeSelect:'interval'})}>
                            <Avatar className={this.state.typeSelect=="interval"  ? classes.activeIcon : classes.passiveIcon }><ScheduleIcon /></Avatar>
                            <ListItemText primary="On an interval" secondary="After a specified amount of time has elapsed" />
                        </ListItem>
                        : null }
                        { this.state.typeSelect=="interval" ?
                            <ScheduleInterval editUnit={this.editScheduleIntervalUnit} editInterval={this.editScheduleInterval} unit={this.state.scheduleIntervalUnit} interval={this.state.scheduleInterval} />
                        : null }
                        <Divider />
                        <ScheduleStart editStart={this.editScheduleStart} start={this.state.scheduleStart} />
                        <Divider />
                        <ListItem className={classes.listItem} onClick={() => this.setState({deviceSelect: true})}>
                            <Avatar className={this.state.schedAction ? classes.activeIcon : classes.passiveIcon }><ScheduleIcon /></Avatar>
                            { this.state.schedAction ?
                            <ListItemText primary={this.state.schedAction['deviceName']} secondary={this.state.schedAction['command']} />
                            :
                            <ListItemText primary={"Action"} secondary={"Click Here to Select Scheduled Action"} />
                            }
                        </ListItem>
                    </List>
                }
                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    { this.state.typeSelect ?
                    <Button onClick={(e) => this.testClear(e)} color="primary" autoFocus>CLEAR</Button>
                    : null }
                    <Button onClick={(e) => this.props.close()} color="primary">CANCEL</Button>
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </React.Fragment>
        )
    }

}

ScheduleEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleEditor);
