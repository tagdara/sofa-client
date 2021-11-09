import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import GridItem from 'components/GridItem'
import ScheduleStart from './ScheduleStart'
import ScheduleInterval from './ScheduleInterval'
import ScheduleDays from './ScheduleDays'

const useStyles = makeStyles({
    flex: {
        display: "flex",
        padding: 6,
    },
});

export default function AutomationSchedule(props) {

    const [schedule, setSchedule] = useState(props.item)
    const classes = useStyles();
    
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
        var newSchedule={ ...props.item, [aspect] : value}
        props.save(props.index, newSchedule)
        setSchedule(newSchedule)
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
            <ScheduleStart wide={props.wide} delete={props.delete} remove={props.remove} target="start" change={editValues} value={schedule.start} />
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                { schedule.hasOwnProperty('type') && schedule.type==='interval' ?
                    <ScheduleInterval toggle={toggleType} change={editValues} unit={schedule.unit} value={schedule.interval} />
                :
                    <ScheduleDays toggle={toggleType} change={editValues} value={schedule.days} />
                }
            </Grid>
        </GridItem>
    )
}
