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
    const [schedule, setSchedule] = useState({})
    const scheduleTypes=['days','interval']

    useEffect(() => {
        parseSchedule()
    }, [props.item]);
    
    function parseSchedule() {
        setSchedule(props.item)
    }
    
    function editValues(action, value) {
        var newitem=props.item // working copy of props
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
        <GridItem elevation={0}>
            <ScheduleStart delete={props.delete} remove={props.remove} target="start" change={editValues} value={schedule.start} />
            { schedule.hasOwnProperty('type') && schedule.type=='interval' ?
                <ScheduleInterval toggle={toggleType} change={editValues} unit={schedule.unit} value={schedule.interval} />
            :
                <ScheduleDays toggle={toggleType} change={editValues} value={schedule.days} />
            }
        </GridItem>
    )
}
