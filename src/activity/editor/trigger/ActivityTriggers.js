import React, { useState } from 'react';
import useActivityEditorStore from "store/activityEditorStore"
import ActivityTrigger from "activity/editor/trigger/ActivityTrigger"
import ActivityCategory from "activity/editor/layout/ActivityCategory"
import ErrorBoundary from 'error/ErrorBoundary'

import { addActivityItem } from 'store/activityEditorHelpers'

const ActivityTriggers = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.triggers)
    const name = "Triggers"
    const category = "triggers"
    const count = items ? items.length : 0
    
    function add() {
        const newItem={
            "type": "property",
            "endpointId": undefined,
            "value": undefined,
            "propertyName": undefined,
            "controller": undefined,
            "deviceName": undefined
        }
        addActivityItem(category, newItem)
    }

    return (
        <ActivityCategory   name={name} count={count} add={add} 
                            setRemoving = { setRemoving } setReordering ={ setReordering } removing = { removing } reorder = { reordering } >

            { items && items.map( (item,index) =>
                <ErrorBoundary key={"trigger"+index} >
                    <ActivityTrigger category={category} index = {index} reordering = {reordering} removing = {removing} wide={props.wide} />
                </ErrorBoundary>
            )}
        </ActivityCategory>
    )
};

export default ActivityTriggers