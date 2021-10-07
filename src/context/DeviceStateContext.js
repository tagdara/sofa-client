import React, { useContext, useState, useEffect, createContext, useReducer } from 'react';
import { NetworkContext } from 'network/NetworkProvider';
import { DeviceContext } from './DeviceContext';

export const DeviceStateContext = createContext();

function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('deviceStates'))
    }
    catch {}
    return {}
    
}

export const deviceStatesReducer = (state, data) => {

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
        updatedDevice = { ...updatedDevice, last_update: date.toISOString() }
        return updatedDevice
    }

    function markUnreachable(device) {
        var updatedDevice = {...device}
        if (updatedDevice.hasOwnProperty('EndpointHealth')) {
            console.log('Marking device as unreachable', updatedDevice)
            updatedDevice = { ...updatedDevice, EndpointHealth: { "connectivity": { "value": { "value" : "UNREACHABLE" } }}}
            updatedDevice = { ...updatedDevice, last_update: date.toISOString() }
        }
        return updatedDevice       
    }

    function handleErrorResponse(endpointId, reason, deviceStates) {
        var updatedDeviceStates = {...deviceStates}
        if (deviceStates.hasOwnProperty(endpointId)) {
            if (reason === 'BRIDGE_UNREACHABLE') {
                updatedDeviceStates = {...updatedDeviceStates, [endpointId]: markUnreachable(updatedDeviceStates[endpointId])}
            }
            
            if (reason === 'NO_SUCH_ENDPOINT') {
                console.log('Removing NO_SUCH_ENDPOINT device', endpointId)
                delete updatedDeviceStates[endpointId]
            }      
        }
        return updatedDeviceStates
    }

    try {
        var reportType = data.event.header.name
    }
    catch {
        console.log('invalid report - no header name:', data)
        return state
    }

    var date = new Date();
    var deviceStates = { ...state }
    var endpointId = undefined

    switch (reportType) {
        case "StateReport":
        case "Response":
        case "ChangeReport":
            endpointId = data.event.endpoint.endpointId
            if (endpointId in deviceStates) {
                deviceStates = {...deviceStates, [endpointId] : handleReportProperties(deviceStates[endpointId], data) }
            }
            localStorage.setItem('deviceStates', JSON.stringify(deviceStates));
            localStorage.setItem('last_update', date.toISOString())
            return deviceStates;

        case 'ActivationStarted':
            console.log('ActivationStarted', data)
            return deviceStates;

        case "ErrorResponse":
            endpointId = data.event.endpoint.endpointId
            deviceStates = handleErrorResponse(endpointId, data.event.payload.type, deviceStates)
            localStorage.setItem('deviceStates', JSON.stringify(deviceStates));
            localStorage.setItem('last_update', date.toISOString())
            return deviceStates;

        case 'DeleteReport':
            for (var i = 0; i < data.event.payload.endpoints.length; i++) {
                endpointId = data.event.endpoint.endpointId
                if (endpointId in deviceStates) {
                    console.log('XXX DELETEREPORT - REMOVING DEVICESTATE', endpointId)
                    delete deviceStates[endpointId]
                }
            }
            localStorage.setItem('deviceStates', JSON.stringify(deviceStates));
            localStorage.setItem('last_update', date.toISOString())
            return deviceStates

        case "multiple StateReports":
            if (data.data) {
                for (var x = 0; x < data.data.length; x++) {
                    var deviceItem = data.data[x]
                    endpointId = deviceItem.event.endpoint.endpointId
                    if (deviceItem.event.header.name === 'ErrorResponse') {
                        deviceStates = handleErrorResponse(endpointId, deviceItem.event.payload.type, deviceStates)
                    } else {
                        deviceStates = {...deviceStates, [endpointId] : handleReportProperties(deviceStates[endpointId], deviceItem) }
                    }
                }
                localStorage.setItem('deviceStates', JSON.stringify(deviceStates));
                localStorage.setItem('last_update', date.toISOString())
            }
            return deviceStates;

        default:
            return deviceStates;
    }
}


export default function DeviceStateProvider(props) {

    
    const { registerEndpointIds, registeredDevices, getEndpointIdsByFriendlyName, unregisterDevices, devices, getEndpointIdsByCategory, getSceneDetails, 
            saveSceneDetails, deviceByEndpointId, devicesByCategory, devicesByFriendlyName, devicesByController, deviceByFriendlyName, 
            deviceDirective, virtualDevices, isModeNonControllable, getModes } = useContext(DeviceContext);
    
    const { postJSON, addSubscriber } = useContext(NetworkContext);

    const initialDeviceStates=getFromLocalStorage();
    //const [virtualDeviceStates, setVirtualDeviceStates] = useState({});     
    const [area, setArea] = useState("Main");     
    const [deviceStates, deviceStatesDispatch] = useReducer(deviceStatesReducer, initialDeviceStates);
    const [defaultPlayer, setDefaultPlayer] = useState('sonos:player:RINCON_B8E937ECE1F001400');     
    const [userPlayer, setUserPlayer] = useState('');     
    const [lastDevices, setLastDevices] = useState([])
    
    useEffect(() => {
    
        addSubscriber(deviceStatesDispatch)
    // eslint-disable-next-line 
    }, []);

    useEffect(() => { 

        function newDevices() {
            
            var newDevs=[]
            for (var item in registeredDevices) {
                if (!lastDevices.includes(item)) {
                    newDevs.push(item)
                }
            }
            return newDevs
        }
        
        function removedDevices() {
            
            var removeDevs=[]
            for (var j = 0; j < lastDevices.length; j++) {
                if (!Object.keys(registeredDevices).includes(lastDevices[j])) {
                    removeDevs.push(lastDevices[j])
                }
            }
            return removeDevs
        }
        
        //console.log('reg dev trigger', registeredDevices)
        if (newDevices().length || removedDevices().length) {
            //console.log('registering devices', {"add":newDevices(), "remove": removedDevices() })
            postJSON('register_devices', {"add":newDevices(), "remove": removedDevices() })
            //postJSON('register_devices', Object.keys(registeredDevices))
                .then(res=> { deviceStatesDispatch({ "event": {"header": {"name": "multiple StateReports"}}, "data": res }) } )
            setLastDevices(Object.keys(registeredDevices))
        }
    // eslint-disable-next-line 
    }, [registeredDevices])


    function deviceState(endpointId) {
        
        // This attempts to fill in the various controllers for a device that might not have state provided yet.
        // by applying unreachable to the endpoint controller, cards can check for health before displaying data
        // otherwise all controllers are available but produce undefined for any request.
        
        // without this shim, a lot of javascript errors with nested dot notation can occur due to data delays
        // cards should generally use deviceState(endpointId) instead of deviceStates[endpointId]
        
        // TODO/CHEESE - this should be the underlying basis for other state collectors but needs to ask for data
        // when it is determined not to exist
        
        var pdev={}
        var dev=deviceByEndpointId(endpointId)
        if (dev) {
            if (deviceStates && deviceStates.hasOwnProperty(endpointId)) {
                pdev={...deviceStates[endpointId]}
            }
            for (var j = 0; j < dev.capabilities.length; j++) {

                var cap=dev.capabilities[j]
                if (cap.interface.indexOf('.') <0) { continue }
                if (!cap.hasOwnProperty('properties')) { continue }
                if (!pdev.hasOwnProperty(cap.interface.split('.')[1])) {
                    pdev[cap.interface.split('.')[1]]={}
                    if (!cap.properties.hasOwnProperty('supported')) { continue }
                    for (var k = 0; k < cap.properties.supported.length; k++) {
                        if (cap.interface.split('.')[1]==='EndpointHealth' && cap.properties.supported[k].name==="connectivity") {
                            pdev[cap.interface.split('.')[1]][cap.properties.supported[k]]={"value": 'UNREACHABLE', "deepvalue": 'UNREACHABLE', "timeOfSampleValue": undefined } // TODO/CHEESE use now
                        } else {
                            pdev[cap.interface.split('.')[1]][cap.properties.supported[k].name]={ "value": undefined, "timeOfSampleValue": undefined}
                        }
                    }
                }
            }
        }
        return pdev
    }



    function cardReady(cardname, skips=[]) {
        var foundAny=false
        var removes=[]
        var fail=false
        
        for (var id in registeredDevices) { 
            //console.log('checking', registeredDevices[id].includes(cardname), id, registeredDevices[id])
            if (skips.indexOf(id)<0 && registeredDevices[id].includes(cardname)) {
                if (!deviceByEndpointId(id)) {
                    removes.push(id)
                    continue
                }
                //console.log('relevant', cardname, registeredDevices[id] )
                if (!deviceStates || !deviceStates.hasOwnProperty(id) || deviceStates[id]===undefined) {
                    //console.log(cardname, 'ready failed on', id)
                    fail=true
                }
                foundAny=true
            }
        }
        if (removes.length>0) {
            for (var j = 0; j < removes.length; j++) {
                delete registeredDevices[id]
            }
        }
        if (fail) { return false }
        return foundAny
    }

    function cardDevices(cardname) {
        var found=[]
        //console.log('registered', registeredDevices)
        for (var id in registeredDevices) { 
            //console.log('checking', registeredDevices[id].includes(cardname), id, registeredDevices[id])
            if (registeredDevices[id].includes(cardname)) {
                found.push(id)
            }
        }
        return found
    }


    function isReachable(dev) {
        if (typeof(dev)=='string') {
            dev=deviceStates[dev]
        }      
        if (dev.EndpointHealth.connectivity.value.value==='OK') {
            return true
        }
        return false
    }
    

    
    function lightCount(condition, source) {
        var count=0;
        //var lights=deviceStatesByCategory('LIGHT', source)
        var lights=getEndpointIdsByCategory('LIGHT', source)
        
        for (var id in lights) {
            try {
                var light=deviceStates[id]
                if (condition.toLowerCase()==='all') {
                    count=count+1
                } else if (condition.toLowerCase()==='off') {
                    if (light.PowerController.powerState.value==='OFF' || !isReachable(light)) {
                        count=count+1
                    }
                } else if (condition.toLowerCase()==='on') {
                    if (light.PowerController.powerState.value==='ON' && isReachable(light)) {
                        count=count+1
                    }
                }
            }
            catch {
                //console.log('error - light not ready', id, lights[id])
            }
        }
        return count
    }    
    
    function deviceStatesByCategory(categories, searchterm) {

        //console.log('XXXXXXXXXXXXXXXXXXXXX DP')
        var categoryDevices=devicesByCategory(categories,searchterm)
        
        categoryDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        
        return getStatesForDevices(categoryDevices)
    }

    function getStatesForDevices(devices) {
        var newdevs=[]
        for (var i = 0; i < devices.length; i++) {
            var gs=getStateForDevice(devices[i])
            if (gs!==undefined) {
                gs.endpointId=devices[i].endpointId
                newdevs.push(gs)
            }
        }
        return newdevs
    }


    function getStateForDevice(device, registerSource) {
        
        var dev=undefined
        if (device===undefined) { return undefined }
        if (deviceStates===null) { return undefined }
        if (deviceStates.hasOwnProperty(device.endpointId)) {
            dev={...device, ...deviceStates[device.endpointId]}
        }

        return dev
    }


    function deviceStateByFriendlyName(subname, registerSource) {
        
        var categoryDevice=deviceByFriendlyName(subname)
        return getStateForDevice(categoryDevice, registerSource)
    }


    function deviceStatesByFriendlyName(subname, sort, category) {

        var categoryDevices=devicesByFriendlyName(subname, sort, category)
        return getStatesForDevices(categoryDevices)
    }

    function deviceStatesByController(controllers, searchterm) {
        
        var categoryDevices=devicesByController(controllers, searchterm)
        categoryDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        
        return getStatesForDevices(categoryDevices)
    }
    
    function sortByName(devlist) {
        devlist.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return devlist
    }

    function deviceStateByEndpointId(endpointId, registerSource) {

        var dev=deviceByEndpointId(endpointId)
        if (dev!==undefined) {
            return getStateForDevice(dev, registerSource)
        }
        //console.log('Did not find device with endpointId', endpointId, Object.keys(deviceStates))
        return undefined
    }

    function modeDisplayName(dev, instance, value) {
        
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance===instance) {
                try {
                    for (var j = 0; j < dev.capabilities[k].configuration.supportedModes.length; j++) {
                        if (dev.capabilities[k].configuration.supportedModes[j].value===value) {
                            return dev.capabilities[k].configuration.supportedModes[j].modeResources.friendlyNames[0].value.text
                        }
                    }
                }
                catch { console.log('could not get display value for', value) }
            }
        }
        return value
    }

    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance="") {
        return deviceDirective(endpointId, controllerName, command, payload, cookie, instance)
            .then(result=> { deviceStatesDispatch(result); return result; })
    }

    return (
        <DeviceStateContext.Provider
            value={{
                devices: devices,
                deviceStates: deviceStates,
                virtualDevices: virtualDevices,
                deviceByEndpointId: deviceByEndpointId,
                deviceStateByEndpointId: deviceStateByEndpointId,
                deviceStateByFriendlyName: deviceStateByFriendlyName,
                deviceStatesByFriendlyName: deviceStatesByFriendlyName,

                deviceStatesByCategory: deviceStatesByCategory,
                deviceStatesByController: deviceStatesByController,
                isReachable: isReachable,
                sortByName: sortByName,

                setArea: setArea,
                area: area,
                lightCount: lightCount,
                
                defaultPlayer: defaultPlayer,
                setDefaultPlayer: setDefaultPlayer,
                userPlayer: userPlayer,
                setUserPlayer: setUserPlayer,
                
                getModes: getModes,
                directive: directive,
                
                getSceneDetails: getSceneDetails,
                saveSceneDetails: saveSceneDetails,
                unregisterDevices: unregisterDevices,
                getEndpointIdsByCategory: getEndpointIdsByCategory,
                getEndpointIdsByFriendlyName: getEndpointIdsByFriendlyName,
                registerEndpointIds: registerEndpointIds,
                registeredDevices: registeredDevices,
                cardReady:cardReady,
                cardDevices: cardDevices,
                deviceState: deviceState,
                modeDisplayName: modeDisplayName,
                isModeNonControllable:isModeNonControllable,
            }}
        >
            {props.children}
        </DeviceStateContext.Provider>
    );
}
