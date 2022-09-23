import React from 'react';
import { directives } from 'endpoint-model/directive/directive'
import { endpointByEndpointId } from 'endpoint-model/discovery'
import { deviceDirectives } from 'endpoint-model/discovery'
import { updateActivityItem } from 'activity/editor/activityEditorHelpers'
import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { Menu, Select } from '@mantine/core';
import Segment from 'layout/components/Segment'


export default function DeviceDirective(props) {
    
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? endpointByEndpointId(endpointId) : undefined
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
        const selectedItem = selections.find( item => item.value === newValue)
        // var index = parseInt(newValue)
        // if (index < 0 || index > directiveMap.length-1) { return false}

        // var newDirective = directiveMap.find((item) => item.instance === newInstance && item.directive === newValue)
        // console.log('newd', newDirective)

        //var newDirective = directiveMap[index]
        var propertyName = propertyFromDirective(selectedItem.namespace, selectedItem.directive)
        var updatedItem = {
            value: undefined,
            ...item, 
            propertyName: propertyName, 
            namespace: selectedItem.namespace,
            controller: selectedItem.namespace, 
            command: selectedItem.directive, 
            instance: selectedItem.instance, 
        }
        console.log('updated item', updatedItem)
        updateActivityItem(props.category, props.index, updatedItem)
    }
    
    function defaultOrValue() { 
        var controller = item.controller
        if (!controller) { return null }

        for (var j = 0; j < directiveMap.length; j++) {
            if ((directiveMap[j].instance === item.instance) && (directiveMap[j].controller === controller) && (directiveMap[j].directive === item.command)) {
                return j.toString()
            }
        }
        return null
    }
    
    function getLabel(item) {
        if (item === undefined) {
            return "Select a directive"
        }

        if (item.instance) {
            if (item.directive === "SetMode") {
                return "Set "+item.instance
            }
            if (item.directive === "TurnOn") {
                return "Turn On "+item.instance
            }
            if (item.directive === "TurnOff") {
                return "Turn Off "+item.instance
            }
            return item.instance+"  ("+item.directive+")"
        } else {
            return item.directive
        }
    }

    //const selections = directiveMap.map( (item,index) => { return { value: index.toString(), label: getLabel(item) }})
    // console.log('dmap', directiveMap)
    const selections = directiveMap.map( (item,index) => { 
        return { value: item.directive + ( item.instance ? "/" + item.instance : ""), label: getLabel(item), namespace: item.controller, directive: item.directive, instance: item.instance }
    })
    const value = defaultOrValue()
 
    if (props.compact) {
        return  <Menu>
                    <Menu.Target>
                        <Segment value={getLabel(directiveMap[parseInt(value)])} />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Directives</Menu.Label>
                        { selections.map( item => 
                            <Menu.Item key={item.label} onClick={ () => handleChangeDirectiveName(item.value)}>{item.label}</Menu.Item>
                        )}   
                    </Menu.Dropdown>
                </Menu>
    }

    return (
        <Select value={ value } 
                onChange={ handleChangeDirectiveName }
                data={ selections }
        />
    )
}
