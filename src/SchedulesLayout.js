import React, { memo }  from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './DataContext/withLayout';

import ScheduleItem from './automation/ScheduleItem';
import GridBreak from './GridBreak';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function SchedulesLayout(props) {

    const classes = useStyles();
    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        getSchedules()
    }, []);

    function getSchedules() {
        fetch('/list/logic/schedule')
            .then(result=>result.json())
            .then(result=>setSchedules(result));
        console.log(schedules)
    }
    
    function selectSchedule(schedule) {
        props.setBack('SchedulesLayout',{})
        props.setLayoutCard('AutomationLayout', {'name':schedule} )
    }   
    
    function runSchedule(schedule) {
        console.log('stubbed run', schedule)
    }
    
    function toggleSchedule(schedule) {
        console.log('stubbed toggle', schedule)
    }
    
    return (    
        <React.Fragment>
            <GridBreak label={"Scheduled Activities"} />
            { schedules.map(schedule => 
                <ScheduleItem select={selectSchedule} edit={false} name={schedule.name} schedule={schedule.schedule} next={schedule.nextrun} last={schedule.lastrun} run={runSchedule} key={ schedule.name+'-reg' } />
            )}
        </React.Fragment>
    )

};

export default memo(withLayout(SchedulesLayout))