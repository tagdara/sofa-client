import React from 'react';
import SegmentMenu from 'components/SegmentMenu'
import useActivityItem from 'activity/useActivityItem'
import { updateActivityItem } from 'store/activityEditorHelpers'

export default function ConditionOperator(props) {

    const { item } = useActivityItem(props.category, props.index)
    const operatorList=[ '=','!=','>','>=','<','=<', ]
    const selections = operatorList.map( item => ({ label: item, value: item}))

    if (!item || !item.endpointId || !item.propertyName ) { return null }

    if (!item.operator) { setOperator("=") }

    function setOperator(newValue) {

        const updatedItem = {   ...item,   
                                "operator": newValue
                            }

        updateActivityItem(props.category, props.index, updatedItem)
    }

    function opDefaultOrValue() {
        if (item.operator) { return item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }

    if (!item.operator) { setOperator("=") }
    // <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />

    return <SegmentMenu size={props.size} value={ opDefaultOrValue() } selections={selections} select={setOperator} />

}
