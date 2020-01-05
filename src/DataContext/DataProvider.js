import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';
import AlexaDevice from './AlexaDevice'
export const DataContext = createContext();

function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('devices'))
    }
    catch {}
    return {}
    
}

export const deviceReducer = (state, data) => {

        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
        
        var i=0;
        var devs={...state}
        var prop='';
        var interfacename=""
        switch (data.event.header.name) {
            case 'DeleteReport':
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    if (data.event.payload.endpoints[i].endpointId in devs) {
                        delete devs[data.event.payload.endpoints[i].endpointId]
                    }
                }
                return devs
            case 'AddOrUpdateReport':
                var local=getFromLocalStorage()
                if (!local) {
                    local={}
                }
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    local[data.event.payload.endpoints[i].endpointId]=data.event.payload.endpoints[i]
                    //console.log('Adding Object', data.event.payload.endpoints[i].endpointId, data.event.payload.endpoints[i])
                    devs[data.event.payload.endpoints[i].endpointId]=new AlexaDevice(data.event.payload.endpoints[i])
                        //devs.push(data.event.payload.endpoints[i])
                }
                localStorage.setItem('devices', JSON.stringify(local));
                return devs;
            case "Multistate":
                for (var dev in data.state) {
                    if (dev in devs) {
                        for (i = 0; i < data.state[dev].context.properties.length; i++) {
                            prop=data.state[dev].context.properties[i]
                            interfacename=prop.namespace.split('.')[1]
                            if (prop.hasOwnProperty('instance')) {
                                interfacename=prop.instance.split('.')[1]
                            }
                            devs[dev][interfacename][prop.name]['value']=prop['value']
                            devs[dev][interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
                        }
                    }
                }                
                return devs;
            case 'ChangeReport':
                if (data.event.endpoint.endpointId in devs) {
                    for (i = 0; i < data.event.payload.change.properties.length; i++) {
                        prop=data.event.payload.change.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        if (prop.hasOwnProperty('instance')) {
                            interfacename=prop.instance.split('.')[1]
                        }
                        devs[data.event.endpoint.endpointId][interfacename][prop.name]['value']=prop['value']
                        devs[data.event.endpoint.endpointId][interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                    for (i = 0; i < data.context.properties.length; i++) {
                        prop=data.context.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        if (prop.hasOwnProperty('instance')) {
                            interfacename=prop.instance.split('.')[1]
                        }
                        devs[data.event.endpoint.endpointId][interfacename][prop.name]['value']=prop['value']
                        devs[data.event.endpoint.endpointId][interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                }
                return devs;
            default:
                return state
        }
    }

export default function DataProvider(props) {
    
    const { getJSON, postJSON, connectError, loggedIn, addSubscriber } = useContext(NetworkContext);

    const initialDevices=loadLocalStorageDevices();
    const [controllerProperties, setControllerProperties] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [area, setArea] = useState("Main");     
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);
    const [defaultPlayer, setDefaultPlayer] = useState('sonos:player:RINCON_B8E937ECE1F001400');     
    const [userPlayer, setUserPlayer] = useState('');     

    useEffect(() => {
        //localStorage.setItem('devices', JSON.stringify(devices));
    }, [devices]);
    
    useEffect(() => {
        
        function getData() {
            addSubscriber(deviceDispatch)
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
    }, [loggedIn] );
    
    function loadLocalStorageDevices() {
        
        var devs={}
        var local=getFromLocalStorage()
        for (var dev in local) {
            devs[local[dev].endpointId]=new AlexaDevice(local[dev])
        }
        return devs
    }

    function isReachable(dev) {
        
        if (dev.EndpointHealth.connectivity.value.value==='OK') {
            return true
        }
        return false
    }
    
    function lightCount(condition) {
        var count=0;
        var lights=devicesByCategory('LIGHT')

        for (var id in lights) {
            if (condition.toLowerCase()==='all') {
                count=count+1
            } else if (condition.toLowerCase()==='off') {
                if (lights[id].PowerController.powerState.value==='OFF' || !isReachable(lights[id])) {
                    count=count+1
                }
            } else if (condition.toLowerCase()==='on') {
                if (lights[id].PowerController.powerState.value==='ON' && isReachable(lights[id])) {
                    count=count+1
                }
            }
        }
        return count
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
                        if (devices[id].hasData()) {
                            categoryDevices.push(devices[id])
                        }
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

    function getModes(dev) {
        
        var modes={}
        for (var k = 0; k < dev.interfaces.length; k++) {
            if (dev[dev.interfaces[k]].controller==='ModeController') {
                var mc=dev[dev.interfaces[k]]
                var modename=mc.capabilityResources.friendlyNames[0].value.text
                var modechoices=[]
                for (var j = 0; j < mc.configuration.supportedModes.length; j++) {
                    modechoices[mc.configuration.supportedModes[j].value] = mc.configuration.supportedModes[j].modeResources.friendlyNames[0].value.text
                }
                modes[modename]=modechoices
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

    return (
        <DataContext.Provider
            value={{
                devices: devices,
                virtualDevices: virtualDevices,
                
                directives: directives,
                controllerProperties:controllerProperties,

                deviceByEndpointId: deviceByEndpointId,
                deviceByFriendlyName: deviceByFriendlyName,
                devicesByFriendlyName: devicesByFriendlyName,

                devicesByCategory: devicesByCategory,
                propertyNamesFromDevice: propertyNamesFromDevice,
                isReachable: isReachable,
                sortByName: sortByName,
                
                getChangeTimesForDevices: getChangeTimesForDevices,
                getHistoryForDevice: getHistoryForDevice,

                setArea: setArea,
                area: area,
                lightCount: lightCount,
                
                defaultPlayer: defaultPlayer,
                setDefaultPlayer: setDefaultPlayer,
                userPlayer: userPlayer,
                setUserPlayer: setUserPlayer,
                
                getModes: getModes,
                loggedIn: loggedIn,
                connectError: connectError
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
