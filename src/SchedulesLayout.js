import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import ScheduleItem from './automation/ScheduleItem';
import GridBreak from './GridBreak';

export default function SchedulesLayout(props) {

    const [schedules, setSchedules] = useState([])
    const { applyBackPage, applyLayoutCard } = useContext(LayoutContext);

    useEffect(() => {
        var serverurl="https://"+window.location.hostname+'/list/logic/schedule';
        fetch(serverurl)
            .then(result=>result.json())
            .then(result=>setSchedules(result));
    }, []);

    function selectSchedule(schedule) {
        applyBackPage('SchedulesLayout',{})
        applyLayoutCard('AutomationLayout', {'name':schedule} )
    }   
    
    function runSchedule(schedule) {
        console.log('stubbed run', schedule)
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
