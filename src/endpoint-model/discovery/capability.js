import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'

export function hasCapability(endpointId, controller, instance) {
    var device = useDiscoveryStore.getState().devices[endpointId]
    if (!device) { return false }
    var result = device.capabilities.filter(cap => cap.interface.endsWith(controller))
    if (instance) {
        result = result.filter(cap => (cap.instance && cap.instance.endsWith(instance)))
    }
    return result.length > 0
}
