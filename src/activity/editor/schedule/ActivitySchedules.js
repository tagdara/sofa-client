import React, { useState } from 'react';
import ActivitySchedule from "activity/editor/schedule/ActivitySchedule"
import useActivityEditorStore from 'store/activityEditorStore'
import ErrorBoundary from 'error/ErrorBoundary'
import ActivityCategory from "activity/editor/layout/ActivityCategory"
import { shortTimeFormat, addActivityItem } from 'store/activityEditorHelpers'

const ActivitySchedules = props => {

    const [ removing, setRemoving ] = useState(false)
    const items = useActivityEditorStore(state => state.activity.schedules)
    const name = "Schedules"
    const category = "schedules"
    const count = items ? items.length : 0

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
        <ActivityCategory   name={name} count={count} add={add} 
                            setRemoving = { setRemoving } removing = { removing }  >
                { items && items.map( (item,index) =>
                    <ErrorBoundary key={"trigger"+index} >
                        <ActivitySchedule index = {index} removing = {removing} />
                    </ErrorBoundary>
                )}
        </ActivityCategory>
    )
};

export default ActivitySchedules