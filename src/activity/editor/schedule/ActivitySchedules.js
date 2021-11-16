import React, { useState } from 'react';
import ActivitySchedule from "activity/editor/schedule/ActivitySchedule"
import useActivityEditorStore from 'store/activityEditorStore'
import GridSection from 'components/GridSection';
import ErrorBoundary from 'error/ErrorBoundary'
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"

import { shortTimeFormat, addActivityItem } from 'store/activityEditorHelpers'

const ActivitySchedules = props => {

    const [ removing, setRemoving ] = useState(false)
    const items = useActivityEditorStore(state => state.activity.schedules)
    const name = "Schedules"
    const category = "schedules"

    function add() {
        const newItem={
            'type':'interval', 
            'interval':1, 
            'unit':'days', 
            'start':shortTimeFormat()
        }
        addActivityItem(category, newItem)
    }

    return (
        <GridSection    name={name} 
                        margin={true}
                        secondary={ <ActivitySectionButtons 
                                        add = { add } 
                                        setRemoving = { setRemoving } 
                                        removing = { removing } 
                                        count = { items ? items.length : 0 }
                                    /> }
        >
                { items && items.map( (item,index) =>
                    <ErrorBoundary key={"trigger"+index} >
                        <ActivitySchedule index = {index} removing = {removing} />
                    </ErrorBoundary>
                )}
        </GridSection>
    )
};

export default ActivitySchedules