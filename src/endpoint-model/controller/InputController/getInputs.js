import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const getInputs = ( endpointId, exclude=[] ) => {
    var dev = useDiscoveryStore.getState().devices[endpointId]
    console.log('dev get inputs', dev)
    var choices = []        
    if (dev && dev.hasOwnProperty('capabilities')) {
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].interface.endsWith('InputController')) {
                if (dev.capabilities[k].inputs) {
                    for (var j = 0; j < dev.capabilities[k].inputs.length; j++) {
                        choices.push(dev.capabilities[k].inputs[j].name)
                    }
                }
            }
        }
    } else {
        console.log('No inputs for ', dev)
    }
    return choices
}