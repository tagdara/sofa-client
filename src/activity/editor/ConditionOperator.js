import React, { useEffect } from 'react';
import SegmentMenu from 'layout/components/SegmentMenu'
import useActivityItem from 'activity/useActivityItem'
import { updateActivityItem } from 'activity/editor/activityEditorHelpers'

export default function ConditionOperator(props) {

    const { item } = useActivityItem(props.category, props.index)
    const operatorList=[ '=','!=','>','>=','<','=<', ]
    const selections = operatorList.map( item => ({ label: item, value: item}))

    useEffect(() => {
        if (!item.operator) { setOperator("=") }
    // eslint-disable-next-line
    }, [  ]);


    if (!item || !item.endpointId || !item.propertyName ) { return null }

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
    // <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />

    return <SegmentMenu size={props.size} value={ opDefaultOrValue() } selections={selections} select={setOperator} />

}
