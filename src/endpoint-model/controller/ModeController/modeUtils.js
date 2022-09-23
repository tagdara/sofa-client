import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const getModeControllers = (endpointId) => {

    var dev = endpointId
    var results = []
    if (typeof(dev)=='string') {
        dev = useDiscoveryStore.getState().devices[dev]
    }   

    if (!dev) { return undefined }

    // should use a filter here instead
    for (var k = 0; k < dev.capabilities.length; k++) {
        if (dev.capabilities[k].interface.endsWith('ModeController')) {
            results.push(dev.capabilities[k])
        }
    }
    return results
}


export const getModeControllerFriendlyName = (endpointId, instance) => {

    const modeCapability = getController(endpointId, instance)
    if (!modeCapability) { return {} }
    return modeCapability.capabilityResources.friendlyNames[0].value.text

}


