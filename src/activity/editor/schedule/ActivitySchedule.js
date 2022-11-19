import React from 'react';

import ActivityLine from 'activity/editor/layout/ActivityLine'
import ScheduleStart from 'activity/editor/schedule/ScheduleStart'
import ScheduleInterval from 'activity/editor/schedule/ScheduleInterval'
import ScheduleDays from 'activity/editor/schedule/ScheduleDays'
import ActivityScheduleMenu from 'activity/editor/schedule/ActivityScheduleMenu'

import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { updateActivityItem } from 'activity/editor/activityEditorHelpers'
import { Group, Stack, Text } from '@mantine/core';

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
        <ActivityLine compact={props.compact}>
            <ActivityScheduleMenu select={props.select} index={props.index} category={props.category} />
            <Stack spacing={2} >
                <Text size="sm">{"Start"}</Text>
                <ScheduleStart target="start" change={changeValue} value={schedule.start} />
                <Group>
                    { schedule.hasOwnProperty('type') && schedule.type==='interval' ?
                        <ScheduleInterval wide={props.wide} toggle={toggleType} change={changeValue} unit={schedule.unit} value={schedule.interval} />
                    :
                        <ScheduleDays wide={props.wide} toggle={toggleType} change={changeValue} value={schedule.days} />
                    }
                </Group>
            </Stack>
        </ActivityLine>
    )
}

export default ActivitySchedule