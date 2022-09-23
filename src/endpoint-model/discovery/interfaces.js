import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const getControllerInterface = (device, name)  => {
    
    if (typeof device === 'string') { 
        var device = useDiscoveryStore.getState().devices[device]
    }
    if (device===undefined) { return undefined }
    if (!name) { return undefined}

    if (device?.capabilities) {
        for (var j = 0; j < device.capabilities.length; j++) {
            if (device.capabilities[j].instance === name || device.capabilities[j].interface == name) { 
                return device.capabilities[j]
            }               
        }
    }
    console.log('failed get interface', device, name)
    return undefined
}

export const hasInstance = (endpointId, instance) => {
    try {
        var dev = useDiscoveryStore.getState().devices[endpointId]
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance.endsWith(instance)) {
                return true
            }
        }
    }
    catch {
        console.log('error getting instance for', endpointId, instance)
    }
    return false
  
}