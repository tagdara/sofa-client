import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export const descriptionIncludes = (endpointId, term) => {
    var device = useDiscoveryStore.getState().devices[endpointId]   
    return device.description.toLowerCase().includes(term.toLowerCase())
}