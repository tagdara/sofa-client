
import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export function endpointByEndpointId(endpointId) {
    return useDiscoveryStore.getState().devices[endpointId]       
}

export function devicesByEndpointIds(endpointIds) {
    var devices = useDiscoveryStore.getState().devices
    var results = {}           
    for (var id in devices) {
        results[id]=devices[id]
    }
    return results
}