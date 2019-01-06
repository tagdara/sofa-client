import React, { memo }  from 'react';
import { useState, useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem'

function ScheduleItem(props) {

    const monthLongNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
   
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
        <GridItem>
            <ListItem>
                <Avatar onClick={ () => props.select(props.name) }><ScheduleIcon /></Avatar>
                <ListItemText onClick={ () => props.select(props.name) } primary={props.name} secondary={"Next: "+dateOnly(props.next)+" "+timeOnly(props.next)} />
            </ListItem>
        </GridItem>
    )
}

export default memo(ScheduleItem)