import { DataContext } from "./DataContext";
import React, { PureComponent, Component, createElement  } from 'react';
import createSocket from "sockette-component";
const Sockette = createSocket({ Component, createElement });

export class DataProvider extends PureComponent {
  
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            deviceState: {},
            controllerProperties: {},
            directives: {},
            virtualDevices: {},
            drafts: {},
            layout: {},
            fullLayout: {},
            layoutName: "Home",
            layoutProps: {},
            layoutPage: "",
            
            returnName: "",
            returnProps: {},
            backName: "",
            backProps: {},
            
            server: "wss://"+window.location.hostname+"/ws",
            socket: null,
            websocketStatus: 'init',
            colorScheme: '',
            theme: {},
            region: "Main",
            player: "",
        };
        
        this.pendingDevs=[];

    }
    
    uuidv4  = ()  => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    onOpen = ev => {
        this.setState({websocketStatus:"connected"})
        console.log("Websocket connected.");
    }
 
    onMessage = ev => {
        var jsondata=JSON.parse(ev.data)
        if (jsondata.hasOwnProperty('event')) {
            if ((jsondata.event.header.name="ChangeReport") && jsondata.payload.hasOwnProperty('change')) {
                //console.log('payload',jsondata.payload)
                for (var j = 0; j < jsondata.payload.change.properties.length; j++) {
                    jsondata.context.properties.push(jsondata.payload.change.properties[j])
                    // TODO: check drafts here
                }
                jsondata.payload={}
                jsondata.event.header.name="StateReport"
                this.mergeState(this.nameByEndPointId(jsondata.event.endpoint.endpointId), jsondata)
            } else {
                console.log('was not changereport', jsondata.event.header.name, jsondata)
            }
        }
    }
 
    onReconnect = ev => {
        console.log("> Reconnecting...", ev);
    }

    onClose = ev => {
        console.log("> Websocket closed.", ev);
    }

    sendMessage = ev => {
        // WebSocket available in state!
        console.log('Sending', ev)
        this.state.socket.send(ev);
    }

    
    sendAlexaCommand = (deviceName, endpointId, controller, command, payload) => {
        
        // value is optional for some alexa commands.  The original sofa2 implementation tried to take a string value and then map it to 
        // a value name, but underestimated the requirement for some commands to pass multiple values and needs to be adjusted.
        
        if (endpointId=='') {
            console.log('No endpoint ID was provided for ', deviceName, controller, command, payload)
            endpointId=this.deviceByName(deviceName).endpointId
        }

        var header={"name": command, "namespace":"Alexa." + controller, "payloadVersion":"3", "messageId": this.uuidv4(), "correlationToken": this.uuidv4()}
        var endpoint={"endpointId": endpointId, "cookie": {}, "scope":{ "type":"BearerToken", "token":"access-token-from-skill" }}

        if (payload===undefined) { payload={} }
        //console.log('Payload',payload, typeof payload)
        if (typeof payload != 'object' ) {
            console.log('old payload format is deprecated, include the name of the value', deviceName, controller, command, payload)
            return false
        }
        
        var data={"directive": {"header": header, "endpoint": endpoint, "payload": payload }}
        console.log('Sending alexa command:',data)
        //this.postAlexaCommand(data)
        fetch('/directive', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>console.log('Alexa command response:',res))
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
            //var prestate={...this.state.deviceState}
            //console.log('update prestate',dev,prestate)
            this.pendingDevs.push(dev)
            //prestate[dev]={}
            //this.setState({deviceState:prestate})
            fetch('/data/devices/'+dev+'?stateReport')
                .then(result=>result.json())
                .then(data=>this.mergeState(dev,data))
        }
    }
    
    draftVal = (dev, controller, val, defaultVal) => {
        
        var drafts=this.state.drafts
        if (!drafts.hasOwnProperty(dev)) {
            drafts[dev]={}
        }
        if (!drafts[dev].hasOwnProperty(controller)) {
            drafts[dev][controller]={}
        }
        if (!drafts[dev][controller].hasOwnProperty(val)) {
            drafts[dev][controller][val]={}
            if (this.state.deviceProperties.hasOwnProperty(dev)) {
                if (this.state.deviceProperties[dev].hasOwnProperty(controller)) {
                    if (this.state.deviceProperties[dev][controller].hasOwnProperty(val)) {
                        drafts[dev][controller][val]=this.state.deviceProperties[dev][controller][val]
                    }
                }
            }
        }
    }

    updateMultipleDevices = (devs) => {

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

    updateDeviceList = (devs) => {

        var udl=[]
        for (var i = 0; i < devs.length; i++) {
            udl.push(devs[i].friendlyName)
        }
        this.setState({devices: devs}, 
            () =>  this.updateMultipleDevices(udl)
        )
    }
    
    devicesByCategory = category => {
        
        if (!category) {
            category='ALL'
        }
        var categoryDevices=[]
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i].displayCategories.includes(category) || category=='ALL') {
                categoryDevices.push(this.state.devices[i])
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
    
    setTheme = theme => {
        this.setState({theme: theme})
    }

    setRegion = region => {
        this.setState({region: region})
    }

    setPlayer = player => {
        this.setState({player: player})
    }

    setColorScheme = scheme => {
        this.setState({colorScheme: scheme})
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
    
    componentDidMount() {
        //window.addEventListener('resize', this.handleWindowSizeChange);
        console.log('Fetching device info')
        fetch('/deviceList')
 		    .then(result=>result.json())
            .then(data=>this.updateDeviceList(data))
            //.then(this.setState({devices: data})

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
                    colorScheme: this.state.colorScheme,
                    setColorScheme: this.setColorScheme,
                    theme: this.state.theme,
                    setTheme: this.setTheme,
                    devices: this.state.devices,
                    deviceState: this.state.deviceState,
                    directives: this.state.directives,
                    virtualDevices: this.state.virtualDevices,
                    websocketStatus: this.state.websocketStatus,
                    controllerProperties:this.state.controllerProperties,
                    sendAlexaCommand: this.sendAlexaCommand,
                    deviceByName: this.deviceByName,
                    devicesByCategory: this.devicesByCategory,
                    propertiesFromDevices: this.propertiesFromDevices,
                    getChangeTimesForDevices: this.getChangeTimesForDevices,
                    changeTimesFromDevices: this.changeTimesFromDevices,
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
                }}
            >
                {this.props.children}
                <Sockette url={this.state.server} getSocket={socket => {this.setState({socket});}}
                    maxAttempts={25} onclose={this.onClose} onopen={this.onOpen} onmessage={this.onMessage} onreconnect={this.onReconnect} />
            </DataContext.Provider>
        );
    }
}

export default DataProvider;