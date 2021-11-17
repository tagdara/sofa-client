import React from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import GridItem from 'components/GridItem'

import ScheduleStart from 'activity/editor/schedule/ScheduleStart'
import ScheduleInterval from 'activity/editor/schedule/ScheduleInterval'
import ScheduleDays from 'activity/editor/schedule/ScheduleDays'

import useActivityEditorStore from 'store/activityEditorStore'
import { updateActivityItem } from 'store/activityEditorHelpers'

const useStyles = makeStyles({
    flex: {
        display: "flex",
        padding: 0,
    },
});

const ActivitySchedule = props => {

    const schedule = useActivityEditorStore(state => state.activity.schedules[props.index] )
    const classes = useStyles();

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
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <ScheduleStart wide={props.wide} target="start" change={changeValue} value={schedule.start} />
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                { schedule.hasOwnProperty('type') && schedule.type==='interval' ?
                    <ScheduleInterval toggle={toggleType} change={changeValue} unit={schedule.unit} value={schedule.interval} />
                :
                    <ScheduleDays toggle={toggleType} change={changeValue} value={schedule.days} />
                }
            </Grid>
        </GridItem>
    )
}

export default ActivitySchedule