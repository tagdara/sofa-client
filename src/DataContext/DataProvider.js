import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';
import { DeviceContext } from './DeviceProvider';

import AlexaDevice from './AlexaDevice'
export const DataContext = createContext();

function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('deviceStates'))
    }
    catch {}
    return {}
    
}

export const deviceStatesReducer = (state, data) => {

        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
        
        var i=0;
        var devs={...state}
        var prop='';
        var interfacename=""
        var dev={}
        switch (data.event.header.name) {
            case "Multistate":
                for (dev in data.state) {
                    for (i = 0; i < data.state[dev].context.properties.length; i++) {
                        prop=data.state[dev].context.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        if (prop.hasOwnProperty('instance')) {
                            interfacename=prop.instance.split('.')[1]
                        }
                        if (!devs.hasOwnProperty(dev)) {
                            devs[dev]={}
                        }
                        
                        if (!devs[dev].hasOwnProperty(interfacename)) {
                            devs[dev][interfacename]={}
                        }
                        
                        if (!devs[dev][interfacename].hasOwnProperty(prop.name)) {
                            devs[dev][interfacename][prop.name]={}
                        }
                        devs[dev][interfacename][prop.name]['value']=prop['value']
                        devs[dev][interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                }                
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
                        if (prop.hasOwnProperty('instance')) {
                            interfacename=prop.instance.split('.')[1]
                        }
                        pname=prop['name']
                        devif={...dev[interfacename]}

                        dev={...dev, [interfacename]: { ...devif, [pname] : { ...devif[pname], 'value': prop['value'], 'timeOfSample': prop['timeOfSample'] }}}
                    }
                    for (i = 0; i < data.context.properties.length; i++) {
                        prop=data.context.properties[i]
                        interfacename=prop.namespace.split('.')[1]
                        if (prop.hasOwnProperty('instance')) {
                            interfacename=prop.instance.split('.')[1]
                        }
                        devif={...dev[interfacename]}
                        dev={...dev, [interfacename] : {...devif, [pname] : { ...devif[pname], 'value': prop['value'], 'timeOfSample': prop['timeOfSample'] }}}
                    }
                    //console.log('result',epid, dev)
                    return {...devs, [epid]: dev };
                }
                return state
            default:
                return state
        }
    }

export default function DataProvider(props) {
    
    const { deviceByEndpointId, devicesByCategory } = useContext(DeviceContext);
    const { getJSON, loggedIn, addSubscriber } = useContext(NetworkContext);

    const initialDeviceStates=loadLocalStorageDevices();
    const [virtualDeviceStates, setVirtualDeviceStates] = useState({});     
    const [area, setArea] = useState("Main");     
    const [deviceStates, deviceStatesDispatch] = useReducer(deviceStatesReducer, initialDeviceStates);
    const [defaultPlayer, setDefaultPlayer] = useState('sonos:player:RINCON_B8E937ECE1F001400');     
    const [userPlayer, setUserPlayer] = useState('');     

    useEffect(() => {
       addSubscriber(deviceStatesDispatch)
    }, []);

    useEffect(() => {
        
        function getData() {
                
      	    getJSON('list/logic/virtualDevices')
                .then(result=>setVirtualDeviceStates(result))
                //.then(result=>console.log('done getting virtual devices'));
        }
        console.log('logged in changed to',loggedIn) 
        if (loggedIn===true ) { getData() }
    }, [ loggedIn ] );
    
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
        var lights=deviceStatesByCategory('LIGHT')

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
    
    function deviceStatesByCategory(categories, searchterm) {

        var categoryDevices=devicesByCategory(categories,searchterm)
        
        categoryDevices.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        
        return getStatesForDevices(categoryDevices)
    }

//    function OlddeviceStatesByCategory(categories, searchterm) {

        
//       for (var i = 0; i < categoryDevices.length; i++) {
//            if (deviceStates.hasOwnProperty(categoryDevices[i].endpointId)) {
//                for (var j = 0; j < categoryDevices[i].interfaces.length; j++) {
//                    var dev=categoryDevices[i][categoryDevices[i].interfaces[j]]
//                    dev={...dev, ...deviceStates[ categoryDevices[i].endpointId ][ categoryDevices[i].interfaces[j]] }
//                }
//            }
//        }
//        categoryDevices.sort(function(a, b)  {
//		    var x=a['friendlyName'].toLowerCase(),
//			y=b['friendlyName'].toLowerCase();
//		    return x<y ? -1 : x>y ? 1 : 0;
//	    });    
//        return categoryDevices
        
//    }
    
    function getStatesForDevices(devices) {
        var newdevs=[]
        for (var i = 0; i < devices.length; i++) {
            newdevs.push(getStateForDevice(devices[i]))
        }
        return newdevs
    }

    function getStateForDevice(device) {
        
        var dev={...device}
        if (deviceStates.hasOwnProperty(device.endpointId)) {
            for (var j = 0; j < device.interfaces.length; j++) {
                var devif=device[device.interfaces[j]]
                //console.log('interface directive [', devif.directive,']')
                dev={...dev, [device.interfaces[j]] : { ...device[device.interfaces[j]], directive: devif.directive, ...deviceStates[ device.endpointId ][ device.interfaces[j]] }}
            }
        }
        return dev
    }



    function deviceStatesByFriendlyName(subname) {

        var subDeviceStates=[]
        for (var id in deviceStates) {
            if (subname==="" || deviceStates[id]['friendlyName'].includes(subname)) {
                subDeviceStates.push(deviceStates[id])
            } 
        }

        subDeviceStates.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return subDeviceStates
    }

    function deviceStatesByController(controllers, searchterm) {

        //console.log('dbc',categories, searchterm)
        if (!controllers) {
            return []
        }
        if (!Array.isArray(controllers)) {
            controllers=[controllers]
        }
        var controllerDeviceStates=[]
        for (var j = 0; j < controllers.length; j++) {
            var controller=controllers[j]
            for (var id in deviceStates) {
                if (deviceStates[id].interfaces.includes(controller)) {
                    if (!searchterm || deviceStates[id].friendlyName.toLowerCase().includes(searchterm.toLowerCase())) {
                        if (deviceStates[id].hasData()) {
                            controllerDeviceStates.push(deviceStates[id])
                        }
                    }
                } 
            }
        }
        controllerDeviceStates.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return controllerDeviceStates
        
    }

    
    function sortByName(devlist) {
        devlist.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return devlist
    }

    function deviceStateByFriendlyName(devname) {

        for (var id in deviceStates) {
            if (deviceStates[id]['friendlyName']===devname) {
                return deviceStates[id]
            } 
        }
        return undefined
    }

    function deviceStateByEndpointId(endpointId) {

        var dev=deviceByEndpointId(endpointId)
        if (dev!==undefined) {
            return getStateForDevice(dev)
        }
        //console.log('Did not find device with endpointId', endpointId, Object.keys(deviceStates))
        return undefined

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

    return (
        <DataContext.Provider
            value={{
                deviceStates: deviceStates,
                virtualDeviceStates: virtualDeviceStates,

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
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
