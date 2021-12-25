import React, { useState } from 'react';
import ActivityAction from "beta/activity/editor/action/ActivityAction"
import ActivityCategory from "beta/activity/editor/layout/ActivityCategory"

import useActivityEditorStore from "store/activityEditorStore"
import ErrorBoundary from 'beta/error/ErrorBoundary'
import { addActivityItem } from 'store/activityEditorHelpers'

const ActivityActions = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.actions)
    const name = "Actions"
    const category = "actions"
    const count = items ? items.length : 0

    function add() {
        const newItem={
            "type": "command",
            "endpointId": undefined,
            "controller": undefined,
            "command": undefined,
            "deviceName": undefined
        }
        addActivityItem(category, newItem)
    }

    return (
        <ActivityCategory   name={name} count={count} add={add} 
                            setRemoving = { setRemoving } setReordering ={ setReordering } removing = { removing } reordering = { reordering } >
            { items && items.map( (item,index) =>
                <ErrorBoundary key={"actions"+index} >
                    <ActivityAction category={category} index = {index} reordering = {reordering} removing = {removing} wide={props.wide} count={count} />
                </ErrorBoundary>
            )}
        </ActivityCategory>
    )
};

export default ActivityActions
