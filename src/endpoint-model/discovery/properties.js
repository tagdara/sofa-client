import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const mapDeviceProperties = dev => {
    
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }} 

    var devprops=[]     
    if (dev===undefined) { return undefined }

    const controllerProperties = useDiscoveryStore.getState().controllerProperties
     
    for (var j = 0; j < dev.capabilities.length; j++) {
        if (controllerProperties[dev.capabilities[j].interface] !== undefined ) {
            var cp = Object.keys(controllerProperties[dev.capabilities[j].interface])
            for (var k = 0; k < cp.length; k++) {
                devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface, 'property': cp[k]})
            }
        }
        if (eventSources.hasOwnProperty(dev.capabilities[j].interface)) {
            var ep=Object.keys(eventSources[dev.capabilities[j].interface])
            for (var l = 0; l < ep.length; l++) {
                devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface, 'property': ep[l]})
            }
        }
    }
    
    return devprops
}  