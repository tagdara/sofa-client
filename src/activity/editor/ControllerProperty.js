import React from 'react';
import OperatorButton from "./input/operatorButton"
import { Group, Select } from '@mantine/core';
import { mapDeviceProperties, deviceByEndpointId }  from 'store/deviceHelpers'
import { updateActivityItem } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'
import Segment from 'components/Segment'

export default function ControllerProperty(props) {

    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
    const propertyMap = device ? mapDeviceProperties(device) : []

    if (!propertyMap) { return null }

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

    function defaultOrValue() { 
        for (var j = 0; j < propertyMap.length; j++) {
            if (    (propertyMap[j].instance===item.instance) && 
                    (propertyMap[j].controller===item.controller) && 
                    (propertyMap[j].property===item.propertyName)
            ) {
                return j.toString()
            }
        }
        return null
    }
    
    function opDefaultOrValue() {
        if (item.operator) { return item.operator}
        if (props.anyOp) { return 'Any' }
        return '='
    }

    function getLabel(item) {
        if (item.instance) {
            return item.instance.split('.')[1]+"  ("+item.property+")"
        } else {
            return item.property
        }
    }

    const selections = propertyMap.map( (item,index) => { return { value: index.toString(), label: getLabel(item) }})
    const value = defaultOrValue()

    if (props.compact) {
        return (
            <>
                <Segment value={ getLabel(propertyMap[parseInt(value)]) } />
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
