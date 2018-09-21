import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slide from  '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GroupLight from './devices/grouplight'
import Light from './devices/light'
import SceneEditor from './sceneEditor'

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
    tabRow: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary[500],
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
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



function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class AreaDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
        };
        this.avgState = this.avgState.bind(this);

    }
    
    computeLevels() {

        var highscore=0
        var currentlevel=0
        var scores={}

        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (this.props.sceneData['shortcuts'].hasOwnProperty(level)) {
                var sceneName=this.props.sceneData['shortcuts'][level]
                var scene=this.props.sceneData['scenes'][sceneName]

                var levscore=0
                for (var light in scene) {        
                    if (this.props.deviceProperties.hasOwnProperty(light)) {
                        if (this.props.deviceProperties[light]['powerState']=='ON') {
                            var bri=this.props.deviceProperties[light]['brightness']
                        } else {
                            var bri=0
                        }
                        levscore+=(50-Math.abs(bri-scene[light]['set']))
                    }
                }

                scores[level]=levscore
                if (levscore>highscore) {
                    currentlevel=i
                    highscore=levscore
                }
            }
        }

        if (this.state.computedLevel!=currentlevel) {
            this.setState({computedLevel:currentlevel, level:currentlevel})
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
                    return <Light key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />

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

    handleLevelChange = scene => {

        if (this.props.sceneData.hasOwnProperty(scene)) {
            for (var light in this.props.sceneData[scene]) {
                if (this.props.deviceProperties.hasOwnProperty(light)) {
                    if (this.props.sceneData[scene][light]['set']==0) {
                        if (this.props.deviceProperties[light].powerState!='OFF') {
                            var ops={"op":"set", "path":"discovery/"+light+"/PowerController/powerState", "command":"TurnOff", "value":true}
                            console.log('Setting',light ,'off')
                            this.props.sendMessage(JSON.stringify(ops));
                        }
                    } else if (this.props.sceneData[scene][light]['set']>0) {
                        if (this.props.deviceProperties[light].powerState!='ON') {
                            var ops={"op":"set", "path":"discovery/"+light+"/PowerController/powerState", "command":"TurnOn", "value":true}
                            console.log('Setting',light ,'on')
                            this.props.sendMessage(JSON.stringify(ops));
                        }
                        if (this.props.deviceProperties[light].brightness!=this.props.sceneData[scene][light]['set']) {
                            var ops={"op":"set", "path":"discovery/"+light+"/BrightnessController/brightness", "command":"SetBrightness", "value":this.props.sceneData[scene][light]['set']}
                            console.log('Setting',light ,'to',this.props.sceneData[scene][light]['set'])
                            this.props.sendMessage(JSON.stringify(ops));
                        }
                    }
                } else {
                    console.log('Light not in device properties',light)
                }
            }
        }
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
        this.computeLevels()
    }
    
    render() {
        const { classes, fullScreen } = this.props;
        const { devices } = this.state;  
        return (
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={this.props.open}
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle id="area-dialog-title" className={classes.tabTitle} >
                    <Paper className={classes.tabInfo} elevation={0}>
                        <Typography variant="subheading"  className={classes.gridTitle} >{this.props.name}</Typography>
                    </Paper>
                    <Tabs className={classes.tabRow} value={this.state.frontTab} onChange={this.handleTab}>
                        <Tab label="Scenes" />
                        <Tab label="Lights" />
                    </Tabs>
                </DialogTitle>

                { this.props.name!='All' && this.state.frontTab==1 ?
                <DialogTitle className={classes.groupHead}>
                    <GroupLight key={ this.props.name } name={ this.props.name } deviceProperties={ this.props.deviceProperties } devices={ this.props.devices } avgState={ this.avgState } sendMessage={this.props.sendMessage} />
                    <Divider />                
                </DialogTitle>
                : null
                }
                { this.state.frontTab==1 ?
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.root}>
                    {
                        Object.keys(this.props.devices).sort().map(c => (
                            this.renderSwitch(this.props.devices[c])))
                    }
                  </List>
                </DialogContent>
                :
                <SceneEditor computedLevel={this.state.computedLevel} handleLevelChange={this.handleLevelChange} edit={this.state.edit} editFinished={this.editFinished} lightList={this.lightList()} area={this.props.name} sendMessage={this.props.sendMessage} />
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
            </Dialog>
        );
    }
}

AreaDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};


export default withStyles(styles)(withMobileDialog()(AreaDialog));

