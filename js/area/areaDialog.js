import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import CloseIcon from '@material-ui/icons/Close';

import SofaDialog from '../sofaDialog'
import GroupLight from '../light/grouplight'
import Light from '../light/light'
import SceneEditorArea from '../sceneEditorArea'

const styles  = theme =>  ({
    
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    nogrow: {
        flex: 1,
    },
    slider: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        
    },
    touchSized: {
        height: 72,
    },
    halves: {
        width: '50%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paperItem: {
        display: "flex",
        height: 40,
        padding: "16px",
        alignItems: "center",
    },
    tabTitle: {
        padding: 0,
        backgroundColor: theme.palette.primary.dark,
    },
    xtabTitle: {
        backgroundColor: theme.palette.primary.dark,
        width: "100%",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    xtabRow: {
        padding:0,
        width: "100%",
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    baseTitle: {
        minHeight: 48,
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        height: "100%",
        padding: 0,
    },
    groupHead: {
        backgroundColor: theme.palette.primary[100],
        padding: 0,
    }
});


class AreaDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scenes: {},
            shortcuts: {},
            lights: {},
            frontTab: 0,
            computedLevel: 0,
            level: 0,
            brightness: 0,
            powerState: false,
            colorTemperatureInKelvin: 4000,
            target: null,
            open: false,
            endpointIdCache: [],
            lastmessage: '',
            updates: {},
            areaState: {},
            edit: false,
            delaySet: false,

        };
        this.avgState = this.avgState.bind(this);

    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}

        if (nextProps.hasOwnProperty('deviceProperties')) {
            changes.devices=nextProps.devices
            changes.deviceProperties=nextProps.deviceProperties
            if (prevState.hasOwnProperty('delaySet')) {
                if (!prevState.delaySet) {
                    changes.level=AreaDialog.computeLevels(nextProps, nextProps.sceneData, data, prevState)
                }
            }
        }

        return changes
    }
    
    static nameByEndpointId = (endpointId, devices) => {
        var fn=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i]['endpointId']==endpointId) {
                return devices[i].friendlyName
            } 
        }
    }
    
    static computeLevels(nextProps, sceneData, deviceProperties, prevState) {

        var highscore=0
        var currentlevel=0
        var scores={}

        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (nextProps.shortcuts.hasOwnProperty(level)) {
                var sceneName=nextProps.shortcuts[level]
                var scene=nextProps.sceneData[sceneName]
                var levscore=0
                for (var light in scene) {
                    var lightname=AreaDialog.nameByEndpointId(light,nextProps.devices)
                    if (deviceProperties.hasOwnProperty(lightname)) {
                         if (deviceProperties[lightname]['powerState']=='ON') {
                            var bri=deviceProperties[lightname]['brightness']
                        } else {
                            var bri=0
                        }
                        levscore+=(50-Math.abs(bri-scene[light]['brightness']))
                    }
                }

                scores[level]=levscore
                if (levscore>highscore) {
                    currentlevel=i
                    highscore=levscore
                }
            }
        }

        return currentlevel
    }    


    lightList() {
        
        var lights=[]
        for (var dev in this.props.deviceProperties) {
            if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {
                lights.push(dev)
            }
        }
        return lights
    }

    avgState(prop) {
        
        if (prop=='on') {
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        return true
                    }
                }
            }
            return false
            
        } else if (prop=='brightness') {
            var brightnessCount=0;
            var totalbrightness=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {
                    brightnessCount=brightnessCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totalbrightness=totalbrightness+this.props.deviceProperties[dev].brightness;
                    }
                }
            }
            if (brightnessCount==0) { return 0 }
            var avgb=totalbrightness/brightnessCount
            return avgb;
        
        } else if (prop=='temperature') {
            var temperatureCount=0;
            var totaltemperature=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('colorTemperatureInKelvin')) {
                    temperatureCount=temperatureCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totaltemperature=totaltemperature+this.props.deviceProperties[dev].colorTemperatureInKelvin;
                    }
                }
            }
            if (temperatureCount==0) { return 0 }
            var avgb=totaltemperature/temperatureCount
            return avgb;
        
        } else {
            return 0;
        }
        
    }
    
    anyOn() {
        for (var dev in this.props.deviceProperties) {
            if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                if (this.props.deviceProperties[dev].powerState=='ON') {
                    return true
                }
            }
        }
        return false
    }

    renderSwitch(device) {

        if (device==={} || device==undefined) {
            return null;
        }
        if (device.hasOwnProperty('displayCategories')) {
            switch(device.displayCategories[0]) {
                case 'LIGHT':
                    var capabilities=[]
                    for (var i = 0; i < device.capabilities.length; i++) {
                        capabilities.push(device.capabilities[i].interface)
                    }
                    return <Light sendAlexaCommand={this.props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } />

                default:
                    return null;
            }
        }
    }
    
    state = {
        open: false,
    };

    handlePreLevelChange = event => {
        this.setState({ level: event });
    }; 


    handleTab = (event, tabno) => {
        if (tabno==0) { this.setState({frontTab: tabno})}
        if (tabno==1) { this.setState({frontTab: tabno})}
    };   
    
    handleEdit = () => {
        this.setState({edit:true})
    }
    
    editFinished = () => {
        this.setState({edit:false})
    }
    
    componentDidMount() {    
  	    fetch('/list/logic/area/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.setState(result))
    }
    
    render() {
        const { classes, fullScreen } = this.props;
        const { devices } = this.state;  
        
        return (
            <SofaDialog title={this.props.name} open={this.props.open} close={this.props.close} tabChange={this.handleTab} tabValue={this.state.frontTab}
                        tabs={ ['Scenes','Lights']} >
                                
                { this.props.name!='All' && this.state.frontTab==1 ?
                <DialogTitle className={classes.groupHead}>
                    <GroupLight sendAlexaCommand={this.props.sendAlexaCommand} key={ this.props.name } name={ this.props.name } deviceProperties={ this.props.deviceProperties } devices={ this.props.devices } avgState={ this.avgState } />
                    <Divider />                
                </DialogTitle>
                : null
                }
                { this.state.frontTab==1 ?
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.root}>
                    { Object.keys(this.props.devices).sort().map(c => (
                            this.renderSwitch(this.props.devices[c])
                    ))}
                  </List>
                </DialogContent>
                :
                <SceneEditorArea sendAlexaCommand={this.props.sendAlexaCommand} name={this.props.name} computedLevel={this.state.level} edit={this.state.edit} editFinished={this.editFinished} lightList={this.lightList()} area={this.props.name} />
                }
                <Divider />
                <DialogActions className={classes.dialogActions}>
                    {this.state.edit ?
                        <Button onClick={this.editFinished} color="primary" autoFocus>Cancel</Button>
                    :
                        <Button onClick={this.handleEdit} color="primary">Edit</Button>
                    }
                    {this.state.edit ?
                        null:
                        <Button onClick={this.props.close} color="primary" autoFocus>OK</Button>
                    }
                </DialogActions>
            </SofaDialog>
        );
    }
}

AreaDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AreaDialog);

