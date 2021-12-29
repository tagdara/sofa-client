import React from 'react';
import { directives } from 'store/directive'
import { deviceByEndpointId, deviceDirectives } from 'store/deviceHelpers'
import { updateActivityItem } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'
import { Button, Select } from '@mantine/core';

export default function DeviceDirective(props) {
    
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
    const directiveMap = deviceDirectives(device)

    function propertyFromDirective(controllerName, directiveName) {
        if (controllerName===undefined || directiveName===undefined) {
            return undefined
        }
        if (directives.hasOwnProperty(controllerName) && directives[controllerName].hasOwnProperty(directiveName)) {
            var actionValues = directives[controllerName][directiveName]
            for (var av in actionValues) {
                return av
            }
        }
        return undefined
    }

    if (!device) { return null }    

    function handleChangeDirectiveName(newValue) {
        var index = parseInt(newValue)
        if (index < 0 || index > directiveMap.length-1) { return false}

        var newDirective = directiveMap[index]
        var propertyName = propertyFromDirective(newDirective.controller, newDirective.directive)
        var updatedItem =   {...item, propertyName: propertyName, 
                                    controller: newDirective.controller, 
                                    command: newDirective.directive, 
                                    instance: newDirective.instance, 
                                    value: undefined
                            }
        updateActivityItem(props.category, props.index, updatedItem)
    }
    
    function defaultOrValue() { 
        var controller = item.controller
        if (!controller) { return null }
        if (controller.includes('.')) {
            controller = controller.split('.')[1]
        }
        for (var j = 0; j < directiveMap.length; j++) {
            if ((directiveMap[j].instance === item.instance) && (directiveMap[j].controller === controller) && (directiveMap[j].directive === item.command)) {
                return j.toString()
            }
        }
        return null
    }
    
    function getLabel(item) {
        if (item.instance) {
            return item.instance.split('.')[1]+"  ("+item.directive+")"
        } else {
            return item.directive
        }
    }

    const selections = directiveMap.map( (item,index) => { return { value: index.toString(), label: getLabel(item) }})
    const value = defaultOrValue()

    if (props.compact) {
        return <Button size={props.size ? props.size : "sm"} compact radius={0}>{getLabel(directiveMap[value])}</Button>
    }

    return (
        <Select value={ value } 
                onChange={ handleChangeDirectiveName }
                data={ selections }
        />
    )
}
