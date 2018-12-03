import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SofaSlider from '../sofaSlider';

const styles  = theme =>  ({
    
    halves: {
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
    },
    areaListItem: {
        display: "flex",
        height: 64,
        padding: "16 32 16 24",
        alignItems: "center",
    },
});


class Area extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            level: 0,
            delaySet: false,
        };
    }
    
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (nextProps.hasOwnProperty('deviceProperties')) {
            changes.devices=nextProps.devices
            changes.deviceProperties=nextProps.deviceProperties
            if (prevState.hasOwnProperty('delaySet')) {
                if (!prevState.delaySet) {
                    changes.level=Area.computeLevels(nextProps.sceneData, data, nextProps, prevState)
                }
            } else {
                changes.level=Area.computeLevels(nextProps.sceneData, data, nextProps, prevState)
            }
        }
        return changes
    }
    
    
    static computeLevels(sceneData, deviceProperties, nextProps, prevState) {

        var highscore=0
        var currentlevel=0
        var scores={}
        var devices=nextProps.devices
        
        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (nextProps.shortcuts.hasOwnProperty(level)) {
                var sceneName=nextProps.shortcuts[level]
                var scene=nextProps.sceneData[sceneName]

                var levscore=0
                for (var light in scene) {    
                    // This is a hack to switch from endpointId to friendlyname
                    for (var j = 0; j < devices.length; j++) {
                        if (devices[j].endpointId==light) {
                            var lightname=devices[j].friendlyName

                            if (deviceProperties[lightname]['powerState']=='ON') {
                                var bri=deviceProperties[lightname]['brightness']
                            } else {
                                var bri=0
                            }
                            levscore+=(50-Math.abs(bri-scene[light]['brightness']))
                            break
                        }
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

    handlePreLevelChange = (event, level) => {
        console.log(level)
        this.setState({ level: level, delaySet: true});
    }; 

    runScene = sceneName => {
        this.props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false},
                () =>  Area.computeLevels(this.props.sceneData,this.props.deviceProperties, this.state)
        );
    }
    
    delaySliderUpdates = () => {
        this.setState({ delaySet: true},
            () =>  setTimeout(() => endSliderDelay(), 1000)
        )
    }

    runShortcut = (level) => {
        if (this.props.shortcuts.hasOwnProperty(level.toString())) {
            var sceneName=this.props.shortcuts[level]
            this.runScene(sceneName)
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }

    render() {
        
        const { classes } = this.props;

        return (
            <ListItem className={classes.areaListItem}>
                <Typography variant="subtitle1" className={classes.halves} onClick={ () => this.props.selectArea(this.props.name)}>{this.props.name}</Typography>
                <SofaSlider half={true} value={this.state.level} step={1} min={0} max={3} 
                        preChange={this.handlePreLevelChange} change={this.runShortcut} />
            </ListItem>
        );
    }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Area);

