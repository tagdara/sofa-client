import React from 'react';

import ActivityLine from 'activity/editor/layout/ActivityLine'
import ScheduleStart from 'activity/editor/schedule/ScheduleStart'
import ScheduleInterval from 'activity/editor/schedule/ScheduleInterval'
import ScheduleDays from 'activity/editor/schedule/ScheduleDays'

import useActivityEditorStore from 'store/activityEditorStore'
import { updateActivityItem } from 'store/activityEditorHelpers'


const ActivitySchedule = props => {

    const schedule = useActivityEditorStore(state => state.activity.schedules[props.index] )

    if (!schedule) { return null }
    
    function changeValue(aspect, value) {
        var updatedSchedule={ ...schedule, [aspect] : value}
        updateActivityItem(props.category, props.index, updatedSchedule)
    }

    function toggleType() {
        if (schedule.hasOwnProperty('type') && schedule.type==='interval') {
            changeValue('type','days')
        } else {
            changeValue('type','interval')
        }
    }

    return (
        <ActivityLine category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <ScheduleStart wide={props.wide} target="start" change={changeValue} value={schedule.start} />
            { schedule.hasOwnProperty('type') && schedule.type==='interval' ?
                <ScheduleInterval wide={props.wide} toggle={toggleType} change={changeValue} unit={schedule.unit} value={schedule.interval} />
            :
                <ScheduleDays wide={props.wide} toggle={toggleType} change={changeValue} value={schedule.days} />
            }
        </ActivityLine>
    )
}

export default ActivitySchedule