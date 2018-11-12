import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

import DeviceActionSelect from "../deviceActionSelect"
import ScheduleInterval from './scheduleInterval'
import ScheduleStart from './scheduleStart'
import ScheduleTime from './scheduleTime'
import ScheduleDays from './scheduleDays'
import ScheduleDaysInterval from './scheduleDaysInterval'
import ScheduleAction from './scheduleAction'
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
            controllers: {},
        };
    }
    
    selectDevice = () => {
        this.setState({deviceSelect: true})
    }
    
    editActionValue = (actionval) => {
        var cursa=this.state.scheduleAction
        cursa['value']=actionval
        this.setState({scheduleAction: cursa})
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
    }
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        this.setState({ deviceSelect:false, scheduleAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}}, 
            () => this.readyToSave()
        )
        
        this.setState({ deviceSelect:false}, 
            () => this.readyToSave()
        )
    }

    editScheduleDays = (day) => {
        var sdays=this.state.scheduleDays
        if (sdays.includes(day)) {
            var sdays=this.state.scheduleDays
            sdays.splice(sdays.indexOf(day),1)
        } else {
            sdays.push(day)
        }
        this.setState({scheduleDays: sdays}, 
            () => this.readyToSave()
        )
    }

    changeValue = (name, value) => {
        this.setState({ [name] : value}, 
            () => this.readyToSave()
        )
    }
    
    readyToSave = () => {
        var ready=false
        if (this.state.scheduleName && this.state.scheduleType && this.state.scheduleAction && this.state.scheduleStart) {
            if (this.state.scheduleType=='specificTime' && this.state.scheduleDaysType) {
                if (this.state.scheduleDaysType=='daysOfTheWeek' && this.state.scheduleDays && this.state.scheduleTime) {
                    ready=true
                } else if (this.state.scheduleDaysType=='interval' && parseInt(this.state.scheduleInterval)>0 && this.state.scheduleTime) {
                    ready=true
                }
            } else if (this.state.scheduleType=='interval' && parseInt(this.state.scheduleInterval)>0 && this.state.scheduleIntervalUnit) {
                ready=true
            }
        }
        console.log('ready?',ready,' - ', this.state.scheduleName, this.state.scheduleType, this.state.scheduleAction, this.state.scheduleStart, parseInt(this.state.scheduleInterval), this.state.scheduleIntervalUnit)
        this.setState({ready:ready})
    }
    
    saveScheduleData = () => {

        if (!this.state.ready ) {
            return {}
        }
        
        var saveData={ "enabled": true, "lastrun": "never", "start": this.state.scheduleStart+"Z", "action": this.state.scheduleAction, "type": this.state.scheduleType, "schedule":{} }

            if (this.state.scheduleType=='specificTime' && this.state.scheduleDaysType) {
                if (this.state.scheduleDaysType=='daysOfTheWeek' && this.state.scheduleDays) {
                    saveData.schedule={"at": this.state.scheduleTime, "daysType": this.state.scheduleDaysType, "days":this.state.scheduleDays }
                } else if (this.state.scheduleDaysType=='interval' && this.state.scheduleInterval && this.state.scheduleIntervalUnit) {
                    saveData.schedule={"at": this.state.scheduleTime, "daysType": this.state.scheduleDaysType, "interval":this.state.scheduleInterval }
                }
            } else if (this.state.scheduleType=='interval' && this.state.scheduleInterval && this.state.scheduleIntervalUnit) {
                saveData.schedule={"interval": this.state.scheduleInterval, "unit":this.state.scheduleIntervalUnit }
            }
        return saveData
 
    }
    
    saveSchedule = () => {
        
        var savedata=this.saveScheduleData()
        if (savedata) {
            fetch('/save/logic/schedule/'+this.state.scheduleName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(savedata)
            }).then(this.props.close(true))
        } else {
            console.log('was not ready', this.state)
        }
    } 
    
    clearSetting = (childSetting) => {
        
        if (childSetting=='scheduleTime') {
            this.setState({scheduleTime:'', scheduleDaysType:'', scheduleType:''})
        } else if (childSetting=="scheduleDays") {
            this.setState({scheduleDaysType:''})
        } else if (childSetting=="scheduleInterval") {
            this.setState({scheduleDaysType:''})
            
        }
    }
    
    componentDidMount() {
        
  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));

        if (this.props.selectedSchedule) {
            this.setState({scheduleName: this.props.selectedSchedule})
        }

        if (this.props.scheduleData) {
            var scheduleData={  scheduleStart:this.props.scheduleData['start'].replace('Z',''),
                                enabled: this.props.scheduleData['enabled'],
                                scheduleAction: this.props.scheduleData['action'],
                                scheduleType: this.props.scheduleData['type']
            }
            if (this.props.scheduleData['type']=='specificTime') {
                if (this.props.scheduleData.schedule['daysType']=='daysOfTheWeek') {
                    console.log(this.props.scheduleData.schedule)
                    var scheduleDetails={   scheduleTime: this.props.scheduleData.schedule['at'],
                                            scheduleDays: this.props.scheduleData.schedule['days'],
                                            scheduleDaysType: this.props.scheduleData.schedule['daysType']
                    }
                } else if (this.props.scheduleData.schedule['daysType']=='interval') {
                    var scheduleDetails={   scheduleTime: this.props.scheduleData.schedule['at'],
                                            scheduleInterval: this.props.scheduleData.schedule['interval'],
                    }
                }
            } else if (this.props.scheduleData['type']=='interval') {
                    var scheduleDetails={   scheduleInterval: this.props.scheduleData.schedule['interval'],
                                            scheduleIntervalUnit: this.props.scheduleData.schedule['unit'],
                    }
            }
            
            this.setState(scheduleData)
            this.setState(scheduleDetails)
        } 
    }

    render() {

        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                { this.state.deviceSelect ?
                    <DeviceActionSelect select={this.handleActionSelect} />
                :
                    <List className={classes.list}>
                        <ScheduleName target="scheduleName" change={this.changeValue} value={this.state.scheduleName} />
                        <Divider />
                        { !this.state.scheduleType ?
                        <React.Fragment>
                            <ScheduleChoice icon={<EditIcon />} target='scheduleType' value='specificTime' choose={this.changeValue} choice="At a specific time" desc="At a specific time on certain days" />
                            <ScheduleChoice icon={<EditIcon />} target='scheduleType' value='interval' choose={this.changeValue} choice="On an interval" desc="After a specified amount of time has elapsed" />
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            { this.state.scheduleType=="specificTime" ?
                                <React.Fragment>
                                    <ScheduleTime clear={this.clearSetting} target="scheduleTime" change={this.changeValue} value={this.state.scheduleTime} />
                                    { !this.state.scheduleDaysType ?
                                    <React.Fragment>
                                        <ScheduleChoice icon={<EditIcon />} target='scheduleDaysType' value='daysOfTheWeek' choose={this.changeValue} choice="Specific days of the week" />
                                        <ScheduleChoice icon={<EditIcon />} target='scheduleDaysType' value='interval' choose={this.changeValue} choice="Every x days" />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        { this.state.scheduleDaysType=="daysOfTheWeek" ?
                                            <ScheduleDays clear={this.clearSetting} target="scheduleDays" change={this.changeValue} value={this.state.scheduleDays} />
                                        : null }
                                        { this.state.scheduleDaysType=="interval" ?
                                            <ScheduleDaysInterval clear={this.clearSetting} target="scheduleInterval" change={this.changeValue} value={this.state.scheduleInterval} />
                                        : null }
                                    </React.Fragment>
                                    }
                                </React.Fragment>
                            : null }
                            { this.state.scheduleType=="interval" ?
                                <ScheduleInterval unitTarget="scheduleIntervalUnit" intervalTarget="scheduleInterval" change={this.changeValue} unit={this.state.scheduleIntervalUnit} value={this.state.scheduleInterval} />
                            : null }
                        </React.Fragment>
                        }
                        <Divider />
                        <ScheduleStart target="scheduleStart" change={this.changeValue} value={this.state.scheduleStart} />
                        <Divider />
                        <ScheduleAction action={this.state.scheduleAction} deviceSelect={this.selectDevice} edit={this.editActionValue} />
                    </List>
                }
                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    {this.state.ready ?
                    <Button onClick={(e) => this.saveSchedule()} color="primary">SAVE</Button>
                    : null }
                    {this.state.deviceSelect ?
                        <Button onClick={() => this.setState({deviceSelect: false})}  color="primary">CANCEL</Button>
                    :
                        <Button onClick={(e) => this.props.close()} color="primary">CANCEL</Button>
                    }
                </DialogActions>
            </React.Fragment>
        )
    }

}

ScheduleEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleEditor);
