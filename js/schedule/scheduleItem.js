import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },

});
const monthLongNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  

class ScheduleItem extends React.Component {
    
    dateOnly = (full) => {
        var donly=full.replace('Z','').split('T')[0]
        var ymd=donly.split('-')
        var monthname=monthNames[parseInt(ymd[1])-1]
        return monthname+" "+ymd[2]+", "+ymd[0]
    }

    timeOnly = (full) => {
        
        if (full.includes('T')) {
            var tonly=full.replace('Z','').split('T')[1]
        } else {
            var tonly=full
        }
        
        var hms=tonly.split(':')
        
        if (parseInt(hms[0])>12) {
            return parseInt(hms[0])-12+":"+hms[1]+"p"
        } else if (parseInt(hms[0])>1) {
            return parseInt(hms[0])+":"+hms[1]+"a"
        } else {
            return "12:"+hms[1]+"a"
        }
    }

    
    dateIfFuture = (full) => {
        var date = new Date();
        var mydate=new Date(full);
        if(date < mydate) {
            return " starting "+this.dateOnly(full)
        } 
        return ""
    }

    render() {
        
        const { classes, schedule, name, edit } = this.props;
        
        return (
            <ListItem className={classes.listItem} >
                { edit ?
                    <Avatar onClick={ () => this.props.delete(name)}><CloseIcon /></Avatar>
                :
                    <Avatar className={classes.waterIcon}  onClick={ () => this.props.open(name) }><ScheduleIcon /></Avatar>
                }
                { schedule.type=='specificTime' ?
                    ( schedule['schedule']['daysType']=='daysOfTheWeek' ?
                        <ListItemText primary={name} secondary={"At "+this.timeOnly(schedule['schedule']['at'])+" on "+schedule['schedule']['days']+this.dateIfFuture(schedule['start'])+" / next: "+this.dateOnly(schedule['nextrun'])} />
                    :
                        <ListItemText primary={name} secondary={"At "+this.timeOnly(schedule['schedule']['at'])+" every "+schedule['schedule']['interval']+" days starting "+schedule['start']} />
                    )
                :
                    <ListItemText primary={name} secondary={"Every "+schedule['schedule']['interval']+" "+schedule['schedule']['unit']+" starting "+this.dateOnly(schedule['start'])+" "+this.timeOnly(schedule['start'])+" / next: "+this.dateOnly(schedule['nextrun'])+" "+this.timeOnly(schedule['nextrun'])} />
                }
                <Switch color="primary" disabled={edit} checked={schedule['enabled']} onChange={ (e) => this.props.toggleSchedule(e) } />

            </ListItem>
        )
    }
}

ScheduleItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleItem);
