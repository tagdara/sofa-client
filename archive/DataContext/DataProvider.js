import React, { PureComponent, Component, createElement  } from 'react';

export const DataContext = React.createContext();

export class DataProvider extends PureComponent {
  
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            deviceState: {},
            controllerProperties: {},
            controllerEvents: {},
            directives: {},
            virtualDevices: {},
            layout: {},
            fullLayout: {},
            layoutName: "Home",
            layoutProps: {},
            layoutPage: "",
            
            returnName: "",
            returnProps: {},
            backName: "",
            backProps: {},

            region: "Main",
            player: "",
            heartbeat: Date.now(),
            lastUpdate: null,
        };
        
        this.pendingDevs=[];
        this.eventSource = new EventSource("sse");

    }
    
    uuidv4  = ()  => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }
 
    timedOut = () => {
        if (((new Date) - this.heartbeat) > 15000) {
            return true
        } 
        return false
    }
    
    checkUpdate = (serverUpdate) => {
        var serverdate = new Date(serverUpdate.lastupdate)
        if (this.state.lastUpdate && (serverdate > this.state.lastUpdate)) {
            this.refreshData()   
        }
    }
    
    getLastUpdate = () => {
  	    fetch('/lastupdate')
 		    .then(result=>result.json())
            .then(result=>this.checkUpdate(result))   
    }
 
    onMessage = ev => {
        var jsondata=JSON.parse(ev.data)
        this.setState({'heartbeat':Date.now()})
        
        if (jsondata.hasOwnProperty('heartbeat')) {
            this.checkUpdate(jsondata)
        }

        if (jsondata.hasOwnProperty('event')) {
            this.setState({lastUpdate:Date.now()})
            console.log('SSE update', jsondata)
            if (jsondata.event.header.name=="Response" || jsondata.event.header.name=='StateReport') {
                this.mergeState(this.nameByEndPointId(jsondata.event.endpoint.endpointId), jsondata)

            } else if ((jsondata.event.header.name="ChangeReport") && jsondata.event.payload.hasOwnProperty('change')) {

                for (var j = 0; j < jsondata.event.payload.change.properties.length; j++) {
                    jsondata.context.properties.push(jsondata.event.payload.change.properties[j])
                }
                jsondata.payload={}
                jsondata.event.header.name="StateReport"
                this.mergeState(this.nameByEndPointId(jsondata.event.endpoint.endpointId), jsondata)
            } else {
                console.log('was not changereport', jsondata.event.header.name, jsondata)
            }
        }
    }
    
    mergeState = (dev,change) => {
        
        if (dev!==undefined && change!==undefined) {
            var devstate={...this.state.deviceState};
            devstate[dev]= { "endpointId" : change.event.endpoint.endpointId, "properties" : change.context.properties }
            this.setState({deviceState:devstate})
            return true
        } 
    }
    
    mergeStates = (devs) => {
        
        var devstate={...this.state.deviceState};
        for (var dev in devs) {
            if (dev!==undefined && devs[dev]!==undefined) {
                devstate[dev]= { "endpointId" : devs[dev].event.endpoint.endpointId , "properties" : devs[dev].context.properties }
            }
        }
        this.setState({ deviceState : devstate })
        return true
    }

    
    updateDevice = dev => {
        if (!this.pendingDevs.includes(dev)) {
            this.pendingDevs.push(dev)
            fetch('/data/devices/'+dev+'?stateReport')
                .then(result=>result.json())
                .then(data=>this.mergeState(dev,data))
        }
    }

    updateMultipleDevices = (devs) => {
        
        if (devs.length>0) {

            console.log('getting updates for multiple devices', devs.length)
            fetch('/deviceState', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(devs)
                })
                .then(res=>res.json())
                .then(res =>this.mergeStates(res))    
        }
    }

    updateDeviceList = (devs) => {

        var udl=[]
        for (var i = 0; i < devs.length; i++) {
            if (!this.state.deviceState.hasOwnProperty(devs[i].friendlyName)) {
                udl.push(devs[i].friendlyName)
            } 
        }
        this.setState({devices: devs}, 
            () =>  this.updateMultipleDevices(udl)
        )
    }
    
    devicesByCategory = (categories, searchterm) => {

        if (!categories) {
            categories=['ALL']
        }
        if (!Array.isArray(categories)) {
            categories=[categories]
        }
        var categoryDevices=[]
        for (var j = 0; j < categories.length; j++) {
            var category=categories[j]
            for (var i = 0; i < this.state.devices.length; i++) {
                if (this.state.devices[i].displayCategories.includes(category) || category=='ALL') {
                    if (!searchterm || this.state.devices[i].friendlyName.toLowerCase().startsWith(searchterm.toLowerCase())) {
                        categoryDevices.push(this.state.devices[i])
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
    
    nameByEndPointId = endpointId => {
        var fn=[]
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i]['endpointId']==endpointId) {
                return this.state.devices[i].friendlyName
            } 
        }
        console.log('Did not find device named', endpointId, this.state.devices.length)
    }    

    deviceByName = devname => {
        var fn=[]
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i]['friendlyName']==devname) {
                return this.state.devices[i]
            } 
        }
    }
    
    deviceByEndpointId = endpointId => {
        var fn=[]
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i]['endpointId']==endpointId) {
                return this.state.devices[i]
            } 
        }
        console.log('Did not find device named', endpointId, this.state.devices.length)
    }

    propertiesFromDevices = devs => {

        var devstate={}
        var nostate=[]
        if (devs==null || devs==undefined) {
            return devstate
        } 

        if (!Array.isArray(devs)) {
            devs=[devs]
        }
        for (var i = 0; i < devs.length; i++) {   
            devstate[devs[i].friendlyName]={}
            if (this.state.deviceState.hasOwnProperty(devs[i].friendlyName)) {
                if (this.state.deviceState[devs[i].friendlyName].hasOwnProperty('properties')) {
                    for (var j = 0; j < this.state.deviceState[devs[i].friendlyName].properties.length; j++) {
                        devstate[devs[i].friendlyName][this.state.deviceState[devs[i].friendlyName].properties[j].name]=this.state.deviceState[devs[i].friendlyName].properties[j].value;
                    }
                }
            } else if (!this.pendingDevs.includes(devs[i].friendlyName)) {
                this.pendingDevs.push(devs[i].friendlyName)
                nostate.push(devs[i].friendlyName)
            }
        }
        
        if (nostate.length>0) {
            this.updateMultipleDevices(nostate)
        }

        return devstate
        
    }
    
    getChangeTimesForDevices = (val,devs) => {

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

    getHistoryForDevice = (dev, prop, page) => {
        
        var url="/list/influx/history/"+dev+"/"+prop
        if (page) {
            url=url+"/"+page
        }

        return fetch(url)
            .then(res=> { return(res.json())})
    }


    changeTimesFromDevices = devs => {

        var devstate={}
        var nostate=[]
        if (devs==null || devs==undefined) {
            return devstate
        } 

        if (!Array.isArray(devs)) {
            devs=[devs]
        }
        for (var i = 0; i < devs.length; i++) {   
            devstate[devs[i].friendlyName]={}
            if (this.state.deviceState.hasOwnProperty(devs[i].friendlyName)) {
                if (this.state.deviceState[devs[i].friendlyName].hasOwnProperty('properties')) {
                    for (var j = 0; j < this.state.deviceState[devs[i].friendlyName].properties.length; j++) {
                        devstate[devs[i].friendlyName][this.state.deviceState[devs[i].friendlyName].properties[j].name]=this.state.deviceState[devs[i].friendlyName].properties[j].timeOfSample;
                    }
                }
            } else if (!this.pendingDevs.includes(devs[i].friendlyName)) {
                this.pendingDevs.push(devs[i].friendlyName)
                nostate.push(devs[i].friendlyName)
            }
        }
        
        if (nostate.length>0) {
            this.updateMultipleDevices(nostate)
        }

        return devstate
        
    }
    
    setRegion = region => {
        this.setState({region: region})
    }

    setPlayer = player => {
        this.setState({player: player})
    }
    

    setLayout = (layoutName, layoutProps) => {
        this.setState({ layoutName : layoutName, layoutProps: layoutProps, layout : this.state.fullLayout[layoutName] })
    }
    
    setLayoutCard = (layoutName, layoutProps) => {
        this.setState({ layoutName : layoutName, layoutProps: layoutProps, layout : { type: "single" } })
    }

    setReturn = (returnName, returnProps) => {
        console.log('setting return',returnName, returnProps)
        this.setState({ returnName : returnName, returnProps: returnProps })
    }

    setBack = (backName, backProps) => {
        this.setState({ backName : backName, backProps: backProps })
    }
    
    goBack = (backName, backProps) => {
        this.setLayoutCard(this.state.backName, this.state.backProps)
        this.setState({ backName: '', backProps: {}})
    }
    
    setLayoutPage = (newPage) => {
        this.setState({ layoutPage : newPage })
    }
    
    sendAlexaCommand = (deviceName, endpointId, controller, command, payload={}) => {
        
        // value is optional for some alexa commands.  The original sofa2 implementation tried to take a string value and then map it to 
        // a value name, but underestimated the requirement for some commands to pass multiple values and needs to be adjusted.
        
        if (endpointId=='') {
            console.log('No endpoint ID was provided for ', deviceName, controller, command, payload)
            endpointId=this.deviceByName(deviceName).endpointId
        }

        var header={"name": command, "namespace":"Alexa." + controller, "payloadVersion":"3", "messageId": this.uuidv4(), "correlationToken": this.uuidv4()}
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
            .then(res=>console.log('Alexa command response:',res.json()))
    }

    catchError = ( error ) => {
        console.log( error );
    }


    restGet = (url) => {

        fetch('/deviceListWithData')
            .then(response => {
                if ( !response.ok ) {
                    this.catchError( response );
                } else {
                    return response.json()
                }
            }).catch( this.catchError );
    }
    
    refreshData = () => {
        console.log('Refreshing device data')
        var newlu = new Date()
        fetch('/deviceListWithData')
            .then(result=>result.json())
            .then(data=>{   this.mergeStates(data['state']);
                            this.updateDeviceList(data['devices'], true);
                            this.setState({lastUpdate : newlu});
            })        
    }

    componentDidMount() {
        //window.addEventListener('resize', this.handleWindowSizeChange);

        this.eventSource.onmessage = e =>
            this.onMessage(e);

        console.log('Fetching device info')
        this.refreshData()

        //fetch('/deviceList')
 		//    .then(result=>result.json())
        //    .then(data=>this.updateDeviceList(data))

  	    fetch('/layout')
 		    .then(result=>result.json())
            .then(result=>this.setState({ fullLayout : result, layout : result[this.state.layoutName]}));


  	    fetch('/directives')
 		    .then(result=>result.json())
            .then(result=>this.setState({directives:result}));

  	    fetch('/properties')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllerProperties:result}));

  	    fetch('/list/logic/virtualDevices')
 		    .then(result=>result.json())
            .then(result=>this.setState({ virtualDevices:result }))
    }

    render() {
        return (
            <DataContext.Provider
                value={{
                    devices: this.state.devices,
                    deviceState: this.state.deviceState,
                    directives: this.state.directives,
                    virtualDevices: this.state.virtualDevices,
                    controllerProperties:this.state.controllerProperties,
                    controllerEvents:this.state.controllerEvents,
                    sendAlexaCommand: this.sendAlexaCommand,
                    deviceByName: this.deviceByName,
                    devicesByCategory: this.devicesByCategory,
                    propertiesFromDevices: this.propertiesFromDevices,
                    getChangeTimesForDevices: this.getChangeTimesForDevices,
                    changeTimesFromDevices: this.changeTimesFromDevices,
                    getHistoryForDevice: this.getHistoryForDevice,
                    deviceByEndpointId: this.deviceByEndpointId,
                    fullLayout: this.state.fullLayout,
                    layout: this.state.layout,
                    layoutName: this.state.layoutName,
                    layoutProps: this.state.layoutProps,
                    layoutPage: this.state.layoutPage,
                    setLayout: this.setLayout,
                    setLayoutCard: this.setLayoutCard,
                    setLayoutPage: this.setLayoutPage,
                    returnName: this.state.returnName,
                    returnProps: this.state.returnProps,
                    setReturn: this.setReturn,
                    goBack: this.goBack,
                    backName: this.state.backName,
                    backProps: this.state.backProps,
                    setBack: this.setBack,
                    setRegion: this.setRegion,
                    region: this.state.region,
                    setPlayer: this.setPlayer,
                    player: this.state.player,
                    heartbeat: this.state.heartbeat,
                    timedOut: this.timedOut,
                    refreshData: this.refreshData,
                    eventSource: this.eventSource,
                    getLastUpdate: this.getLastUpdate,
                    lastUpdate: this.state.lastUpdate,
                    checkUpdate: this.checkUpdate,
                }}
            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export default DataProvider;