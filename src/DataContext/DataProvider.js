import React, {useState, useEffect, createContext, useReducer} from 'react';

export const DataContext = createContext();

class AlexaDevice {
    constructor(data) {
        this.endpointId = data.endpointId;
        this.friendlyName = data.friendlyName;
        this.manufacturerName = data.manufacturerName;
        this.description = data.description;
        this.displayCategories = data.displayCategories;
        
        for (var j = 0; j < data.capabilities.length; j++) {
            this[data.capabilities[j].interface.split('.')[1]]=new AlexaController(this, data.capabilities[j])
        }
    }
    
    newtoken() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }
    
    responseHandler(response) {
        if (response.hasOwnProperty('context')) {
            for (var i = 0; i < response.context.properties.length; i++) {
                var prop=response.context.properties[i]
                this[prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                this[prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
            }
        }
        return response
    }
    
}

class AlexaController {

    constructor(device, data) {
        this.device=device
        this.namespace=data.interface.split('.')[0]
        this.controller=data.interface.split('.')[1]
        if (data.hasOwnProperty('configuration')) {
            this.configuration=data.configuration;
        }

        if (data.hasOwnProperty('properties') && data.properties.hasOwnProperty('supported')) {
            for (var j = 0; j < data.properties.supported.length; j++) {
                this[data.properties.supported[j].name]=new AlexaControllerProperty()
            }
        }
    }
    
    directive(command, payload={}, cookie={}) {
        var header={"name": command, "namespace":this.namespace+"." + this.controller, "payloadVersion":"3", "messageId": this.device.newtoken(), "correlationToken": this.device.newtoken()}
        var endpoint={"endpointId": this.device.endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        console.log('Sending device-based alexa command:',data)
    
        return fetch('/directive', { method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
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
}

export const deviceReducer = (state, data) => {

        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
        
        switch (data.event.header.name) {
            case 'DeleteReport':
                var devs={...state}
                for (var i = 0; i < data.event.payload.endpoints.length; i++) {
                    if (data.event.payload.endpoints[i].endpointId in devs) {
                        delete devs[data.event.payload.endpoints[i].endpointId]
                    }
                }
                return devs
            case 'AddOrUpdateReport':
                var devs={...state}
                for (var i = 0; i < data.event.payload.endpoints.length; i++) {
                    //console.log('Adding Object', data.event.payload.endpoints[i].endpointId, data.event.payload.endpoints[i])
                    devs[data.event.payload.endpoints[i].endpointId]=new AlexaDevice(data.event.payload.endpoints[i])
                        //devs.push(data.event.payload.endpoints[i])
                }
                return devs
            case "Multistate":
                var devs={...state}
                for (var dev in data.state) {
                    if (dev in devs) {
                        for (var i = 0; i < data.state[dev].context.properties.length; i++) {
                            var prop=data.state[dev].context.properties[i]
                            devs[dev][prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                            devs[dev][prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
                        }
                    }
                }                
                return devs;
            case 'ChangeReport':
                var devs={...state}
                if (data.event.endpoint.endpointId in devs) {
                    for (var i = 0; i < data.event.payload.change.properties.length; i++) {
                        var prop=data.event.payload.change.properties[i]
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                    for (var i = 0; i < data.context.properties.length; i++) {
                        var prop=data.context.properties[i]
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                }
                return devs;
            default:
                return state
        }
    }

export default function DataProvider(props) {
    const initialDevices={};
    const [controllerProperties, setControllerProperties] = useState({});     
    const [controllerEvents, setControllerEvents] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [region, setRegion] = useState("Main");     
    const [heartbeat, setHeartbeat] = useState(Date.now());     
    const [lastUpdate, setLastUpdate] = useState(null);     
    const [eventSource] = useState(() => new EventSource("sse"))
    const pendingDevs = [];
    
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);
    
    const devobjs={}
    
    
    useEffect(() => {

        const listener = event => {
            deviceDispatch(JSON.parse(event.data));
            setHeartbeat(Date.now())
        };
        eventSource.addEventListener('message', listener);

  	    fetch('/directives')
 		    .then(result=>result.json())
            .then(result=>setDirectives(result))
            .then(result=>console.log('done getting directives'));

  	    fetch('/properties')
 		    .then(result=>result.json())
            .then(result=>setControllerProperties(result))
            .then(result=>console.log('done getting properties'));
            
  	    fetch('/list/logic/virtualDevices')
 		    .then(result=>result.json())
            .then(result=>setVirtualDevices(result))
            .then(result=>console.log('done getting virtual devices'));
        
        console.log('Done with useeffect load')    
            
    },[]);

    function timedOut() {
        if (((new Date) - heartbeat) > 15000) {
            console.log(new Date,heartbeat,(new Date) - heartbeat > 15000)
            return true
        } 
        return false
    }
    
    function checkUpdate(serverUpdate) {
        var serverdate = new Date(serverUpdate.lastupdate)
        if (lastUpdate && (serverdate > lastUpdate)) {
            console.log('check update failed', lastUpdate, serverdate, (serverdate > lastUpdate))
        }
    }
    
    function getLastUpdate() {
  	    fetch('/lastupdate')
 		    .then(result=>result.json())
            .then(result=>checkUpdate(result))   
    }

    function isReachable(dev) {
        
        if (dev.EndpointHealth.connectivity.value.value=='OK') {
            return true
        }
        return false
    }
    
    function lightCount(condition) {
        var count=0;
        var lights=devicesByCategory('LIGHT')

        for (var id in lights) {
            if (condition.toLowerCase()=='all') {
                count=count+1
            } else if (condition.toLowerCase()=='off') {
                if (lights[id].PowerController.powerState.value=='OFF' || !isReachable(lights[id])) {
                    count=count+1
                }
            } else if (condition.toLowerCase()=='on') {
                if (lights[id].PowerController.powerState.value=='ON' && isReachable(lights[id])) {
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
                if (devices[id].displayCategories.includes(category) || category=='ALL') {
                    if (!searchterm || devices[id].friendlyName.toLowerCase().startsWith(searchterm.toLowerCase())) {
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
    
    function sortByName(devlist) {
        devlist.sort(function(a, b)  {
		    var x=a['friendlyName'].toLowerCase(),
			y=b['friendlyName'].toLowerCase();
		    return x<y ? -1 : x>y ? 1 : 0;
	    });    
        return devlist
    }

    function deviceByFriendlyName(devname) {
        var fn=[]
        for (var id in devices) {
            if (devices[id]['friendlyName']==devname) {
                return devices[id]
            } 
        }
        //console.log('Did not find device named', devname, devices.length)
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

    function getChangeTimesForDevices(val,devs) {
        
        // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
        // in order to see history.

        console.log('gctfd',val,devs)
        var endpointList=[]
        for (var i = 0; i < devs.length; i++) {   
           endpointList.push(devs[i].endpointId)
        }

        return fetch('/list/influx/last/'+val, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(endpointList)
            })
            .then(res=> { return(res.json())})
    }

    function getHistoryForDevice(dev, prop, page) {
        
        // Requests the history for a specific device and property.  It allows for pagination since the data could be very
        // large.  This requires the Influx adapter in order to see history.
        
        var url="/list/influx/history/"+dev+"/"+prop
        if (page) {
            url=url+"/"+page
        }

        return fetch(url)
            .then(res=> { return(res.json())})
    }

    function catchError( error ) {
        console.log( error );
    }

    return (
        <DataContext.Provider
            value={{
                devices: devices,
                virtualDevices: virtualDevices,
                
                directives: directives,
                controllerProperties:controllerProperties,
                controllerEvents:controllerEvents,

                deviceByEndpointId: deviceByEndpointId,
                deviceByFriendlyName: deviceByFriendlyName,
                devicesByCategory: devicesByCategory,
                propertyNamesFromDevice: propertyNamesFromDevice,
                isReachable: isReachable,
                sortByName: sortByName,
                
                getChangeTimesForDevices: getChangeTimesForDevices,
                getHistoryForDevice: getHistoryForDevice,

                setRegion: setRegion,
                region: region,
                lightCount: lightCount,
                
                timedOut: timedOut,
                getLastUpdate: getLastUpdate,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
