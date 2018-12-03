import React from "react";
import PropTypes from 'prop-types';
import { withData } from '../DataContext/withData';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import DialogActions from '@material-ui/core/DialogActions';

import SofaDialog from '../sofaDialog'
import ScheduleEditor from './scheduleEditor'
import ScheduleList from './scheduleList'

class ScheduleDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: {},
            typeSelect: "",
            daysType:"",
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
            intervalUnits: ['days','hours','minutes'],
            builder: false,
            deviceSelect: false,
            schedAction: false,
            scheduleData: {}
        };
    }   
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        console.log(deviceName, endpointId, controller, cmd)
        this.setState({ schedAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}})
        this.setState({ deviceSelect:false})
    }
    
    loadSchedule = () => {
  	    fetch('/list/logic/schedule')
 		    .then(result=>result.json())
            .then(data=>this.setState({schedule:data}))
    }
    
    componentDidMount() {  
        this.loadSchedule()
    }

    testClear = () => {
        this.setState({typeSelect: '',daysType:''})
    }
    
    openEditor = (item) => {
        this.setState({ builder: true, selectedSchedule: item})
    }
    
    toggleSchedule = (scheduleName) => {
        var scheduledata=this.state.schedule[scheduleName]
        scheduledata['enabled']=!scheduledata['enabled']
        
    }
    
    closeEditor = (reloadNeeded) => {
        if (reloadNeeded) {
            this.loadSchedule()
        }
        this.setState({ builder: false })
    }
    
    saveSchedule = (scheduleName, savedata) => {
        
        var savedata=this.saveScheduleData()
        if (savedata) {
            fetch('/save/logic/schedule/'+this.state.scheduleName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(savedata)
            }).then(this.loadSchedule())
        } else {
            console.log('was not ready', this.state)
        }
    } 
    
    deleteSchedule = (scheduleName) => {

        var schedule=this.state.schedule
        delete schedule[scheduleName]

        fetch('/del/logic/schedule/'+scheduleName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(this.setState({schedule:schedule}));
    } 

    render() {
        
        const { directives, open, devices } = this.props;
        const { builder, schedule, selectedSchedule } = this.state;

        return (
            <SofaDialog title="Schedule" open={open} close={this.props.close} >
                { builder ?
                    <ScheduleEditor directives={directives} selectedSchedule={selectedSchedule} scheduleData={schedule[selectedSchedule]} clear={this.testClear} close={this.closeEditor} devices={devices} schedule={schedule} / >
                :
                    <ScheduleList schedule={schedule} openEditor={this.openEditor} close={this.props.close} delete={this.deleteSchedule} toggle={this.toggleSchedule} />
                }
            </SofaDialog>
        )
    }
}

export default withData(ScheduleDialog);