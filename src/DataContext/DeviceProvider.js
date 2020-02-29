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
                if (data.event.payload.endpoints[i].endpointId==='logic:area:Main') {
                    console.log('AOU',data.event.payload.endpoints[i].endpointId,data.event.payload.endpoints[i])
                }
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
 

    useEffect(() => {
       addSubscriber(deviceDispatch)
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
        console.log('logged in changed to',loggedIn) 
        if (loggedIn===true ) { getData() }
    }, [ loggedIn ] );
    

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


    function devicesByFriendlyName(subname) {

        var subDevices=[]
        for (var id in devices) {
            if (subname==="" || devices[id]['friendlyName'].includes(subname)) {
                subDevices.push(devices[id])
            } 
        }

        subDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
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
    
    function getChangeTimesForDevices(val,devs) {
        
        // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
        // in order to see history.

        //console.log('gctfd',val,devs)
        var endpointList=[]
        for (var i = 0; i < devs.length; i++) {   
           endpointList.push(devs[i].endpointId)
        }

        return postJSON('list/influx/last/'+val, endpointList)
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
    
    function newtoken() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
        )
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
        console.log('Sending device-based alexa command:',data)
    
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
                controllerProperties:controllerProperties,

                deviceByEndpointId: deviceByEndpointId,
                deviceByFriendlyName: deviceByFriendlyName,
                devicesByFriendlyName: devicesByFriendlyName,

                devicesByCategory: devicesByCategory,
                devicesByController: devicesByController,
                propertyNamesFromDevice: propertyNamesFromDevice,
                sortByName: sortByName,
                
                getChangeTimesForDevices: getChangeTimesForDevices,                
                getHistoryForDevice: getHistoryForDevice,

                setArea: setArea,
                area: area,
                
                getModes: getModes,
                getInputs: getInputs,
                getController: getController,
                directive: directive,
            }}
        >
            {props.children}
        </DeviceContext.Provider>
    );
}
