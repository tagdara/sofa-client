import useDiscoveryStore from "endpoint-model/discovery/discoveryStore"
import useEndpointStateStore from "endpoint-model/state/endpointStateStore"

export const storeUpdater = (data) => {
    updatediscoveryStore(data)
}

// https://stackoverflow.com/questions/61770481/removing-multiple-properties-from-an-object-without-mutation
const without = (object, keys) => {
    return keys.reduce((o, k) => { const { [k]: _ , ...p } = o; return p; }, object)
}


function computeChanges(changeProperties, current) {
    return changeProperties.reduce( (allChanges, change) => {
        allChanges[change.instance || change.namespace] = allChanges?.[change.instance || change.namespace] || {}
        allChanges[change.instance || change.namespace][change.name] = { "value": change.value }
        return allChanges
    }, current)    
}


function handleReportProperties(device, data) {

    var updatedDevice = {}

    if (device) {
        updatedDevice = { ...device }
    }

    try {
        const contextProperties = computeChanges(data.context?.properties || [], updatedDevice)
        updatedDevice = computeChanges(data.event?.payload?.change?.properties || [], contextProperties)

        // CameraStreamController is weird
        if (data.payload && data.payload?.imageUri) {
            updatedDevice = { ...updatedDevice, CameraStreamController: data.payload }
        }

        var date = new Date();
        updatedDevice = { ...updatedDevice, last_update: date.toISOString()}
    }
    catch(err) {
        console.log('!! Error updating device from report properties', err)
    }
    return updatedDevice
}

const markUnreachable = ( deviceState ) => {
    return { ...deviceState, EndpointHealth: { "connectivity": { "value": { "value" : "UNREACHABLE" } }}}
}

const updatediscoveryStore = (data, defer=false) => {
    
    try {
        var date = new Date();
        if (data==={}) { return }
        if (!data.hasOwnProperty('event')) { return }
        var endpointId = undefined
        if (data.event.endpoint && data.event.endpoint.endpointId) {
            endpointId = data.event.endpoint.endpointId
        }

        switch (data.event.header.name) {
            case 'DeleteReport':
                var devices = useDiscoveryStore.getState().devices
                var ids = data.event.payload.endpoints.map(item => item.endpointId)
                console.log('DeleteReport', ids, data.event.payload.endpoints)
                var deviceResult = without(devices, ids);
                console.log('Without', deviceResult )
                useDiscoveryStore.setState({ devices: deviceResult, last_update: date.toISOString() })

                var deviceStates = useEndpointStateStore.getState().deviceStates
                var stateResult = without(deviceStates, ids);
                useEndpointStateStore.setState({ deviceStates: stateResult, last_update: date.toISOString() })
                break;
            case 'Discover.Response':
                var discoveredDevices = data.event.payload.endpoints.reduce((items, endpoint) => ({ ...items, [endpoint.endpointId]: endpoint }), {})
                useDiscoveryStore.setState({ devices: discoveredDevices, last_update: date.toISOString() })
                break;
            case 'AddOrUpdateReport':
                var oldDevices = useDiscoveryStore.getState().devices
                var addDevices = data.event.payload.endpoints.reduce((items, endpoint) => ({ ...items, [endpoint.endpointId]: endpoint }), {})
                useDiscoveryStore.setState({ devices: {...oldDevices, ...addDevices }, last_update: date.toISOString() })
                break;
            case "StateReport":
            case "Response":
            case "ChangeReport":
                var oldDeviceStates = useEndpointStateStore.getState().deviceStates
                var changes = handleReportProperties(oldDeviceStates[endpointId], data)
                if (defer) { return { [endpointId] :  changes } }
                useEndpointStateStore.setState({ deviceStates: {...oldDeviceStates, [endpointId]: changes }, last_update: date.toISOString() })
                break
            case 'ActivationStarted':
                console.log('ActivationStarted', data)
                break
            case "ErrorResponse":
                if (data.event.payload.type === 'BRIDGE_UNREACHABLE' || data.event.payload.type === 'ENDPOINT_UNREACHABLE') {
                    console.log('.. unreachable device', endpointId, data.event.payload.type)
                    var errDeviceStates = useEndpointStateStore.getState().deviceStates
                    if (errDeviceStates.hasOwnProperty(endpointId)) {
                        var errorDevice = useDiscoveryStore.getState().devices[endpointId]
                        if (errorDevice) {
                            useEndpointStateStore.setState({ errDeviceStates: { [endpointId]: markUnreachable(errorDevice) }, last_update: date.toISOString() })
                        }
                    }
                }
                if (data.event.payload.type === 'NO_SUCH_ENDPOINT') {
                    const { [endpointId]: remove, ...rest } = useDiscoveryStore.getState().devices
                    console.log('Removing NO_SUCH_ENDPOINT device', endpointId)
                    useDiscoveryStore.setState({ devices: rest , last_update: date.toISOString() })   
                }
                break
                
            case "multiple StateReports":
                // This is used to deliver all of the state updates as quickly as possible
                // during startup.  The Alexa spec has no defined mechanism for batching up state reports.

                var oldMultiStates = useEndpointStateStore.getState().deviceStates
                if (data.data) {
                    var result = {}
                    for (var x = 0; x < data.data.length; x++) {
                        result = { ...result, ...updatediscoveryStore(data.data[x], true) }
                    }
                }
                useEndpointStateStore.setState({ deviceStates: {...oldMultiStates, ...result }, last_update: date.toISOString()})
                break
            default:
                console.log('unhandled report name', data.event.header.name)
                break
        }
    }
    catch(e) {
        console.log('error', e)
        console.log('!! Bad data', data)
    }
}


export default storeUpdater