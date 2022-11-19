import React, { useState } from 'react';
import ActivitySchedule from "activity/editor/schedule/ActivitySchedule"
import useActivityEditorStore from 'activity/editor/activityEditorStore'
import ErrorBoundary from 'error/ErrorBoundary'
import ActivityCategory from "activity/editor/layout/ActivityCategory"
import { shortTimeFormat, addActivityItem, removeActivityItem } from 'activity/editor/activityEditorHelpers'

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
    const select = ( action, index) => {
        if (action === "delete") {
            removeActivityItem(category, index)
        }
    }

    return (
        <ActivityCategory   name={name} count={count} add={add} 
                            setRemoving = { setRemoving } removing = { removing }  >
                { items && items.map( (item,index) =>
                    <ErrorBoundary key={"trigger"+index} >
                        <ActivitySchedule select={select} compact={true} index = {index} removing = {removing} category={category} />
                    </ErrorBoundary>
                )}
        </ActivityCategory>
    )
};

export default ActivitySchedules