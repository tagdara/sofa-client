import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';

export const DeviceContext = createContext();


function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('devices'))
    }
    catch {}
    return {}
    
}

    
const deviceReducer = (state, data) => {
    
    if (data==={}) { return state }
    if (!data.hasOwnProperty('event')) { return state }
        
    var i=0;
    var devs={...state}
    switch (data.event.header.name) {
        case 'DeleteReport':
            for (i = 0; i < data.event.payload.endpoints.length; i++) {
                if (data.event.payload.endpoints[i].endpointId in devs) {
                    delete devs[data.event.payload.endpoints[i].endpointId]
                }
            }
            localStorage.setItem('devices', JSON.stringify(devs));
            return devs
        case 'AddOrUpdateReport':
            var local=getFromLocalStorage()
            if (!local) {
                local={}
            }
            for (i = 0; i < data.event.payload.endpoints.length; i++) {
                local[data.event.payload.endpoints[i].endpointId]=data.event.payload.endpoints[i]
            }
            localStorage.setItem('devices', JSON.stringify(local));
            return local;
        default:
            return state
    }
}

export default function DeviceProvider(props) {
   
    const { getJSON, postJSON, loggedIn, addSubscriber } = useContext(NetworkContext);

    const initialDevices=getFromLocalStorage()
    const [controllerProperties, setControllerProperties] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [area, setArea] = useState("Main");     
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }} 

    useEffect(() => {
       addSubscriber(deviceDispatch)
    // eslint-disable-next-line 
    }, [] );


    useEffect(() => {
        
        function getData() {
            getJSON('directives')
                .then(result=>setDirectives(result))
                //.then(result=>console.log('done getting directives'));
    
      	    getJSON('properties')
                .then(result=>setControllerProperties(result))
                //.then(result=>console.log('done getting properties'));
                
      	    getJSON('list/logic/virtualDevices')
                .then(result=>setVirtualDevices(result))
                //.then(result=>console.log('done getting virtual devices'));
        }
        //console.log('logged in changed to',loggedIn) 
        if (loggedIn===true ) { getData() }
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


    function devicesByFriendlyName(subname,sort=true, category) {

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
                if (subname==="" || devices[devid]['friendlyName'].includes(subname)) {
                    subDevices.push(devices[devid])
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

    
    function sortByName(devlist) {
        devlist.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
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
        
        var choices=[]        
        for (var k = 0; k < dev.capabilities.length; k++) {
            if (dev.capabilities[k].interface.endsWith('InputController')) {
                for (var j = 0; j < dev.capabilities[k].inputs.length; j++) {
                    choices.push(dev.capabilities[k].inputs[j].name)
                }
            }
        }
        return choices
    }


    function getModes(dev,exclude=[]) {
        
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
    
    function getChangeTimesForDevices(val,devs) {
        
        // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
        // in order to see history.

        //console.log('gctfd',val,devs)
        var endpointList=[]
        for (var i = 0; i < devs.length; i++) {   
           endpointList.push(devs[i].endpointId)
        }

        return postJSON('list/influx/last/'+val, endpointList)
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
            for (var j = 0; j < dev.capabilities.length; j++) {
                if (controllerProperties[dev.capabilities[j].interface.split('.')[1]]!==undefined) {
                    devprops=devprops.concat(Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]]))
                }
                if (eventSources.hasOwnProperty(dev.capabilities[j].interface.split('.')[1])) {
                    devprops=devprops.concat( Object.keys( eventSources[dev.capabilities[j].interface.split('.')[1]]))
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
                if (device.capabilities[j].interface.split('.')[1]===item.controller) {
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
                var ep=Object.keys(controllerProperties[dev.capabilities[j].interface.split('.')[1]])
                for (var l = 0; l < ep.length; l++) {
                    devprops.push({'instance':dev.capabilities[j].instance, 'controller':dev.capabilities[j].interface.split('.')[1], 'property': cp[l]})
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


    function directive (endpointId, controllerName, command, payload={}, cookie={}) {
        var controller=getController(endpointId, controllerName)
        const serverurl="https://"+window.location.hostname;
        var header={"name": command, "namespace":controller.interface, 
                    "payloadVersion":"3", "messageId": newtoken(), "correlationToken": newtoken()}
        if (controller.hasOwnProperty('instance')) {
            header.instance=controller.instance
        }
        var endpoint={"endpointId": endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        //console.log('Sending device-based alexa command:',data)
    
        return fetch(serverurl+'/directive', { withCredentials: true, credentials: 'include', method: 'post',
                    body: JSON.stringify(data)
                })
                    .then(res=>res.json())
                    //.then(res=>this.device.responseHandler(res))
                    .then(res=> { return res;})
    }

    return (
        <DeviceContext.Provider
            value={{
                devices: devices,
                virtualDevices: virtualDevices,
                
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
                directive: directive,
                
                getSceneDetails: getSceneDetails,
                saveSceneDetails: saveSceneDetails,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
}
