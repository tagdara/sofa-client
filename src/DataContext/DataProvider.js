import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';

export const DataContext = createContext();

class AlexaDevice {
    constructor(data) {
        this.endpointId = data.endpointId;
        this.friendlyName = data.friendlyName;
        this.manufacturerName = data.manufacturerName;
        this.description = data.description;
        this.displayCategories = data.displayCategories;
        this.interfaces = []
        this.interfaceobjects = []
        
        for (var j = 0; j < data.capabilities.length; j++) {
            var interfacename=data.capabilities[j].interface.split('.')[1]
            if (data.capabilities[j].hasOwnProperty('instance')) {
                interfacename=data.capabilities[j].instance.split('.')[1]
            }
            if (data.capabilities[j].interface.split('.')[1] && !this.interfaces.includes(interfacename)) {
                this[interfacename]=new AlexaController(this, data.capabilities[j])
                this.interfaces.push(interfacename)
                this.interfaceobjects.push(this[interfacename])
            }
        }
    }
    
    hasData() {
        for (var ifo in this.interfaceobjects) {
            for (var po in ifo.propertyobjects) {
                if (po.value===null) {
                    console.log('device is missing data', this.endpointId, this.friendlyName, ifo.controller, po )
                    return false
                }
            }
        }
        return true
    }
    
    newtoken() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
        )
    }
    
    responseHandler(response) {
        if (response.hasOwnProperty('context')) {
            for (var i = 0; i < response.context.properties.length; i++) {
                var prop=response.context.properties[i]
                var interfacename=prop.namespace.split('.')[1]
                if (prop.hasOwnProperty('instance')) {
                    interfacename=prop.instance.split('.')[1]
                }
                this[interfacename][prop.name]['value']=prop['value']
                this[interfacename][prop.name]['timeOfSample']=prop['timeOfSample']
            }
        }
        return response
    }
    
    properties() {
        var allprops=[]
        for (var j = 0; j < this.interfaces.length; j++) {
            allprops=allprops.concat(this[this.interfaces[j]].properties);
        }
        return allprops
    }

    controllerForProperty(propname) {
        for (var j = 0; j < this.interfaces.length; j++) {
            if (this[this.interfaces[j]].properties.includes(propname)) {
                return this.interfaces[j]
            }
        }
        return ''
    }
    
}

class AlexaController {

    constructor(device, data) {
        this.device=device
        this.namespace=data.interface.split('.')[0]
        this.controller=data.interface.split('.')[1]
        this.properties=[]
        this.propertyobjects=[]
        
        if (data.hasOwnProperty('configuration')) {
            this.configuration=data.configuration;
        }

        if (data.hasOwnProperty('inputs')) {
            this.inputs=data.inputs;
        }

        if (data.hasOwnProperty('instance')) {
            this.instance=data.instance;
        }
        
        if (data.hasOwnProperty('capabilityResources')) {
            this.capabilityResources=data.capabilityResources;
        }

        if (data.hasOwnProperty('properties') && data.properties.hasOwnProperty('supported')) {
            for (var j = 0; j < data.properties.supported.length; j++) {
                this[data.properties.supported[j].name]=new AlexaControllerProperty()
                this.properties.push(data.properties.supported[j].name)
                this.propertyobjects.push(this[data.properties.supported[j].name])
            }
        }
    }
    
    directive(command, payload={}, cookie={}) {
        const serverurl="https://"+window.location.hostname;
        var header={"name": command, "namespace":this.namespace+"." + this.controller, "payloadVersion":"3", "messageId": this.device.newtoken(), "correlationToken": this.device.newtoken()}
        if (this.hasOwnProperty('instance')) {
            header.instance=this.instance
        }
        var endpoint={"endpointId": this.device.endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        console.log('Sending device-based alexa command:',data)
    
        return fetch(serverurl+'/directive', { withCredentials: true, credentials: 'include', method: 'post',
                    body: JSON.stringify(data)
                })
                    .then(res=>res.json())
                    .then(res=>this.device.responseHandler(res))
                    .then(res=> { return res;})
    }
 
}

class AlexaControllerProperty {
    constructor() {
        this.value=null
    }
    
    get deepvalue() {
        // this is a shim to prevent the objects with value.value from breaking when value is null and javascript
        // throws an error.
        if (!this.value) return null;
        if (this.value.hasOwnProperty('value')) return this.value.value;
        return this.value;
    }
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
                for (i = 0; i < data.event.payload.endpoints.length; i++) {
                    //console.log('Adding Object', data.event.payload.endpoints[i].endpointId, data.event.payload.endpoints[i])
                    devs[data.event.payload.endpoints[i].endpointId]=new AlexaDevice(data.event.payload.endpoints[i])
                        //devs.push(data.event.payload.endpoints[i])
                }
                return devs
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
    
    const { getJSON, connectError, eventSource, loggedIn, addSubscriber } = useContext(NetworkContext);
    //const [eventSource, setEventSource] = useState(() => new EventSource(serverurl+"/sse"))
    
    const initialDevices={};
    const [controllerProperties, setControllerProperties] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [area, setArea] = useState("Main");     
    //const [heartbeat, setHeartbeat] = useState(Date.now());     
    const [lastUpdate] = useState(null);     
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);
    const [defaultPlayer, setDefaultPlayer] = useState('sonos:player:RINCON_B8E937ECE1F001400');     
    const [userPlayer, setUserPlayer] = useState('');     

    useEffect(() => {
        
        function getData() {
            addSubscriber(deviceDispatch)
            getJSON('directives')
                .then(result=>setDirectives(result))
                .then(result=>console.log('done getting directives'));
    
      	    getJSON('properties')
                .then(result=>setControllerProperties(result))
                .then(result=>console.log('done getting properties'));
                
      	    getJSON('list/logic/virtualDevices')
                .then(result=>setVirtualDevices(result))
                .then(result=>console.log('done getting virtual devices'));
        }
        if (loggedIn===true ) { getData() }
    },[loggedIn]);

    
    function checkUpdate(serverUpdate) {
        var serverdate = new Date(serverUpdate.lastupdate)
        if (lastUpdate && (serverdate > lastUpdate)) {
            console.log('check update failed', lastUpdate, serverdate, (serverdate > lastUpdate))
        }
    }
    
    function getLastUpdate() {
  	    getJSON('lastupdate')
            .then(result=>checkUpdate(result))   
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

        return getJSON('list/influx/last/'+val)
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
