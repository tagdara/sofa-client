import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export function hasDisplayCategory(endpointId, category) {
    var device = useDiscoveryStore.getState().devices[endpointId]
    if (!device) { return false}
    return device.displayCategories.includes( category.toUpperCase() )
}

export function endpointIdsByDisplayCategory(category, filter) {
    var devices = useDiscoveryStore.getState().devices  
    var endpointIds = []

    for (var id in devices) {
        if (!category || devices[id].displayCategories.includes(category)) {
            if (!filter || devices[id].friendlyName.toLowerCase().includes(filter.toLowerCase())) {
                endpointIds.push(devices[id].endpointId)
            }
        } 
    }
    return endpointIds
}

var camelSentence = (str) => {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

export function categoryLabelByEndpointId(endpointId) {
    const device = useDiscoveryStore.getState().devices[endpointId]
    return camelSentence(device.displayCategories[0])
}
