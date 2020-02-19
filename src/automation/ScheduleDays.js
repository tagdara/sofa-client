import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ToggleButton from '../ToggleButton';

export default function ScheduleDays(props) {

    const daysOfTheWeek = ['sun','mon','tue','wed','thu','fri','sat'];

    function editDays(day) {
        var sdays=[]
        if (props.value) {
            sdays=props.value 
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
            { daysOfTheWeek.map((day) => 
                <ToggleButton key={day} label={day} buttonState={props.value && props.value.includes(day) ? 'on' : 'off' } onClick={(e) => editDays(day)} >
                    {day}
                </ToggleButton>
                )
            }
        </ListItem>
    )
}
