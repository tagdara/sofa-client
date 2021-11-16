import React, { useState } from 'react';
import ActivityCondition from "activity/editor/condition/ActivityCondition"
import useActivityEditorStore from 'store/activityEditorStore'
import { addActivityItem } from 'store/activityEditorHelpers'
import GridSection from 'components/GridSection';
import ErrorBoundary from 'error/ErrorBoundary'
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"

const ActivityConditions = props => {

    const [ removing, setRemoving ] = useState(false)
    const [ reordering, setReordering ] = useState(false)

    const items = useActivityEditorStore(state => state.activity.conditions)
    const name = "Conditions"
    const category = "conditions"

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
                    <ActivityCondition category={category} index = {index} reordering = {reordering} removing = {removing} />
                </ErrorBoundary>
            )}
        </GridSection>
    )
};

export default ActivityConditions