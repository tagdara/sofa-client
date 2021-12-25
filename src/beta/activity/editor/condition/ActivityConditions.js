import React, { useState } from 'react';
import ActivityCondition from "../archive/activity/editor/condition/ActivityCondition"
import useActivityEditorStore from 'store/activityEditorStore'
import { addActivityItem } from 'store/activityEditorHelpers'
import ErrorBoundary from '../archive/error/ErrorBoundary'

import ActivityCategory from "../archive/activity/editor/layout/ActivityCategory"

const ActivityConditions = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.conditions)
    const name = "Conditions"
    const category = "conditions"
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
                <ErrorBoundary key={"cond"+index} >
                    <ActivityCondition category={category} index = {index} reordering = {reordering} removing = {removing} wide={props.wide} />
                </ErrorBoundary>
            )}
        </ActivityCategory >
    )
};

export default ActivityConditions