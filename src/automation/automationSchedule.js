import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import GridItem from '../GridItem'
import ScheduleStart from './ScheduleStart'
import ScheduleInterval from './ScheduleInterval'
import ScheduleDays from './ScheduleDays'

const useStyles = makeStyles({

    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
    },
});


export default function AutomationSchedule(props) {
    
    const classes = useStyles();
    const [schedule, setSchedule] = useState(props.item)
    const scheduleTypes=['days','interval']

    function changeValue(aspect, value) {
        console.log('changevalue',aspect, value)
        var newschedule={ ...props.item, [aspect] : value}
        props.save(props.index, newschedule)
    }
    
    function clearSetting(a,b,c) {
        console.log('clear',a,b,c)
    }
    
    function saveStub(a,c,t) {
        console.log('Blocked Save',a,c,t)
    }
    
    function toggleType() {
        console.log('toggle')
        if (schedule.hasOwnProperty('type') && schedule.type=='interval') {
            changeValue('type','days')
        } else {
            changeValue('type','interval')
        }
    }

    function shortTimeFormat(thisdate) {
        if (thisdate) {
            var longdate=thisdate
        } else {
            var longdate=new Date().toISOString().replace('Z','')
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    return (
        <GridItem>
            <ScheduleStart delete={props.delete} remove={props.remove} target="start" change={changeValue} value={schedule.start} />
            { schedule.hasOwnProperty('type') && schedule.type=='interval' ?
                <ScheduleInterval toggle={toggleType} change={changeValue} unit={schedule.unit} value={schedule.interval} />
            :
                <ScheduleDays toggle={toggleType} change={changeValue} value={schedule.days} />
            }
        </GridItem>
    )
}
