import React, {useState, useEffect, createContext, useReducer} from 'react';

export const DataContext = createContext();

export const deviceStateReducer = (state, data) => {

        if (data==={}) { return state }
        if (!data.hasOwnProperty('event')) { return state }
        
        switch (data.event.header.name) {
            case 'StateReport':
                return {...state, [data.event.endpoint.endpointId]: { "properties" : data.context.properties }}

            case "Multistate":
                var devstate=new Map()
                for (var dev in data.state) {
                    devstate[dev]= { "properties" : data.state[dev].context.properties }
                }                
                return {...state, ...devstate};
            case "Response":
                return {...state, [data.event.endpoint.endpointId]: { "properties" : data.context.properties }}
            case 'StateReport':
                return {...state, [data.event.endpoint.endpointId]: { "properties" : data.context.properties }}

            case 'ChangeReport':
                return Object.assign({...state}, { [data.event.endpoint.endpointId]: { "properties" : [...data.context.properties, ...data.event.payload.change.properties ]}});
            case "Heartbeat":
                return state
            default:
                throw new Error('Unexpected action',data.event.header.name);
                return state
        }
    }

export default function DataProvider(props) {
    const initialState=new Map();
    const initialData=new Map([["devices", {}], ["state",{}], ["category",{}]]);
    const [devices, setDevices] = useState([]);     
    const [controllerProperties, setControllerProperties] = useState({});     
    const [controllerEvents, setControllerEvents] = useState({});     
    const [directives, setDirectives] = useState({});     
    const [virtualDevices, setVirtualDevices] = useState({});     
    const [region, setRegion] = useState("Main");     
    const [heartbeat, setHeartbeat] = useState(Date.now());     
    const [lastUpdate, setLastUpdate] = useState(null);     
    const [eventSource] = useState(() => new EventSource("sse"))
    const [modules, setModules] = useState({})
    const pendingDevs = [];
    
    const [deviceState, dispatch] = useReducer(deviceStateReducer, initialState);

    useEffect(() => {
        const listener = event => {
            //const data = parser(event.data);
            dispatch(JSON.parse(event.data));
            setHeartbeat(Date.now())
            //dispatchData(JSON.parse(event.data));
        };
        eventSource.addEventListener('message', listener);
        console.log('Fetching device info')
        refreshData()

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

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }
 
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
            refreshData()   
        }
    }
    
    function getLastUpdate() {
  	    fetch('/lastupdate')
 		    .then(result=>result.json())
            .then(result=>checkUpdate(result))   
    }


    function updateMultipleDevices(devs) {
        
        if (devs.length>0) {
            //console.log('getting updates for multiple devices', devs.length, devs)
            fetch('/deviceState', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(devs)
                })
                .then(res=>res.json())
                .then(res =>dispatch(res))    
        }
    }

    function updateDeviceList(devs) {

        //console.log('updatedevicelist',devs)
        var udl=[]
        for (var i = 0; i < devs.length; i++) {
            if (deviceState && !deviceState.hasOwnProperty(devs[i].endpointId)) {
                udl.push(devs[i].endpointId)
            } 
        }
        setDevices(devs) 
        updateMultipleDevices(udl)
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
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].displayCategories.includes(category) || category=='ALL') {
                    if (!searchterm || devices[i].friendlyName.toLowerCase().startsWith(searchterm.toLowerCase())) {
                        categoryDevices.push(devices[i])
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
    
    function nameByEndpointId(endpointId) {
        var fn=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i]['endpointId']==endpointId) {
                return devices[i].friendlyName
            } 
        }
        console.log('Did not find device named', endpointId, devices.length)
    }    


    function deviceByName(devname) {
        var fn=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i]['friendlyName']==devname) {
                return devices[i]
            } 
        }
    }
    
    function deviceByEndpointId(endpointId) {
        var fn=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i]['endpointId']==endpointId) {
                return devices[i]
            } 
        }
        console.log('Did not find device named', endpointId, devices.length)
    }

    function propertiesFromDevices(devs) {
        
        //console.log('running pfd for ', devs)

        var devstate=new Map();
        var nostate=[]
        if (devs==null || devs==undefined) {
            return devstate
        } 

        if (!Array.isArray(devs)) {
            devs=[devs]
        }
        for (var i = 0; i < devs.length; i++) {   
 
            var endpointId=devs[i].endpointId
            devstate[endpointId]=new Map();
            if (deviceState.hasOwnProperty(endpointId)) {
                //console.log('checking',devs[i].endpointId,deviceState[devs[i].endpointId])
                if (deviceState[endpointId].hasOwnProperty('properties')) {
                    for (var j = 0; j < deviceState[endpointId].properties.length; j++) {
                        devstate[endpointId][deviceState[endpointId].properties[j].name]=deviceState[endpointId].properties[j].value;
                    }
                }
 
            } else if (!pendingDevs.includes(devs[i].endpointId)) {
                pendingDevs.push(devs[i].endpointId)
                nostate.push(devs[i].endpointId)
            }
        }

        if (nostate.length>0) {
            updateMultipleDevices(nostate)
        }

        return devstate
        
    }
    
    function getChangeTimesForDevices(val,devs) {

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
        
        var url="/list/influx/history/"+dev+"/"+prop
        if (page) {
            url=url+"/"+page
        }

        return fetch(url)
            .then(res=> { return(res.json())})
    }


    function changeTimesFromDevices(devs) {

        var devstate=new Map()
        var nostate=[]
        if (devs==null || devs==undefined) {
            return devstate
        } 

        if (!Array.isArray(devs)) {
            devs=[devs]
        }
        for (var i = 0; i < devs.length; i++) {   
            devstate[devs[i].endpointId]=new Map()
            if (deviceState.hasOwnProperty(devs[i].endpointId)) {
                if (deviceState[devs[i].endpointId].hasOwnProperty('properties')) {
                    for (var j = 0; j < deviceState[devs[i].endpointId].properties.length; j++) {
                        devstate[devs[i].endpointId][deviceState[devs[i].endpointId].properties[j].name]=deviceState[devs[i].endpointId].properties[j].timeOfSample;
                    }
                }
            } else if (!pendingDevs.includes(devs[i].endpointId)) {
                pendingDevs.push(devs[i].endpointId)
                nostate.push(devs[i].endpointId)
            }

        }

        if (nostate.length>0) {
            updateMultipleDevices(nostate)
        }

        return devstate
        
    }

    function sendAlexaCommand(deviceName, endpointId, controller, command, payload={}) {
        
        // value is optional for some alexa commands.  The original sofa2 implementation tried to take a string value and then map it to 
        // a value name, but underestimated the requirement for some commands to pass multiple values and needs to be adjusted.
        
        if (endpointId=='') {
            console.log('No endpoint ID was provided for ', deviceName, controller, command, payload)
            endpointId=deviceByName(deviceName).endpointId
        }

        var header={"name": command, "namespace":"Alexa." + controller, "payloadVersion":"3", "messageId": uuidv4(), "correlationToken": uuidv4()}
        var endpoint={"endpointId": endpointId, "cookie": {}, "scope":{ "type":"BearerToken", "token":"sofa-interchange-token" }}
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        
        console.log('Sending alexa command:',data)

        fetch('/directive', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>res.json())
                .then(res=>console.log('Alexa command response:',res))
    }

    function catchError( error ) {
        console.log( error );
    }


    function restGet(url) {

        fetch('/deviceListWithData')
            .then(response => {
                if ( !response.ok ) {
                    catchError( response );
                } else {
                    return response.json()
                }
            }).catch( catchError );
    }
    
    function refreshData() {
        console.log('Refreshing device data')
        var newlu = new Date()
        fetch('/deviceListWithData')
            .then(result=>result.json())
            .then(result=>{ 
                            dispatch(result);
                            updateDeviceList(result['devices'], true);
                            setLastUpdate(newlu);
            })        
    }

    return (
        <DataContext.Provider
            value={{
                devices: devices,
                deviceState: deviceState,
                directives: directives,
                virtualDevices: virtualDevices,
                controllerProperties:controllerProperties,
                controllerEvents:controllerEvents,
                sendAlexaCommand: sendAlexaCommand,
                deviceByName: deviceByName,
                devicesByCategory: devicesByCategory,
                propertiesFromDevices: propertiesFromDevices,
                getChangeTimesForDevices: getChangeTimesForDevices,
                changeTimesFromDevices: changeTimesFromDevices,
                getHistoryForDevice: getHistoryForDevice,
                deviceByEndpointId: deviceByEndpointId,
                nameByEndpointId: nameByEndpointId,
                setRegion: setRegion,
                region: region,
                timedOut: timedOut,
                refreshData: refreshData,
                getLastUpdate: getLastUpdate,
                modules: modules,
                setModules: setModules,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
}
