import React from 'react';
import SegmentMenu from 'components/SegmentMenu'
import useActivityItem from 'activity/useActivityItem'

export default function ConditionOperator(props) {

    const { item } = useActivityItem(props.category, props.index)
    const operatorList=[ '=','!=','>','>=','<','=<', ]
    const selections = operatorList.map( item => ({ label: item, value: item}))

    function setOperator(value) {
        console.log('saving op',value)
        props.save(props.index, {...item, "operator": value})
    }

    function opDefaultOrValue() {
        if (item.operator) { return item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }

    // <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />

    return <SegmentMenu size={props.size} value={ opDefaultOrValue() } selections={selections} select={setOperator} />

}
