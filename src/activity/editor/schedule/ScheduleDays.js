import React from 'react';
import CardLine from 'components/CardLine';
import ColorButton from 'components/ColorButton';
import ActivityLineSegment from 'activity/editor/layout/ActivityLineSegment'

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
        <ActivityLineSegment wide={props.wide}>
            <CardLine>
                { daysOfTheWeek.map((day) => 
                    <ColorButton key={day} label={day} on={props.value && props.value.includes(day) } onClick={(e) => editDays(day)} >
                        {day}
                    </ColorButton>
                    )
                }
            </CardLine>
        </ActivityLineSegment>
    )
}
