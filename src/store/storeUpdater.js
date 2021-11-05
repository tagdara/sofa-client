import useDeviceStore from "store/deviceStore"
import useDeviceStateStore from "store/deviceStateStore"

export const storeUpdater = (data) => {
    updateDeviceStore(data)
}

// https://stackoverflow.com/questions/61770481/removing-multiple-properties-from-an-object-without-mutation
const without = (object, keys) => {
    return keys.reduce((o, k) => { const { [k]: _ , ...p } = o; return p; }, object)
}

function getDeepValue(valueProp) {
    try {
        if (valueProp && valueProp.hasOwnProperty('value')) {
            return valueProp.value
        }
        return valueProp
    } 
    catch {
        return valueProp
    }
}

function updateProperty(device, prop) {
    var interfaceName = prop.namespace.split('.')[1]

    if (prop.hasOwnProperty('instance') && prop.instance!=="") {
        interfaceName=prop.instance.split('.')[1]
    }

    var propertyName = prop['name']
    var deviceInterface={...device[interfaceName]}
    
    //var older = deviceInterface[propertyName].timeOfSample > prop.timeOfSample
    // TODO Jukebox especially seemed to have a race between response and changereport so keep an eye on this
    // console.log('samples', propertyName, older, 'old', deviceInterface[propertyName].timeOfSample, 'new',prop.timeOfSample)

    try {
        if (deviceInterface[propertyName].timeOfSample && deviceInterface[propertyName].timeOfSample > prop.timeOfSample) {
            console.log('update refused on timeOfSample check', deviceInterface[propertyName].timeOfSample, prop.timeOfSample)
            return deviceInterface
        }
    }
    catch {}

    var result = {  
                    ...deviceInterface, 
                    [propertyName] : {
                        ...deviceInterface[propertyName], 
                        'value': prop.value, 
                        "deepvalue": getDeepValue(prop.value), 
                        'timeOfSample': prop.timeOfSample
                    }
                }

    return result

}

function getInterfaceName(prop) {
    var interfaceName = prop.namespace.split('.')[1]

    if (prop.hasOwnProperty('instance') && prop.instance!=="") {
        interfaceName=prop.instance.split('.')[1]
    }       
    return interfaceName 
}

function handleReportProperties(device, data) {
    
    var updatedDevice = {}
    if (device) {
        updatedDevice = { ...device }
    }

    try {
        for (var p = 0; p < data.event.payload.change.properties.length; p++) {
            var changeProperty = data.event.payload.change.properties[p]
            var changeInterfaceName = getInterfaceName(changeProperty)
            updatedDevice = { ...updatedDevice, [changeInterfaceName]: updateProperty(updatedDevice, changeProperty) }
        }
    }
    catch(err) {
        
    }

    try {
        for (var c = 0; c < data.context.properties.length; c++) {
            var contextProperty = data.context.properties[c]
            var contextInterfaceName = getInterfaceName(contextProperty)
            updatedDevice = { ...updatedDevice, [contextInterfaceName]: updateProperty(updatedDevice, contextProperty) }
        }
    }
    catch(err) {}

    try {
        if (data.payload && data.payload.imageUri) {
            updatedDevice = { ...updatedDevice, CameraStreamController: data.payload }
        }
    }
    catch(err) {}
    var date = new Date();
    updatedDevice = { ...updatedDevice, last_update: date.toISOString() }
    return updatedDevice
}


const updateDeviceStore = (data, defer=false) => {
    
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
                var devices = useDeviceStore.getState().devices
                var deviceResult = without(devices, data.event.payload.endpoints);
                useDeviceStore.setState({ devices: deviceResult })

                var deviceStates = useDeviceStateStore.getState().deviceStates
                var stateResult = without(deviceStates, data.event.payload.endpoints);
                useDeviceStateStore.setState({ deviceStates: stateResult })

                //localStorage.setItem('devices', JSON.stringify(deviceResult));
                //localStorage.setItem('deviceStates', JSON.stringify(stateResult));
                //localStorage.setItem('last_update', date.toISOString())
                break;
            case 'Discover.Response':
                var discoveredDevices = data.event.payload.endpoints.reduce((items, endpoint) => ({ ...items, [endpoint.endpointId]: endpoint }), {})
                useDeviceStore.setState({ devices: discoveredDevices })
                //localStorage.setItem('devices', JSON.stringify(devices));
                break;
            case 'AddOrUpdateReport':
                var oldDevices = useDeviceStore.getState().devices
                var addDevices = data.event.payload.endpoints.reduce((items, endpoint) => ({ ...items, [endpoint.endpointId]: endpoint }), {})
                useDeviceStore.setState({ devices: {...oldDevices, ...addDevices }})
                //localStorage.setItem('devices', JSON.stringify({...oldDevices, ...devices }));
                break;
            case "StateReport":
            case "Response":
            case "ChangeReport":
                var oldDeviceStates = useDeviceStateStore.getState().deviceStates
                var changes = handleReportProperties(oldDeviceStates[endpointId], data)
                if (defer) {
                    return { [endpointId] :  changes }
                }
                useDeviceStateStore.setState({ deviceStates: {...oldDeviceStates, [endpointId]: changes }})
                localStorage.setItem('deviceStates', JSON.stringify({...oldDeviceStates, [endpointId]: changes }));
                localStorage.setItem('last_update', date.toISOString())
                break
            case 'ActivationStarted':
                console.log('ActivationStarted', data)
                break
            case "ErrorResponse":
                if (deviceStates.hasOwnProperty(endpointId)) {
                    if (data.event.payload.type === 'BRIDGE_UNREACHABLE') {
                        var errorDevice = useDeviceStateStore.getState().devices[endpointId]
                        var updatedDeviceStates = { deviceStates: { [endpointId]: { ...errorDevice, EndpointHealth: { "connectivity": { "value": { "value" : "UNREACHABLE" } }}}}}

                        useDeviceStateStore.setState(updatedDeviceStates)
                        localStorage.setItem('deviceStates', JSON.stringify(updatedDeviceStates));
                    }
                    
                    if (data.event.payload.type === 'NO_SUCH_ENDPOINT') {
                        const { [endpointId]: remove, ...rest } = useDeviceStore.getState().devices
                        console.log('Removing NO_SUCH_ENDPOINT device', endpointId)
                        useDeviceStore.setState({ devices: rest })
                        localStorage.setItem('devices', JSON.stringify(rest));
                    }      
                }

                localStorage.setItem('deviceStates', JSON.stringify(deviceStates));
                localStorage.setItem('last_update', date.toISOString())
                break
            case "multiple StateReports":
                //console.log('multi')
                var oldMultiStates = useDeviceStateStore.getState().deviceStates
                if (data.data) {
                    var result = {}
                    for (var x = 0; x < data.data.length; x++) {
                        result = { ...result, ...updateDeviceStore(data.data[x], true) }
                    }
                }
                useDeviceStateStore.setState({ deviceStates: {...oldMultiStates, ...result }})
                localStorage.setItem('deviceStates', JSON.stringify({...oldMultiStates, ...result }));
                localStorage.setItem('last_update', date.toISOString())

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