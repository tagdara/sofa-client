import React from 'react';
import { directives } from 'store/directive'
import { deviceByEndpointId, deviceDirectives } from 'store/deviceHelpers'
import { updateActivityItem } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'
import { Menu, Select } from '@mantine/core';
import Segment from 'components/Segment'

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
        console.log('new', newValue.split("/",1).length, newValue, directiveMap)
        var newInstance = undefined
        if (newValue.split("/").length > 1) {
            newInstance = newValue.split("/")[1]
            newValue = newValue.split("/")[0]
            console.log('news', newValue, newInstance)
        }
        // var index = parseInt(newValue)
        // if (index < 0 || index > directiveMap.length-1) { return false}

        var newDirective = directiveMap.find((item) => item.instance = newInstance && item.directive === newValue)
        console.log('newd', newDirective)

        //var newDirective = directiveMap[index]
        var propertyName = propertyFromDirective(newDirective.controller, newDirective.directive)
        var updatedItem =   {...item, propertyName: propertyName, 
                                    controller: newDirective.controller, 
                                    command: newDirective.directive, 
                                    instance: newDirective.instance, 
                                    value: undefined
                            }
        console.log('updated item', updatedItem)
        updateActivityItem(props.category, props.index, updatedItem)
    }
    
    function defaultOrValue() { 
        var controller = item.controller
        if (!controller) { return null }

        console.log('cont', controller, item)
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

    const selections = directiveMap.map( (item,index) => { return { value: item.directive + ( item.instance ? "/"+item.instance : ""), label: getLabel(item), instance: item.instance }})
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
