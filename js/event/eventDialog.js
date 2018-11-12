import React from "react";
import PropTypes from 'prop-types';
import { withData } from '../DataContext/withData';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import DialogActions from '@material-ui/core/DialogActions';

import SofaDialog from '../sofaDialog'
import EventList from './eventList'
import EventEditor from './eventEditor'

class EventDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: {},
            editor: false,
            selectedEvent: '',
        };
    }   
    
    openEditor = (item) => {
        this.setState({ editor: true, selectedEvent: item})
    }
    
    toggleEvent = (eventName) => {
        var eventdata=this.state.event[scheduleName]
        scheduledata['enabled']=!scheduledata['enabled']
        
    }
    
    closeEditor = (reloadNeeded) => {
        if (reloadNeeded) {
            this.reloadSchedule()
        }
        this.setState({ editor: false })
    }
    
    saveEvent = (eventName, savedata) => {
        
        if (savedata) {
            fetch('/save/logic/event/'+eventName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(savedata)
            }).then(this.loadEvents())
        } else {
            console.log('was not ready', this.state)
        }
    } 
    
    deleteEvent = (eventName) => {

        var events=this.state.events
        delete events[eventName]

        fetch('/del/logic/event/'+scheduleName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(this.setState({events:events}));
    } 
    
    loadEvents = () => {
  	    fetch('/list/logic/events')
 		    .then(result=>result.json())
            .then(data=>this.setState(data, () => console.log(this.state)))

    }
    
    componentDidMount() {  
  	    this.loadEvents()
    }

    render() {

        return (
            <SofaDialog title="Events" open={this.props.open} close={this.props.close} >
                { this.state.editor ?
                    <EventEditor name={this.state.selectedEvent} event={this.state.events[this.state.selectedEvent]} close={this.closeEditor} / >
                :
                    <EventList events={this.state.events} openEditor={this.openEditor} close={this.props.close} delete={this.deleteEvent} toggle={this.toggleEvent} />
                }
            </SofaDialog>
        )
    }
}

export default withData(EventDialog);
