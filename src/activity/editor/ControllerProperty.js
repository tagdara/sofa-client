import React from 'react';
import OperatorButton from "./input/operatorButton"
import { Group, Select } from '@mantine/core';
import { updateActivityItem } from 'store/activityEditorHelpers'
import Segment from 'components/Segment'
import useDeviceProperties from 'activity/useDeviceProperties'
import useActivityItem from 'activity/useActivityItem'

export default function ControllerProperty(props) {

    const { item, endpointId } = useActivityItem(props.category, props.index)
    const { propertyMap, selections, getDefaultOrValue, getSelectionLabel } = useDeviceProperties(endpointId)
    const value = getDefaultOrValue(item)

    function editOperatorValue(value) {
        console.log('saving op',value)
        props.save(props.index, {...item, "operator": value})
    }

    function handleChangePropertyName(newValue) {
        var index = parseInt(newValue)
        if (index < 0 || index > propertyMap.length-1) { return false}

        var updatedValue = propertyMap[index]

        const updatedItem = {...item, "instance": updatedValue.instance, 
                                    "value": undefined, "command": undefined, 
                                    "controller":updatedValue.controller, "propertyName": updatedValue.property 
                            }

        updateActivityItem(props.category, props.index, updatedItem)
    }



    function opDefaultOrValue() {
        if (item.operator) { return item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }

    if (props.compact) {
        return (
            <>
                <Segment value={ getSelectionLabel(value) } />
                <Segment value={ opDefaultOrValue() } />
            </>
        )
    }
    
    return (
        <Group noWrap>
            <Select value={ value } 
                onChange={ handleChangePropertyName }
                data={ selections }
            />
            <OperatorButton index={props.index} value={ opDefaultOrValue() } setOperator={ editOperatorValue } anyOp={props.anyOp} />
        </Group>
    )
}
