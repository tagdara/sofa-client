import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ScheduleIcon from '@material-ui/icons/Schedule';

const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },

});
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  

class ScheduleList extends React.Component {
    
    dateOnly = (full) => {
        var donly=full.replace('Z','').split('T')[0]
        var ymd=donly.split('-')
        var monthname=monthNames[parseInt(ymd[1])-1]
        return monthname+" "+ymd[2]+", "+ymd[0]
    }

    timeOnly = (full) => {
        var tonly=full.replace('Z','').split('T')[1]
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
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <DialogContent>
                    <List>
                    { Object.keys(this.props.schedule).map((key, index) => (
                        <ListItem key={key} className={classes.listItem} >
                            <Avatar className={classes.waterIcon}  onClick={ () => this.props.openBuilder(key) }><ScheduleIcon /></Avatar>
                            { this.props.schedule[key].type=='specificTime' ?
                                ( this.props.schedule[key]['schedule']['daysType']=='daysOfTheWeek' ?
                                    <ListItemText primary={key} secondary={"At "+this.props.schedule[key]['schedule']['at']+" on "+this.props.schedule[key]['schedule']['days']+this.dateIfFuture(this.props.schedule[key]['start'])+" / next: "+this.props.schedule[key]['nextrun']} />
                                :
                                    <ListItemText primary={key} secondary={"At "+this.props.schedule[key]['schedule']['at']+" every "+this.props.schedule[key]['schedule']['interval']+" days starting "+this.props.schedule[key]['start']} />
                                )
                            :
                                <ListItemText primary={key} secondary={"Every "+this.props.schedule[key]['schedule']['interval']+" "+this.props.schedule[key]['schedule']['unit']+" starting "+this.dateOnly(this.props.schedule[key]['start'])+" "+this.timeOnly(this.props.schedule[key]['start'])+" / next: "+this.props.schedule[key]['nextrun']} />
                            } 
                            <Switch color="primary" checked={this.props.schedule[key]['enabled']} onChange={ (e) => this.props.toggleSchedule(e) } />
                        </ListItem>
                    )) }
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={ (e) => this.props.openBuilder() } color="primary" >ADD</Button>
                    <Button onClick={ (e) => this.props.close() } color="primary" autoFocus>OK</Button>
                </DialogActions>
            </React.Fragment>
            )
    }
}

ScheduleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleList);
