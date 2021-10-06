import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from 'network/NetworkProvider';

export const DeviceContext = createContext();


function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('devices'))
    }
    catch {}
    return {}
    
}

    
const deviceReducer = (state, data) => {
    
    try {
        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
            
        var i=0;
        var devs={...state}
        var local={}
        
        switch (data.event.header.name) {
            case 'DeleteReport':
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    if (data.event.payload.endpoints[i].endpointId in devs) {
                        console.log('XXX REMOVING DEVICE', data.event.payload.endpoints[i].endpointId)
                        delete devs[data.event.payload.endpoints[i].endpointId]
                    }
                }
                localStorage.setItem('devices', JSON.stringify(devs));
                return devs
            case 'Discover.Response':
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    local[data.event.payload.endpoints[i].endpointId]=data.event.payload.endpoints[i]
                }
                localStorage.setItem('devices', JSON.stringify(local));
                return local;

            case 'AddOrUpdateReport':
                local={...state}
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    local[data.event.payload.endpoints[i].endpointId]=data.event.payload.endpoints[i]
                }
                localStorage.setItem('devices', JSON.stringify(local));
                return local;
            default:
                return state
        }
    }
    catch {
        console.log('!! Bad data', data)
        return state
    }
}

const registeredDeviceReducer = (state, data) => {

    if (!data) { return state }
    if (!data.hasOwnProperty('action')) { return state }
    if (!data.hasOwnProperty('source')) { return state }
    var regDevices={ ...state }
    
    var newDevices=[]
    var removedDevices=[]
    if (data.action==='add') {
        if (!data.hasOwnProperty('devices')) { return state }
        for (var i = 0; i < data.devices.length; i++) {
            if (!regDevices.hasOwnProperty(data.devices[i])) {
                regDevices[data.devices[i]] = [data.source]
                if (!newDevices.includes(data.devices[i])) {
                    newDevices.push(data.devices[i])
                }
            } else {
                if (!regDevices[data.devices[i]].includes(data.source)) {
                    regDevices[data.devices[i]] = [...state[data.devices[i]], data.source]
                }
            }
        }
    } else if (data.action==='remove') {
        for (var item in regDevices) {
            var index=regDevices[item].indexOf(data.source)
            if (index>-1) {
                regDevices[item].splice(index, 1)
            }
            if (regDevices[item].length===0) {
                removedDevices.push(item)
            }
        }
        for (var k = 0; k < removedDevices.length; k++) {
            delete regDevices[removedDevices[k]]
        }
    }

    if (newDevices.length>0 || removedDevices.length>0) {
        //var changes={"add": newDevices, "remove": removedDevices}
        //console.log('changes',changes)
    }
    return regDevices
        
}

export default function DeviceProvider(props) {
   
    const { getJSON, postJSON, loggedIn, addSubscriber } = useContext(NetworkContext);

    const initialDevices=getFromLocalStorage()
    const [controllerProperties, setControllerProperties] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [area, setArea] = useState("Main");     
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }} 
    const [registeredDevices, registeredDeviceDispatch] = useReducer(registeredDeviceReducer, {});

    
    useEffect(() => {
       addSubscriber(deviceDispatch)
    // eslint-disable-next-line 
    }, [] );

    useEffect(() => {
        
        function getData() {
            //console.log('logged in', loggedIn,'updating static data') 
            getJSON('directives')
                .then(result=>setDirectives(result))
                //.then(result=>console.log('done getting directives'));
    
      	    getJSON('properties')
                .then(result=>setControllerProperties(result))
                //.then(result=>console.log('done getting properties'));
      	    discovery()
                //.then(result=>console.log('done getting properties'));

        }
        console.log('Logged in toggled to ', loggedIn)
        if (loggedIn === true ) { getData() }
    // eslint-disable-next-line 
    }, [ loggedIn ] );

    
    function interfaceDirectives(otherdev) {

        var dev=props.device
        if (otherdev) { dev=otherdev }
        var dirs=[]
        if (dev.hasOwnProperty('capabilities')) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                var shortIf=dev.capabilities[j].interface.split('.')[1]
                if (shortIf==='ModeController') {
                    dirs=dirs.concat('SetMode.'+dev.capabilities[j].instance.split('.')[1])
                } else if (props.directives.hasOwnProperty(shortIf)) {
                    dirs=dirs.concat(Object.keys(props.directives[shortIf]));
                } 
            }
        }
        return dirs
    }   

    function devicesByCategory(categories, searchterm) {

        //console.log('dbc',categories, searchterm)
        if (!categories) {
            categories='ALL'
        }
        if (!Array.isArray(categories)) {
            categories=[categories]
        }
        var categoryDevices=[]
        for (var j = 0; j < categories.length; j++) {
            var category=categories[j]
            for (var id in devices) {
                if (devices[id].displayCategories.includes(category) || category==='ALL') {
                    if (!searchterm || devices[id].friendlyName.toLowerCase().includes(searchterm.toLowerCase())) {
                        categoryDevices.push(devices[id])
                    }
                } 
            }
        }
        categoryDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return categoryDevices
        
    }

    function getEndpointIdsByCategory(categories, source, searchterm, wait ) {
        
        var endpointIds=[]
        var devs=devicesByCategory(categories, searchterm)
        for (var j = 0; j < devs.length; j++) {
            endpointIds.push(devs[j].endpointId)
        }
        //console.log('registering',categories, source, searchterm, wait)
        registeredDeviceDispatch({"source":source, "devices": endpointIds, "action": "add"})
        return endpointIds
    }

    function registerEndpointIds( endpointIds, source ) {
        
        registeredDeviceDispatch({"source":source, "devices": endpointIds, "action": "add"})
        return endpointIds
    }

        
    function unregisterDevices(source) {
        //console.log('unregistering', source)
        registeredDeviceDispatch({"source":source, "action": "remove"})
    }
    
    function cardDeviceCount(source) {
        for (var id in registeredDevices) {
            console.log(id, registeredDevices[id])
        }
    }


    function devicesByFriendlyName(subname, sort=true, category=undefined, exact=true) {

        var subDevices=[]
        if (typeof(subname)==='object') {
            for (var j = 0; j < subname.length; j++) {
                for (var id in devices) {
                    if (subname[j]===devices[id]['friendlyName']) {
                        if (category===undefined || devices[id].displayCategories.includes(category)) {
                            subDevices.push(devices[id])
                            continue
                        }
                    }
                }
            } 
        } else {
            for (var devid in devices) {
                if (exact && devices[devid]['friendlyName']===subname) { 
                    if (category===undefined || devices[devid].displayCategories.includes(category)) {
                        subDevices.push(devices[devid])
                    }
                } else if (!exact && (subname==="" || devices[devid]['friendlyName'].includes(subname))) {
                    if (category===undefined || devices[devid].displayCategories.includes(category)) {
                        subDevices.push(devices[devid])
                    }
                } 
            }
        }

        if (sort) {
            subDevices.sort(function(a, b)  {
    		    var x=a['friendlyName'].toLowerCase(),
    			y=b['friendlyName'].toLowerCase();
    		    return x<y ? -1 : x>y ? 1 : 0;
    	    });    
        }
        return subDevices
    }

    function getEndpointIdsByFriendlyName(name, source, sort=true, category=undefined, exact=true) {
        
        var endpointIds=[]
        var devs=devicesByFriendlyName(name, sort, category, exact)
        for (var j = 0; j < devs.length; j++) {
            endpointIds.push(devs[j].endpointId)
        }
        registeredDeviceDispatch({"source":source, "devices": endpointIds, "action": "add"})
        return endpointIds

    }


    function devicesByController(controllers, searchterm) {

        //console.log('dbc',categories, searchterm)
        if (!controllers) {
            return []
        }
        if (!Array.isArray(controllers)) {
            controllers=[controllers]
        }
        var controllerDevices=[]
        for (var j = 0; j < controllers.length; j++) {
            for (var id in devices) {
                for (var k = 0; k < devices[id].capabilities.length; k++) {
                    if (devices[id].capabilities[k].interface.endsWith(controllers[j])) {
                        if (!searchterm || devices[id].friendlyName.toLowerCase().includes(searchterm.toLowerCase())) {
                            controllerDevices.push(devices[id])
                        }
                    }
                } 
            }
        }
        controllerDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return controllerDevices
        
    }

    function hasCapability(endpointId, controller) {
        var result = devices[endpointId].capabilities.filter(cap => cap.interface.endsWith(controller))
        return result.length > 0
    }

    function hasDisplayCategory(endpointId, category) {
        return devices[endpointId].displayCategories.includes( category.toUpperCase() )
    }    

    function sortByName(devlist) {
        devlist.sort(function(a, b)  {
            var x = undefined
            var y = undefined
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
	    });    
        return devlist
    }

    function deviceByFriendlyName(devname) {
            
        for (var id in devices) {
            if (devices[id]['friendlyName']===devname) {
                return devices[id]
            } 
        }
        return undefined
    }

    function deviceByEndpointId(endpointId) {
        if (endpointId in devices) {
            return devices[endpointId]
        }
        //console.log('Did not find device with endpointId', endpointId, devices.length)
        return undefined
    }
    
    function propertyNamesFromDevice(dev) {
        
        var devprops=[]
        for (var j = 0; j < dev.capabilities.length; j++) {
            devprops.push(dev.capabilities[j].interface)
        }
        return devprops
    }

    function getInputs(dev,exclude=[]) {
        
        if (typeof(dev)=='string') {
            dev=devices[dev]
        }        
        
        var choices=[]        
        if (dev && dev.hasOwnProperty('capabilities')) {
            for (var k = 0; k < dev.capabilities.length; k++) {
                if (dev.capabilities[k].interface.endsWith('InputController')) {
                    for (var j = 0; j < dev.capabilities[k].inputs.length; j++) {
                        choices.push(dev.capabilities[k].inputs[j].name)
                    }
                }
            }
        } else {
            console.log('No inputs for ', dev)
        }
        return choices
    }


    function getModes(dev,exclude=[]) {
        
        if (typeof(dev)=='string') {
            dev=devices[dev]
        }
        
        var modes={}
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].interface.endsWith('ModeController')) {
                var mc=dev.capabilities[k]
                var modename=mc.capabilityResources.friendlyNames[0].value.text
                if (!exclude.includes(modename)) {
                    var modechoices=[]
                    for (var j = 0; j < mc.configuration.supportedModes.length; j++) {
                        modechoices[mc.configuration.supportedModes[j].value] = mc.configuration.supportedModes[j].modeResources.friendlyNames[0].value.text
                    }
                    modes[modename]=modechoices
                }
            }
        }
        return modes
    }
    function checkJSON(data) {
        if (typeof(data)==='string') {
            return JSON.parse(data)
        } else {
            return data
        }
    }
    
    function getRecent(scene) {
        return getJSON('list/hub/recent')
            .then(res=>{ return res;})
    }
     
    function getChangeTimesForDevices(val,devs) {
        
        // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
        // in order to see history.

        //console.log('gctfd',val,devs)
        //var endpointList=[]
        //for (var i = 0; i < devs.length; i++) {   
        //   endpointList.push(devs[i].endpointId)
        //}

        return postJSON('list/influx/last/'+val, devs)
                .then(res=> checkJSON(res))
                .then(res=> { return res;})
    }
    
    function getHistoryForDevice(dev, prop, page) {
        
        // Requests the history for a specific device and property.  It allows for pagination since the data could be very
        // large.  This requires the Influx adapter in order to see history.
        
        var url="list/influx/history/"+dev+"/"+prop
        if (page) {
            url=url+"/"+page
        }
        return getJSON(url)
    }

    function historyQuery(qry) {
        var query={"query":qry}
        // Submits a history query. This requires the Influx adapter in order to see history.
        return postJSON("list/influx/querylist", query)
                            .then(res=>{ return res;})
    }

    function getSceneDetails(scene) {
        return getJSON('list/logic/scene/'+scene)
            .then(res=>{ return res;})
    }
    
    function saveSceneDetails(scene, data) {
        return postJSON('save/logic/scene/'+scene, data)
            .then(res=>{ return res;})
    }


    
    function newtoken() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
        )
    }
    
    function getDefaultCapability(dev) {
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (dev.capabilities[j].interface!=='Alexa') {
                return dev.capabilities[j]
            }
        }
        return undefined
    }

    function getDefaultDirective(cap) {
        var dirs=interfaceDirectives(cap.interface)
        if (dirs.length>0) { return dirs[0] }
        return undefined
    } 
    
    function getController(endpointId, name) {
        
        var dev=deviceByEndpointId(endpointId)
        if (dev!==undefined) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (dev.capabilities[j].interface.endsWith("."+name)) {
                    return dev.capabilities[j]
                }
                if (dev.capabilities[j].hasOwnProperty('instance') && dev.capabilities[j].instance.endsWith("."+name)) {
                    return dev.capabilities[j]
                }
                
            }
        }
        return undefined
    }

    function getDeviceProperties(dev) {
        
        var devprops=[]        
        if (dev) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (dev.capabilities[j].hasOwnProperty('instance')) {
                    devprops=devprops.concat([dev.capabilities[j].instance.split('.')[1]])
                } else if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                    devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
                } else if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                    devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
                }
            }
        }
        return devprops
    }    

    
    function getControllerProperties(endpointId) {
        
        var devprops=[]        
        if (endpointId) {
            var dev=deviceByEndpointId(endpointId)
            if (dev) {
                for (var j = 0; j < dev.capabilities.length; j++) {
                    if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                        devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
                    }
                    if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                        devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
                    }
                }
            }
        }
        return devprops
    }    

    function controllerForProperty(endpointId, controllerProp) {
        
        if (endpointId) {
            var dev=deviceByEndpointId(endpointId)
            for (var es in eventSources) {
                if (eventSources[es].hasOwnProperty(controllerProp)) {
                    return es
                }
            }
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                    if (Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]).includes(controllerProp)) {
                        return dev.capabilities[j].interface.split('.')[1]
                    }
                }
                if (dev.capabilities[j].hasOwnProperty('instance') && dev.capabilities[j].instance.split('.')[1]===controllerProp) {
                    return dev.capabilities[j].interface.split('.')[1]
                }
            }
        }
        return undefined
    }    
    
    function getControllerInterface(device, item) {
        
        if (device===undefined) { return undefined }
        if (device.hasOwnProperty('capabilities')) {
            for (var j = 0; j < device.capabilities.length; j++) {
                if (device.capabilities[j].interface.split('.')[1]===item.controller || device.capabilities[j].interface===item.controller || device.capabilities[j].interface.split('.')[1]===item.controller.split('.')[1]) {
                    if (item.instance===undefined && device.capabilities[j].interface.instance===undefined) {
                        return device.capabilities[j]
                    }
                    if (item.hasOwnProperty('instance') && device.capabilities[j].hasOwnProperty('instance')) {
                        if (item.instance===device.capabilities[j].instance || item.instance===device.capabilities[j].instance.split('.')[1]) {
                            return device.capabilities[j]
                        }
                    }               
                }
            }
        }
        console.log('failed get interface', device, item)
        return undefined
    }
    
    function instanceForProperty(device, name) {
        
        if (name===undefined) { return undefined }
        if (device.hasOwnProperty('capabilities')) {
            for (var j = 0; j < device.capabilities.length; j++) {
                if (device.capabilities[j].hasOwnProperty('instance')) {
                    if (name===device.capabilities[j].instance.split('.')[1]) {
                        return device.capabilities[j].instance.split('.')[1]
                    }
                }               
            }
        }
        return undefined
    }

    function propertyMap(dev) {
        
        var devprops=[]     
        
        if (dev===undefined) { return undefined }
        
        for (var j = 0; j < dev.capabilities.length; j++) {
            if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                var cp=Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]])
                for (var k = 0; k < cp.length; k++) {
                    devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface.split('.')[1], 'property': cp[k]})
                }
                //devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
            }
            if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                var ep=Object.keys(eventSources[dev.capabilities[j].interface.split('.')[1]])
                for (var l = 0; l < ep.length; l++) {
                    devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface.split('.')[1], 'property': ep[l]})
                }
                //devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
            }
        }
        
        return devprops
    }    
    
    function deviceDirectives(dev) {

        if (dev===undefined) { return undefined }
        var dirs=[]
        if (dev.hasOwnProperty('capabilities')) {
            for (var j = 0; j < dev.capabilities.length; j++) {
                var shortIf=dev.capabilities[j].interface.split('.')[1]
                if (directives.hasOwnProperty(shortIf)) {
                    var idirs=Object.keys(directives[shortIf])
                    for (var i = 0; i < idirs.length; i++) {
                        if (dev.capabilities[j].hasOwnProperty('instance')) {
                            dirs.push({"directive":idirs[i], "controller":shortIf, "instance":dev.capabilities[j].instance})
                        } else {
                            dirs.push({"directive":idirs[i], "controller":shortIf, "instance":undefined})
                        }
                    }
                }
            }
        }
        return dirs
    }

    function discovery() {
        var discoveryDirective = {
                "directive": {
                    "header": {
                        "namespace": "Alexa.Discovery",
                        "name": "Discover",
                        "messageId": newtoken(),
                        "payloadVersion": "3"
                    },
                    "payload": {
                        "scope": {
                            "type": "BearerToken",
                            "token": "sofa-interchange-token"
                        }
                    }
                }
            }

        console.log('Discovering devices')
        return postJSON('', discoveryDirective)
            .then(res=> deviceDispatch(res)  )
    }


    function deviceDirective (endpointId, controllerName, command, payload={}, cookie={}, instance="") {
        var controller=getController(endpointId, controllerName)
        if (!controller || !controller.hasOwnProperty('interface')) {
            console.log('!! could not get controller', controllerName, controller, 'for', endpointId)

            var promise1 = new Promise(function(resolve, reject) {
                resolve({});});
            return promise1;
        }
        
        var header={"name": command, "namespace":controller.interface, 
                    "payloadVersion":"3", "messageId": newtoken(), "correlationToken": newtoken()}
        
        if (instance) {
            header.instance=instance
        } else if (controller.hasOwnProperty('instance')) {
            header.instance=controller.instance
        }
        
        var endpoint={"endpointId": endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        //console.log('Sending device-based alexa command:',data)

        return postJSON('', data)
            .then(res=> { return res })

    }

    function getActivations() {
        return getJSON('activations')
            .then(res=>{ return res;})
    }

    function approveActivation(name, short_key) {
        return postJSON('activations/approve', {"name":name, "api_key":short_key} )
            .then(res=>{ return res;})
    }

    function removeActivation(name, short_key) {
        console.log('remove activation', name, short_key)
        return postJSON('activations/remove', {"name":name, "api_key":short_key} )
            .then(res=>{ return res;})
    }

    function isModeNonControllable(dev, instance) {

        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].hasOwnProperty('instance') && dev.capabilities[k].instance.split('.')[1]===instance) {
                try {
                    return dev.capabilities[k].properties.nonControllable
                }
                catch { console.log('could not get noncontrollable for', instance) }
            }
        }
        return false

    }

   

    return (
        <DeviceContext.Provider
            value={{
                devices: devices,
                
                directives: directives,
                controllerProperties: controllerProperties,
                controllerForProperty: controllerForProperty,
                getControllerProperties: getControllerProperties,
                getDeviceProperties: getDeviceProperties,
                
                deviceByEndpointId: deviceByEndpointId,
                deviceByFriendlyName: deviceByFriendlyName,
                devicesByFriendlyName: devicesByFriendlyName,
                
                devicesByCategory: devicesByCategory,
                devicesByController: devicesByController,
                propertyNamesFromDevice: propertyNamesFromDevice,
                sortByName: sortByName,
                
                deviceDirectives: deviceDirectives,
                
                propertyMap: propertyMap,
                getControllerInterface: getControllerInterface,
                instanceForProperty: instanceForProperty,
                getDefaultCapability: getDefaultCapability,
                getDefaultDirective: getDefaultDirective,
                
                getChangeTimesForDevices: getChangeTimesForDevices,                
                getHistoryForDevice: getHistoryForDevice,
                historyQuery: historyQuery,
                setArea: setArea,
                area: area,
                
                getModes: getModes,
                getInputs: getInputs,
                getController: getController,
                deviceDirective: deviceDirective,
                
                getSceneDetails: getSceneDetails,
                saveSceneDetails: saveSceneDetails,
                
                getActivations: getActivations,
                approveActivation: approveActivation,
                removeActivation: removeActivation,
                getEndpointIdsByCategory: getEndpointIdsByCategory,
                getEndpointIdsByFriendlyName: getEndpointIdsByFriendlyName,
                unregisterDevices: unregisterDevices,
                registeredDevices: registeredDevices,
                registerEndpointIds: registerEndpointIds,
                cardDeviceCount: cardDeviceCount,
                getRecent: getRecent,
                isModeNonControllable: isModeNonControllable,
                hasCapability: hasCapability,
                hasDisplayCategory: hasDisplayCategory,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
}
