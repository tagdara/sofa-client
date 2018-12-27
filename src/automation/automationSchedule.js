import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import CloseIcon from '@material-ui/icons/Close';
import ScheduleIcon from '@material-ui/icons/Schedule';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GridItem from '../GridItem';
import DeviceIcon from '../DeviceIcon';

const useStyles = makeStyles({
        
    areaInput: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputstring: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    areaInputdecimal: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    areaInputpercentage: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },
    areaInputinteger: {
        marginTop:0,
        marginLeft: 16,
        width: 40,
        overflowX: "hidden",
    },

    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        padding: 0,
    },
    listActions: {
        minWidth: 320,
        width: "100%",
    },
    spacer: {
        maxWidth: 40,
        minWidth: 40,
        minHeight: 42,
    }
});


export default function AutomationSchedule(props) {

    const classes = useStyles();
    const monthLongNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  

    console.log(props.item)
    
    function dateOnly(full) {
        var donly=full.replace('Z','').split('T')[0]
        var ymd=donly.split('-')
        var monthname=monthNames[parseInt(ymd[1])-1]
        return monthname+" "+ymd[2]+", "+ymd[0]
    }

    function timeOnly(full) {
        
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

    
    function dateIfFuture(full) {
        var date = new Date();
        var mydate=new Date(full);
        if(date < mydate) {
            return " starting "+dateOnly(full)
        } 
        return ""
    }
    
    return (
        <GridItem wide={props.wide} nopad={true}>
        <ListItem>
            <ListItemIcon><ScheduleIcon /></ListItemIcon>
            { props.item.type=='specificTime' ?
                ( props.item['schedule']['daysType']=='daysOfTheWeek' ?
                    <ListItemText primary={"At "+timeOnly(props.item['schedule']['at'])+" on "+props.item['schedule']['days']} secondary={dateIfFuture(props.item['start'])+" / next: "+dateOnly(props.item['nextrun'])} />
                :
                    <ListItemText primary={"At "+timeOnly(props.item['schedule']['at'])+" every "+props.item['schedule']['interval']+" days "+dateIfFuture(props.item['start'])+" / next: "+dateOnly(props.item['nextrun'])}/>
                )
            :
                <ListItemText primary={"Every "+props.item['schedule']['interval']+" "+props.item['schedule']['unit']+" starting "+dateOnly(props.item['start'])+" "+timeOnly(props.item['start'])+" / next: "+dateOnly(props.item['nextrun'])+" "+timeOnly(props.item['nextrun'])} />
            }

            { props.remove ?
                <ListItemSecondaryAction>
                    <IconButton onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
                : 
                <Switch color="primary" disabled={!props.item['enabled']} checked={props.item['enabled']} onChange={ (e) => toggleSchedule(e) } />
            }
        </ListItem>
        </GridItem>
    )
}