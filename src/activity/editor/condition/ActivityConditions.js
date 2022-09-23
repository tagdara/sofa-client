import React, { useState } from 'react';
import ActivityCondition from "activity/editor/condition/ActivityCondition"
import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { addActivityItem, removeActivityItem } from 'activity/editor/activityEditorHelpers'
import ErrorBoundary from 'error/ErrorBoundary'
import { Divider} from '@mantine/core';

import ActivityCategory from "activity/editor/layout/ActivityCategory"

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

    const select = ( action, index) => {
        if (action === "delete") {
            removeActivityItem(category, index)
        }
    }

    return (
        <ActivityCategory   name={name} count={count} add={add} 
                            setRemoving = { setRemoving } 
                            setReordering ={ setReordering } 
                            removing = { removing } 
                            reorder = { reordering }
        >
            { (items && items.length >0) && <Divider style={{ width: "100%"}} />}
            { items && items.map( (item,index) =>
                <ErrorBoundary key={"cond"+index} >
                    <ActivityCondition compact={true} category={category} index = {index} select={select} reordering = {reordering} removing = {removing} wide={props.wide} />
                </ErrorBoundary>
            )}
        </ActivityCategory >
    )
};

export default ActivityConditions