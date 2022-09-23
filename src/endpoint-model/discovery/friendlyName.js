import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'


export const friendlyNameByEndpointId = endpointId => {
    var device = useDiscoveryStore.getState().devices[endpointId]  
    if (!device) { return undefined }
    return device.friendlyName
}

export function endpointIdByFriendlyName(devname) {

    if (Array.isArray(devname)) {
        return endpointIdsByFriendlyName(devname)
    }
    
    var devices = useDiscoveryStore.getState().devices           
    for (var id in devices) {
        if (devices[id]['friendlyName']===devname) {
            return devices[id].endpointId
        } 
    }
    return undefined
}

export function endpointIdsByFriendlyName(names) {
    var devices = useDiscoveryStore.getState().devices       
    var result = []    
    for (var id in devices) {
        if (names.includes(devices[id]['friendlyName'])) {
            result.push(id)
        } 
    }
    return result
}


export function sortByName(devlist, exclude=[]) {
    var devices = useDiscoveryStore.getState().devices
    exclude = ['', ...exclude]
    if (devices && exclude && exclude.length>0) {
        devlist = devlist.filter( device => !exclude.includes(devices[device].friendlyName) )
    }
    devlist.sort(function(a, b)  {
        var x = undefined
        var y = undefined
        try {
            if (typeof a === 'string') { 
                x = devices[a].friendlyName.toLowerCase()
            } else {
                x = a.friendlyName.toLowerCase()
            }
            if (typeof b === 'string') { 
                y = devices[b].friendlyName.toLowerCase()
            } else {
                y = b.friendlyName.toLowerCase()
            }
            return x < y ? -1 : x>y ? 1 : 0;
        }
        catch(error) {
            console.log('name sort error on', a, b, error)
        }
        return -1
    });    
    return devlist
}