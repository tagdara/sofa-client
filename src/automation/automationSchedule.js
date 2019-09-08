import React from 'react';
import { useState } from 'react';
import GridItem from '../GridItem'
import ScheduleStart from './ScheduleStart'
import ScheduleInterval from './ScheduleInterval'
import ScheduleDays from './ScheduleDays'

export default function AutomationSchedule(props) {

    const [schedule, setSchedule] = useState(props.item)

    function editValues(action, value) {
        var edsc=schedule
        edsc[action]=value
        setSchedule(edsc)
        props.save(props.index, edsc)
        console.log(props.index, edsc)
        console.log(action, value)
    }

    function changeValue(aspect, value) {
        console.log('changevalue',aspect, value)
        var newschedule={ ...props.item, [aspect] : value}
        props.save(props.index, newschedule)
    }

    function toggleType() {
        console.log('toggle')
        if (schedule.hasOwnProperty('type') && schedule.type==='interval') {
            changeValue('type','days')
        } else {
            changeValue('type','interval')
        }
    }

    return (
        <GridItem elevation={0}>
            <ScheduleStart delete={props.delete} remove={props.remove} target="start" change={editValues} value={schedule.start} />
            { schedule.hasOwnProperty('type') && schedule.type==='interval' ?
                <ScheduleInterval toggle={toggleType} change={editValues} unit={schedule.unit} value={schedule.interval} />
            :
                <ScheduleDays toggle={toggleType} change={editValues} value={schedule.days} />
            }
        </GridItem>
    )
}
