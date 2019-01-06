import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import ScheduleIcon from '@material-ui/icons/Schedule';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';

import ToggleButton from '../ToggleButton';
import ToggleAvatar from '../ToggleAvatar'
import GridItem from '../GridItem'

export default function ScheduleDays(props) {

    const daysOfTheWeek = ['sun','mon','tue','wed','thu','fri','sat'];

    function editDays(day) {
        if (props.value) {
            var sdays=props.value 
        } else {
            var sdays=[]
        }
        if (sdays.includes(day)) {
            sdays.splice(sdays.indexOf(day),1)
        } else {
            sdays.push(day)
        }
        props.change('days', sdays)
    }
    
    return (
        <ListItem>
            <ListItemIcon onClick={props.toggle}><ViewWeekIcon /></ListItemIcon>
            { daysOfTheWeek.map((day) => 
                <ToggleButton key={day} label={day} buttonState={props.value && props.value.includes(day) ? 'on' : 'off' } onClick={(e) => editDays(day)} >
                    {day}
                </ToggleButton>
                )
            }
        </ListItem>
    )
}
