import React, { useState } from 'react';
import ActivityAction from "activity/editor/action/ActivityAction"
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"
import GridSection from 'components/GridSection';

import useActivityEditorStore from "store/activityEditorStore"
import ErrorBoundary from 'error/ErrorBoundary'
import { addActivityItem } from 'store/activityEditorHelpers'

const ActivityActions = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.actions)
    const name = "Actions"
    const category = "actions"

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
        <GridSection    name={name} 
                        margin={true}
                        secondary={ <ActivitySectionButtons 
                                        add = { add } 
                                        setRemoving = { setRemoving } 
                                        setReordering ={ setReordering } 
                                        removing = { removing } 
                                        reorder = { reordering }
                                        count = { items ? items.length : 0 }
                                    /> }
                >
            { items && items.map( (item,index) =>
                <ErrorBoundary key={"actions"+index} >
                    <ActivityAction category={category} index = {index} reordering = {reordering} removing = {removing} />
                </ErrorBoundary>
            )}
        </GridSection>
    )
};

export default ActivityActions
