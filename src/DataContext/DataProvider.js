import React, {useState, useEffect, createContext, useReducer} from 'react';

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
            this[data.capabilities[j].interface.split('.')[1]]=new AlexaController(this, data.capabilities[j])
            if (!this.interfaces.includes(data.capabilities[j].interface.split('.')[1])) {
                this.interfaces.push(data.capabilities[j].interface.split('.')[1])
                this.interfaceobjects.push(this[data.capabilities[j].interface.split('.')[1]])
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
        this.properties=[]
        this.propertyobjects=[]
        
        if (data.hasOwnProperty('configuration')) {
            this.configuration=data.configuration;
        }

        if (data.hasOwnProperty('inputs')) {
            this.inputs=data.inputs;
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
        var endpoint={"endpointId": this.device.endpointId, "cookie": cookie, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        console.log('Sending device-based alexa command:',data)
    
        return fetch(serverurl+'/directive', { method: 'post',
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
                            devs[dev][prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                            devs[dev][prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
                        }
                    }
                }                
                return devs;
            case 'ChangeReport':
                if (data.event.endpoint.endpointId in devs) {
                    for (i = 0; i < data.event.payload.change.properties.length; i++) {
                        prop=data.event.payload.change.properties[i]
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['value']=prop['value']
                        devs[data.event.endpoint.endpointId][prop.namespace.split('.')[1]][prop.name]['timeOfSample']=prop['timeOfSample']
                    }
                    for (i = 0; i < data.context.properties.length; i++) {
                        prop=data.context.properties[i]
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
    
    const serverurl="https://"+window.location.hostname;
    const [eventSource, setEventSource] = useState(() => new EventSource(serverurl+"/sse"))
    
    const initialDevices={};
    const [controllerProperties, setControllerProperties] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [area, setArea] = useState("Main");     
    const [heartbeat, setHeartbeat] = useState(Date.now());     
    const [lastUpdate] = useState(null);     
    const [devices, deviceDispatch] = useReducer(deviceReducer, initialDevices);

    
    useEffect(() => {

        const listener = event => {
            deviceDispatch(JSON.parse(event.data));
            setHeartbeat(Date.now())
        };

        eventSource.addEventListener('message', listener);

  	    fetch(serverurl+'/directives')
 		    .then(result=>result.json())
            .then(result=>setDirectives(result))
            .then(result=>console.log('done getting directives'));

  	    fetch(serverurl+'/properties')
 		    .then(result=>result.json())
            .then(result=>setControllerProperties(result))
            .then(result=>console.log('done getting properties'));
            
  	    fetch(serverurl+'/list/logic/virtualDevices')
 		    .then(result=>result.json())
            .then(result=>setVirtualDevices(result))
            .then(result=>console.log('done getting virtual devices'));
        
        console.log('Done with useeffect load')    
            
    },[eventSource, serverurl]);

    function reconnect() {
        setEventSource(() => new EventSource(serverurl+"/sse"))
    }

    function timedOut() {
        if (((new Date()) - heartbeat) > 15000) {
            console.log(new Date(),heartbeat,(new Date()) - heartbeat > 15000)
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
  	    fetch(serverurl+'/lastupdate')
 		    .then(result=>result.json())
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
                    if (!searchterm || devices[id].friendlyName.toLowerCase().startsWith(searchterm.toLowerCase())) {
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

    function getChangeTimesForDevices(val,devs) {
        
        // Requests the last time the value changed for a set of devices.  This requires the Influx adapter
        // in order to see history.

        //console.log('gctfd',val,devs)
        var endpointList=[]
        for (var i = 0; i < devs.length; i++) {   
           endpointList.push(devs[i].endpointId)
        }

        return fetch(serverurl+'/list/influx/last/'+val, {
                    method: "post",
                    body: JSON.stringify(endpointList)
                })
                    .then(res=>res.json())
                    .then(res=> { return res;})
    }

    function getHistoryForDevice(dev, prop, page) {
        
        // Requests the history for a specific device and property.  It allows for pagination since the data could be very
        // large.  This requires the Influx adapter in order to see history.
        
        var url=serverurl+"/list/influx/history/"+dev+"/"+prop
        if (page) {
            url=url+"/"+page
        }

        return fetch(url)
            .then(res=> res.json())
            .then(res=> { return res;})
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
                devicesByCategory: devicesByCategory,
                propertyNamesFromDevice: propertyNamesFromDevice,
                isReachable: isReachable,
                sortByName: sortByName,
                
                getChangeTimesForDevices: getChangeTimesForDevices,
                getHistoryForDevice: getHistoryForDevice,

                setArea: setArea,
                area: area,
                lightCount: lightCount,
                
                timedOut: timedOut,
                getLastUpdate: getLastUpdate,
                eventSource: eventSource,
                reconnect: reconnect
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
