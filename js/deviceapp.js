import React, { Component, createElement  } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './theme';
import PageAV from "./pages/pageAV"
import PageLights from "./pages/pageLights"
import PageSecurity from "./pages/pageSecurity"
import PageOther from "./pages/pageOther"

import BottomNav from './bottomnav'
import createSocket from "sockette-component";
import Grid from '@material-ui/core/Grid';


const Sockette = createSocket({
    Component,
    createElement
});

const styles = {
    
    root: {
        flexGrow: 1,
    },
    
    flex: {
        flex: 1,
    },
    
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    
    oScroll: {
        WebkitOverflowScrolling: "touch",
    },
    
    phoneTop: {
        paddingTop: "env(safe-area-inset-top)",
    },
    
    ws: {
        padding: '16px 4px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    controlArea: {
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        maxWidth: 1440,
        paddingBottom:32,  
        display: "flex",
        flexDirection: "column",
    },
    gridColumn: {
        alignItems: "center",
    }
    
};


class DeviceApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            socket: null,
            status: 'connecting',
            server: "ws://"+window.location.hostname+":8090/ws",
            lastUpdate: {'op':'Initialize'},
            rawUpdate: {},
            page: 'Audio Video',
            devices: [],
            deviceState: {}
        };
        
        this.pendingDevs=[];
        
        this.sendMessage = this.sendMessage.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.updateDevice = this.updateDevice.bind(this);
        this.propertiesFromDevices = this.propertiesFromDevices.bind(this);
        this.devicesByCategory = this.devicesByCategory.bind(this);
        this.deviceByName = this.deviceByName.bind(this);

    }    
 
    onOpen = ev => {
        this.setState({status:"connected"})
        console.log("> Connected!", ev, this.state);
    }
 
 
    onMessage = ev => {
        var jsondata=JSON.parse(ev.data)
        //console.log("> Received:", jsondata);
        if (jsondata.hasOwnProperty('event')) {
            var devState=this.state.deviceState;
            for (var dev in this.state.deviceState) {
                if (this.state.deviceState[dev].event.endpoint.endpointId==jsondata.event.endpoint.endpointId) {
                    console.log('Match',dev,this.state.deviceState[dev],jsondata.event.endpoint.endpointId)
                    if ((jsondata.event.header.name="ChangeReport") && jsondata.payload.hasOwnProperty('change')) {
                        console.log('payload',jsondata.payload)
                        for (var j = 0; j < jsondata.payload.change.properties.length; j++) {
                            jsondata.context.properties.push(jsondata.payload.change.properties[j])
                        }
                        jsondata.payload={}
                        jsondata.event.header.name="StateReport"
                        console.log('Props:',jsondata.context.properties)
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
    
    pageChange = page => {
        this.setState({page:page.value})
        console.log(page)
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
        this.setState({deviceState:devstate})
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

    updateMultipleDevices = devs => {

        fetch('/data/devices?stateReport', {
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


    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        console.log('Fetching device info')
        fetch('/data/devices')
 		    .then(result=>result.json())
            .then(data=>this.setState({devices: data})); 
    }
    
    devicesByCategory = category => {
        
        var categoryDevices=[]
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i].displayCategories.includes(category)) {
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
        
        for (var i = 0; i < this.state.devices.length; i++) {
            if (this.state.devices[i].friendlyName==devname) {
                return this.state.devices[i]
            }
        }
    }

    propertiesFromDevices = devs => {
        
        //console.log('startig pfd')
        var devstate={}
        var nostate=[]
        if (devs==null) {
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
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {

        const { classes } = this.props;
        const { width } = this.state;
        //const socket = io.connect(this.state.server)
        const isMobile = width <= 800;
        
        if (isMobile) {
        
            return (
                <div>
                    <AppBar className={classes.phoneTop}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                { this.state.page }
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Toolbar />
                    <div className={classes.controlArea}>
                        {this.state.page == 'Audio Video' ?
                            <PageAV devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage} />
                        : null }
                        {this.state.page == 'Lights' ?
                            <PageLights devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage} />
                        : null }
                        {this.state.page == 'Security' ?
                            <PageSecurity devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage}/>
                        : null }
                        {this.state.page == 'Other' ?
                            <PageOther devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage}/>
                        : null }
                    </div>
                    <Toolbar />
                    <BottomNav className={classes.phoneBottom} pageChange={this.pageChange} />
                    <Sockette 
                        url={this.state.server}
                        getSocket={socket => {
                            this.setState({socket});
                        }}
                        maxAttempts={25}
                        onopen={this.onOpen}
                        onmessage={this.onMessage}
                        onreconnect={this.onReconnect}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <AppBar className={classes.phoneTop}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Home
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Toolbar />

                    <div className={classes.controlArea}>
                        <Grid container spacing={16}>
                            <Grid item xs={4} className={classes.gridColumn}>
                                <PageAV devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage} />
                            </Grid>
                            <Grid item xs={4} className={classes.gridColumn}>
                                <PageLights devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage} />
                            </Grid>
                            <Grid item xs={4} className={classes.gridColumn}>
                                <PageSecurity devicesByCategory={this.devicesByCategory} deviceByName={this.deviceByName} propertiesFromDevices={this.propertiesFromDevices} sendMessage={this.sendMessage} />
                            </Grid>
                        </Grid>
                    </div>
                    <Sockette 
                        url={this.state.server}
                        getSocket={socket => {
                            this.setState({socket});
                        }}
                        maxAttempts={25}
                        onopen={this.onOpen}
                        onmessage={this.onMessage}
                        onreconnect={this.onReconnect}
                    />
                </div>
            );
        }
    }
}

DeviceApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceApp);
