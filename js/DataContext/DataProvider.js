import { DataContext } from "./DataContext";
import React, { Component, createElement  } from 'react';
import createSocket from "sockette-component";
const Sockette = createSocket({ Component, createElement });

export class DataProvider extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            deviceState: {},
            controllers: {},
            directives: {},
            virtualDevices: {},
            
            server: "wss://"+window.location.hostname+"/ws",
            socket: null,
            websocketStatus: 'init',
            colorScheme: '',
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
        //console.log("> Received:", jsondata);
        if (jsondata.hasOwnProperty('event')) {
            var devState=this.state.deviceState;
            for (var dev in this.state.deviceState) {
                if (this.state.deviceState[dev].event.endpoint.endpointId==jsondata.event.endpoint.endpointId) {
                    //console.log('Match',dev,this.state.deviceState[dev],jsondata.event.endpoint.endpointId)
                    if ((jsondata.event.header.name="ChangeReport") && jsondata.payload.hasOwnProperty('change')) {
                        //console.log('payload',jsondata.payload)
                        for (var j = 0; j < jsondata.payload.change.properties.length; j++) {
                            jsondata.context.properties.push(jsondata.payload.change.properties[j])
                        }
                        jsondata.payload={}
                        jsondata.event.header.name="StateReport"
                        //console.log('Props:',jsondata.context.properties)
                    }
                    devState[dev]=jsondata
                }
            }

            this.setState({ deviceState: devState })
        } else {
            this.setState({ rawUpdate: JSON.parse(ev.data)})
        }
    }
 
    onReconnect = ev => {
        console.log("> Reconnecting...", ev);
    }
 
    sendMessage = ev => {
        // WebSocket available in state!
        console.log('Sending', ev)
        this.state.socket.send(ev);
    }

    
    sendAlexaCommand = (deviceName, endpointId, controller, command, val) => {
        
        // value is optional for some alexa commands.  The original sofa2 implementation tried to take a string value and then map it to 
        // a value name, but underestimated the requirement for some commands to pass multiple values and needs to be adjusted.
        
        if (endpointId=='') {
            console.log('No endpoint ID was provided for ', deviceName, controller, command, val)
            endpointId=this.deviceByName(deviceName).endpointId
        }

        var header={"name": command, "namespace":"Alexa." + controller, "payloadVersion":"3", "messageId": this.uuidv4(), "correlationToken": this.uuidv4()}
        var endpoint={"endpointId": endpointId, "cookie": {}, "scope":{ "type":"BearerToken", "token":"access-token-from-skill" }}


        if (this.state.controllers[controller][command]) {
            var payload=JSON.parse(JSON.stringify(this.state.controllers[controller][command]))
        } else {
            var payload={}
        }

        for (var prop in payload) {
            if (payload[prop]=='value') {
                payload[prop]=val
                break
            }
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
            devstate[dev]=change
            this.setState({deviceState:devstate})
            return true
        } 
    }
    
    mergeStates = (devs) => {
        var devstate= {...this.state.deviceState, ...devs }
        this.setState({deviceState:devstate}, 
            () => console.log('Merge state done', Object.keys(devs).length)
        )
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
                if (this.state.deviceState[devs[i].friendlyName].hasOwnProperty('context')) {
                    for (var j = 0; j < this.state.deviceState[devs[i].friendlyName].context.properties.length; j++) {
                        devstate[devs[i].friendlyName][this.state.deviceState[devs[i].friendlyName].context.properties[j].name]=this.state.deviceState[devs[i].friendlyName].context.properties[j].value;
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

    setColorScheme = scheme => {
        console.log('set color scheme', scheme)
        console.log('this',this)
        this.setState({colorScheme: scheme})
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        console.log('Fetching device info')
        fetch('/deviceList')
 		    .then(result=>result.json())
            .then(data=>this.updateDeviceList(data))
            //.then(this.setState({devices: data})
            
  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));

  	    fetch('/directives')
 		    .then(result=>result.json())
            .then(result=>this.setState({directives:result}));


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
                    
                    devices: this.state.devices,
                    deviceState: this.state.deviceState,
                    directives: this.state.directives,
                    virtualDevices: this.state.virtualDevices,
                    websocketStatus: this.state.websocketStatus,
                    controllers:this.state.controllers,
                    sendAlexaCommand: this.sendAlexaCommand,
                    deviceByName: this.deviceByName,
                    devicesByCategory: this.devicesByCategory,
                    propertiesFromDevices: this.propertiesFromDevices,
                    deviceByEndpointId: this.deviceByEndpointId,
                }}
            >
                {this.props.children}
                <Sockette url={this.state.server} getSocket={socket => {this.setState({socket});}}
                    maxAttempts={25} onopen={this.onOpen} onmessage={this.onMessage} onreconnect={this.onReconnect} />
            </DataContext.Provider>
        );
    }
}

export default DataProvider;