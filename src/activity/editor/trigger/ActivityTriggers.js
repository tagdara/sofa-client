import React, { useState } from 'react';
import useActivityEditorStore from "store/activityEditorStore"
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"
import ActivityTrigger from "activity/editor/trigger/ActivityTrigger"
import GridSection from 'components/GridSection';
import ErrorBoundary from 'error/ErrorBoundary'

import { addActivityItem } from 'store/activityEditorHelpers'

const ActivityTriggers = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.triggers)
    const name = "Triggers"
    const category = "triggers"

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
                <ErrorBoundary key={"trigger"+index} >
                    <ActivityTrigger category={category} index = {index} reordering = {reordering} removing = {removing} />
                </ErrorBoundary>
            )}
        </GridSection>
    )
};

export default ActivityTriggers