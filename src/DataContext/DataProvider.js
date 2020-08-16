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
                    var newdev={}
                    if (devs.hasOwnProperty(dev)) {
                        newdev={...devs[dev]}
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
            case 'ChangeReport':
                //console.log(data.event.endpoint.endpointId)
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
                //localStorage.setItem('deviceStates', JSON.stringify(state));
                return state
            default:
                return state
        }
    }


export default function DataProvider(props) {

    
    const { registerEndpointIds, registeredDevices, getEndpointIdsByFriendlyName, unregisterDevices, devices, getEndpointIdsByCategory, getSceneDetails, saveSceneDetails, deviceByEndpointId, devicesByCategory, devicesByFriendlyName, devicesByController, deviceByFriendlyName, directive, virtualDevices } = useContext(DeviceContext);
    const { addSubscriber } = useContext(NetworkContext);

    const initialDeviceStates=getFromLocalStorage();
    //const [virtualDeviceStates, setVirtualDeviceStates] = useState({});     
    const [area, setArea] = useState("Main");     
    const [deviceStates, deviceStatesDispatch] = useReducer(deviceStatesReducer, initialDeviceStates);
    const [defaultPlayer, setDefaultPlayer] = useState('sonos:player:RINCON_B8E937ECE1F001400');     
    const [userPlayer, setUserPlayer] = useState('');     

    useEffect(() => {
       addSubscriber(deviceStatesDispatch)
    // eslint-disable-next-line 
    }, []);

    function cardReady(cardname) {
        var foundAny=false
        //console.log('registered', registeredDevices)
        for (var id in registeredDevices) { 
            //console.log('checking', registeredDevices[id].includes(cardname), id, registeredDevices[id])
            if (registeredDevices[id].includes(cardname)) {
                //console.log('relevant', cardname, registeredDevices[id] )
                if (!deviceStates || !deviceStates.hasOwnProperty(id) || deviceStates[id]===undefined) {
                    return false
                }
                //console.log('Confirmed:',id, deviceStates[id])
                foundAny=true
                
            }
        }
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
                cardReady:cardReady,
                cardDevices: cardDevices,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
