import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';
import { DeviceContext } from './DeviceProvider';

export const DataContext = createContext();

function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('deviceStates'))
    }
    catch {}
    return {}
    
}

function writeCookie(key, value, days) {
    var date = new Date();
    // Default at 365 days.
    days = days || 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    return value;
};

export const deviceStatesReducer = (state, data) => {

        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
        
        var i=0;
        var devs={...state}
        var prop='';
        var interfacename=""
        var dev={}
        //console.log('YY', data.event.header.name, data)
        var date = new Date();
        writeCookie("last_update", date.toISOString(), 1)
        switch (data.event.header.name) {
            case "Multistate":

                for (dev in data.state) {
                    
                    var newdev={}
                    if (devs.hasOwnProperty(dev)) {
                        newdev={...devs[dev]}
                    }
                    
                    try {
                        if (data.state[dev] && data.state[dev].event.header.name==='ErrorResponse') {
                            console.log('data',data.state[dev])
                            console.log('error', data.state[dev].event.endpoint.endpointId, data.state[dev].event.payload.type, data.state[dev].event.payload.message)
                            continue
                        }
                    }
                    catch {
                        console.log('could not check for error', data.state[dev])
                    }
                    
                    if (!data.state[dev].hasOwnProperty("context")) { 
                        console.log('!! no context in',data.state[dev])
                        continue
                    }
                    
                    for (i = 0; i < data.state[dev].context.properties.length; i++) {
                        prop=data.state[dev].context.properties[i]
                        interfacename=prop.namespace.split('.')[1]

                        if (prop.hasOwnProperty('instance') && prop.instance!=="") {
                            interfacename=prop.instance.split('.')[1]
                        }
                        if (!newdev.hasOwnProperty(interfacename)) {
                            newdev[interfacename]={}
                        }
                        
                        try {
                            if (prop['value'].hasOwnProperty('value')) {
                                prop['deepvalue']=prop.value.value
                            } else {
                                prop['deepvalue']=prop.value
                            }
                        } 
                        catch {
                            prop['deepvalue']=prop.value
                        }

                        newdev={...newdev, [interfacename] : { ...newdev[interfacename], [prop.name] : { "value": prop['value'], "deepvalue": prop['deepvalue'], "timeOfSample" : prop['timeOfSample'] } } }

                    }
                    devs={...devs, [dev] : newdev }
                }               
                //localStorage.setItem('deviceStates', JSON.stringify(devs));
                return devs;

            case "ErrorResponse":
                console.log(data.event.payload.type)
                dev=data.event.endpoint.endpointId
                newdev={}
                if (devs.hasOwnProperty(dev)) {
                    newdev={...devs[dev]}

                    if (data.event.payload.type==='BRIDGE_UNREACHABLE') {
                        if (newdev.hasOwnProperty('EndpointHealth')) {
                            console.log('Marking device as unreachable', dev)
                            newdev.EndpointHealth={ "connectivity": { "value": { "value" : "UNREACHABLE" } }}
                            devs={...devs, [dev] : newdev }
                        }
                    }
                    
                    if (data.event.payload.type==='NO_SUCH_ENDPOINT') {
                        console.log('Removing NO_SUCH_ENDPOINT device', dev)
                        delete devs[dev]
                    }      

                    localStorage.setItem('deviceStates', JSON.stringify(devs));
                }

                return devs;

            case "multiple StateReports":
            
                if (data.data) {
                    //console.log('multiple statereports',data.data.length)
                    for (var x = 0; x < data.data.length; x++) {
                        var item=data.data[x]
                        try {
                            if (item.event.endpoint.endpointId==='pc1:pc:pc1') {
                               console.log('Statereport', item)
                            }
                        }
    
                        catch {
                            console.log('multi-statereport item', item)
                        }
                        
                        if (item.event===undefined) { continue } 
                        
                        dev=item.event.endpoint.endpointId
                        newdev={}
                        if (devs.hasOwnProperty(dev)) {
                            newdev={...devs[dev]}
                        }
                        if (!item.hasOwnProperty('context')) {
                            if (item.event.header.name==='ErrorResponse') {
                                console.log(item.event.payload.type)
                                
                                if (item.event.payload.type==='BRIDGE_UNREACHABLE') {
                                    if (newdev.hasOwnProperty('EndpointHealth')) {
                                        console.log('Marking device as unreachable', dev)
                                        newdev.EndpointHealth={ "connectivity": { "value": { "value" : "UNREACHABLE" } }}
                                    }
                                }
                                
                                if (item.event.payload.type==='NO_SUCH_ENDPOINT') {
                                    console.log('Removing NO_SUCH_ENDPOINT device', dev)
                                    delete devs[dev]
                                    continue
                                }
                            } else {
                                console.log('no context data for', item.event.endpoint.endpointId, item )
                                continue
                            }
                        } else {
                            for (i = 0; i < item.context.properties.length; i++) {
                                prop=item.context.properties[i]
                                interfacename=prop.namespace.split('.')[1]
            
                                if (prop.hasOwnProperty('instance') && prop.instance!=="") {
                                    interfacename=prop.instance.split('.')[1]
                                }
                                if (!newdev.hasOwnProperty(interfacename)) {
                                    newdev[interfacename]={}
                                }
                                    
                                try {
                                    if (prop['value'].hasOwnProperty('value')) {
                                        prop['deepvalue']=prop.value.value
                                    } else {
                                        prop['deepvalue']=prop.value
                                    }
                                } 
                                
                                catch {
                                    prop['deepvalue']=prop.value
                                }
            
                                newdev={...newdev, [interfacename] : { ...newdev[interfacename], [prop.name] : { "value": prop['value'], "deepvalue": prop['deepvalue'], "timeOfSample" : prop['timeOfSample'] } } }
            
                            }
                        }
                        devs={...devs, [dev] : newdev }
                    }
                    localStorage.setItem('deviceStates', JSON.stringify(devs));
                }
                return devs;
                
            case "StateReport":
                //console.log('Statereport', data.event.header.name, data.event.endpoint.endpointId, data.event )
                if (!data.hasOwnProperty('context')) {
                    console.log('no context data for', data.event.endpoint.endpointId )
                    return state;
                }
                dev=data.event.endpoint.endpointId
                newdev={}
                if (devs.hasOwnProperty(dev)) {
                    newdev={...devs[dev]}
                }

                for (i = 0; i < data.context.properties.length; i++) {
                        prop=data.context.properties[i]
                        interfacename=prop.namespace.split('.')[1]

                        if (prop.hasOwnProperty('instance') && prop.instance!=="") {
                            interfacename=prop.instance.split('.')[1]
                        }
                        if (!newdev.hasOwnProperty(interfacename)) {
                            newdev[interfacename]={}
                        }
                        
                        try {
                            if (prop['value'].hasOwnProperty('value')) {
                                prop['deepvalue']=prop.value.value
                            } else {
                                prop['deepvalue']=prop.value
                            }
                        } 
                        catch {
                            prop['deepvalue']=prop.value
                        }

                        newdev={...newdev, [interfacename] : { ...newdev[interfacename], [prop.name] : { "value": prop['value'], "deepvalue": prop['deepvalue'], "timeOfSample" : prop['timeOfSample'] } } }

                    }
                    devs={...devs, [dev] : newdev }
                localStorage.setItem('deviceStates', JSON.stringify(devs));
                return devs;

            case 'ChangeReport':

                if (data.event.endpoint.endpointId in devs) {
                    var pname=""
                    var devif={}
                    var epid=data.event.endpoint.endpointId
                    dev={...devs[data.event.endpoint.endpointId]}
                    for (i = 0; i < data.event.payload.change.properties.length; i++) {
                        prop=data.event.payload.change.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        //console.log('change interface', prop.namespace, interfacename)
                        if (prop.hasOwnProperty('instance') && prop.instance!=="") {
                            interfacename=prop.instance.split('.')[1]
                        }
                        pname=prop['name']
                        devif={...dev[interfacename]}
                        try {
                            if (prop['value'] && prop['value'].hasOwnProperty('value')) {
                                prop['deepvalue']=prop.value.value
                            } else {
                                prop['deepvalue']=prop.value
                            }
                        } 
                        catch {
                            prop['deepvalue']=prop.value
                        }

                        dev={...dev, [interfacename]: { ...devif, [pname] : { ...devif[pname], 'value': prop['value'], "deepvalue": prop['deepvalue'], 'timeOfSample': prop['timeOfSample'] }}}
                    }
                    for (i = 0; i < data.context.properties.length; i++) {
                        prop=data.context.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        if (prop.hasOwnProperty('instance') && prop.instance!=="") {
                            interfacename=prop.instance.split('.')[1]
                        }
                        
                        pname=prop['name']
                        devif={...dev[interfacename]}
                        try {
                            if (prop['value'] && prop['value'].hasOwnProperty('value')) {
                                prop['deepvalue']=prop.value.value
                            } else {
                                prop['deepvalue']=prop.value
                            }
                        } 
                        catch {
                            prop['deepvalue']=prop.value
                        }

                        dev={...dev, [interfacename] : {...devif, [pname] : { ...devif[pname], 'value': prop['value'], "deepvalue": prop['deepvalue'], 'timeOfSample': prop['timeOfSample'] }}}
                    }
                    //console.log('result',data.event.endpoint.endpointId, epid, dev)
                    return {...devs, [epid]: dev };
                }
                localStorage.setItem('deviceStates', JSON.stringify(state));
                return state
            default:
                return state
        }
    }


export default function DataProvider(props) {

    
    const { registerEndpointIds, registeredDevices, getEndpointIdsByFriendlyName, unregisterDevices, devices, getEndpointIdsByCategory, getSceneDetails, 
            saveSceneDetails, deviceByEndpointId, devicesByCategory, devicesByFriendlyName, devicesByController, deviceByFriendlyName, 
            directive, virtualDevices, isModeNonControllable, getModes } = useContext(DeviceContext);
    
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
            console.log('registering devices', {"add":newDevices(), "remove": removedDevices() })
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
            if (deviceStates.hasOwnProperty(endpointId)) {
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
        
        //console.log('cardready',cardname,registeredDevices)

        for (var id in registeredDevices) { 
            //console.log('checking', registeredDevices[id].includes(cardname), id, registeredDevices[id])
            if (skips.indexOf(id)<0 && registeredDevices[id].includes(cardname)) {
                if (!deviceByEndpointId(id)) {
                    removes.push(id)
                    continue
                }
                //console.log('relevant', cardname, registeredDevices[id] )
                if (!deviceStates || !deviceStates.hasOwnProperty(id) || deviceStates[id]===undefined) {
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

    return (
        <DataContext.Provider
            value={{
                devices: devices,
                deviceStates: deviceStates,
                virtualDevices: virtualDevices,

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
        </DataContext.Provider>
    );
}
