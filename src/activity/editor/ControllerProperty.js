import React from 'react';
import { updateActivityItem } from 'store/activityEditorHelpers'
import SegmentMenu from 'components/SegmentMenu'
import useDeviceProperties from 'activity/useDeviceProperties'
import useActivityItem from 'activity/useActivityItem'

export default function ControllerProperty(props) {

    const { item, itemType, endpointId } = useActivityItem(props.category, props.index)
    const { propertyMap, selections, getDefaultOrValue, getSelectionLabel } = useDeviceProperties(endpointId)
    const value = getDefaultOrValue(item)

    if (!endpointId) { return null }

    const label = getSelectionLabel(value)

    function setPropertyName(newValue) {
        // returns a string index of the value that needs to be converted
        var index = parseInt(newValue)
        if (index < 0 || index > propertyMap.length-1) { return false}
        var updatedValue = propertyMap[index]
        //console.log('newv', newValue, selections, propertyMap)
        //var updatedValue = propertyMap.find((item) => item.directive === newValue)
        console.log('updatedValue', endpointId, props.category, props.index, updatedValue)

        const updatedItem = {   ...item,   
                                "instance": updatedValue.instance, 
                                "value": undefined, 
                                "command": undefined, 
                                "controller":updatedValue.controller, 
                                "namespace": updatedValue.controller,
                                "propertyName": updatedValue.property, 
                                "type": itemType
                            }

        updateActivityItem(props.category, props.index, updatedItem)
    }

    return (
        <SegmentMenu 
            selections={selections} 
            color={ label ? undefined : "red" } 
            value={ label ? label : "No property" } 
            select={setPropertyName} 
        />
    )
}
