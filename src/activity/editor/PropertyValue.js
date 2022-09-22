import { useState, useEffect } from 'react';
import { propertyFromDirective } from 'store/directive'
import { deviceByEndpointId, getControllerInterface }  from 'store/deviceHelpers'
import { updateActivityItem,  loadPropertyModule, renderSuspensePropertyModule } from 'store/activityEditorHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

export default function PropertyValue(props) {
    
    const [ propertyModule, setPropertyModule ] = useState(undefined)
    const [ propertyModuleName, setPropertyModuleName ] = useState(undefined)
    const item = useActivityEditorStore(state => state.activity[props.category][props.index] )

    useEffect(() => {

        try {
            if (!item) { 
                setPropertyModule(undefined) 
                setPropertyModuleName(undefined)
                return undefined
            }
            var propertyName = item.propertyName

            if (!propertyName) {
                propertyName = propertyFromDirective(item.controller, item.command)
            }
            
            if (propertyName !== propertyModuleName) {
                setPropertyModuleName(propertyName)
                const loadedPropertyModule = loadPropertyModule(propertyName)
                setPropertyModule( loadedPropertyModule )
            }
        }
        catch(e) {
            console.log('error trying to get all the stuff in property value', e)
        }
    // eslint-disable-next-line
    }, [ item ])    

    if (!item) { return null }

    const endpointId = item.endpointId
    const device = endpointId ? deviceByEndpointId(endpointId) : undefined
 
    if ( !device || !propertyModuleName || !item || item.operator ==='Any') { return null }

    const controllerInterface = getControllerInterface(device,item) 

    const conditionPropertyDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {

        if (command === "TurnOn") { payload = { powerState : "ON"} }
        if (command === "TurnOff") { payload = { powerState : "OFF"} }

        const update = {    
            type: item.type,
            endpointId: endpointId, 
            controller: controllerName, 
            instance: instance,
            propertyName: item.propertyName, 
            operator: item.operator, 
            value: payload
        }
        updateActivityItem( props.category, props.index, update)
    }

    const activityPropertyDirective = (endpointId, controllerName, command, payload={}, cookie={}, instance)  => {
        console.log('selected property in editor', endpointId, controllerName, command, payload, cookie, instance)
        const update = {    
            type: item.type,
            endpointId: endpointId, 
            namespace: controllerName,
            instance: instance,
            controller: controllerName, 
            command: command, 
            value: payload
        }
        updateActivityItem(props.category, props.index, update)
    }

    // TODO This is a hack/fix for changing format in the activity files so that value is represented as the actual
    // value and the property is stored separately if needed
    // const itemValue = item.value && item.value.hasOwnProperty(propertyModuleName) ? item.value[propertyModuleName] : item.value
    const itemValue = item.value

    const renderProps = { 
        ...props, 
        item: item, 
        device: device, 
        endpointId: endpointId,
        instance: item.instance, 
        directive: item.type==="property" ? conditionPropertyDirective : activityPropertyDirective, 
        interface: controllerInterface,
        value: itemValue,
        property: propertyModuleName
    }


    return (
        renderSuspensePropertyModule(propertyModuleName, propertyModule, renderProps )
    )
}
