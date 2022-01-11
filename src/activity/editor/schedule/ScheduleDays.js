import React from 'react';
import { Button, Group } from '@mantine/core'
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
            <Group noWrap spacing={2}>
                { daysOfTheWeek.map((day) => 
                    <Button size="xs" compact variant={props.value && props.value.includes(day) ? "filled" : "light" } key={day} onClick={(e) => editDays(day)} >
                        {day}
                    </Button>
                    )
                }
            </Group>
        </ActivityLineSegment>
    )
}
