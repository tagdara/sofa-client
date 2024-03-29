import { endpointByEndpointId }  from 'endpoint-model/discovery'
import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const useDeviceProperties = (endpointId) => {
    
    const device = endpointByEndpointId(endpointId)
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }} 
    const controllerProperties = useDiscoveryStore.getState().controllerProperties

    const getCapabilityPropertyMap = capability => {
        const controllerPropertyNames = controllerProperties.hasOwnProperty(capability.interface) ? Object.keys(controllerProperties[capability.interface]) : []
        const controllerPropertyMap = controllerPropertyNames.map( item => ({ instance: capability.instance, controller: capability.interface, property: item }) )
        return controllerPropertyMap
    }

    const getEventSourceMap = capability => {
        const eventSourceNames = eventSources.hasOwnProperty(capability.interface) ? Object.keys(eventSources[capability.interface]) : []
        const eventSourceMap = eventSourceNames.map( item => ({ instance: capability.instance, controller: capability.interface, property: item }) )
        return eventSourceMap
    }

    const mapCapability = capability => {
        return [...getCapabilityPropertyMap(capability), ...getEventSourceMap(capability)]
    }

    const getLabel = item => {
        if (!item) { return undefined }
        if (item.instance) {
            return item.instance+"  ("+item.property+")"
        } else {
            return item.property
        }
    }

    const controllerPropertyMaps = device && device.capabilities ? device.capabilities.map( item => mapCapability(item)) : []
    const propertyMap = controllerPropertyMaps.reduce(
        function (result, item) {
            return [...result, ...item]
        }, []
    )

    const selections = propertyMap.map( (item,index) => { return { value: index.toString(), label: getLabel(item) }})

    const getSelectionLabel = selection => {
        const x =  getLabel(propertyMap[parseInt(selection)])
        return x
    }

    const getDefaultOrValue = item => { 
        // Returns the stringified index of the property index for use with Mantine Select
        
        for (var j = 0; j < propertyMap.length; j++) {
            if (    (propertyMap[j].instance === item.instance) && 
                    (propertyMap[j].controller === item.controller) && 
                    (propertyMap[j].property === item.propertyName || item.value?.[propertyMap[j].property])
            ) {
                return j.toString()
            }
        }
        console.log('did not find', item,'in', propertyMap)
        return null
    }


    return { propertyMap, selections, getDefaultOrValue, getSelectionLabel }
}

export default useDeviceProperties