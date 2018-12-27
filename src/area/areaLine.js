import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SofaSlider from '../sofaSlider';
import DotLevel from '../DotLevel';

const useStyles = makeStyles({
    
    halves: {
        flexGrow: 1,
        flexBasis: 1,
        boxSizing: "border-box",
    },

});


export default function AreaLine(props) {
    
    const classes = useStyles();
    const [level, setLevel] = useState(0);
    const [delaySet, setDelaySet] = useState(0);

    useEffect(() => {
        computeLevels()
    })
   
    function computeLevels() {

        var highscore=0
        var currentlevel=0
        var scores={}
        var devices=props.devices
        
        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (props.shortcuts.hasOwnProperty(level)) {
                var sceneName=props.shortcuts[level]
                var scene=props.sceneData[sceneName]

                var levscore=0
                for (var light in scene) {    
                    // This is a hack to switch from endpointId to friendlyname
                    for (var j = 0; j < props.devices.length; j++) {
                        if (props.devices[j].endpointId==light) {
                            var lightname=props.devices[j].friendlyName

                            if (props.deviceProperties[lightname]['powerState']=='ON') {
                                var bri=props.deviceProperties[lightname]['brightness']
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
        setLevel(currentlevel)
        return currentlevel
    }

    function runScene(sceneName) {
        props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }
    

    function runShortcut(level) {
        if (props.shortcuts.hasOwnProperty(level.toString())) {
            var sceneName=props.shortcuts[level]
            runScene(sceneName)
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.name)}>{props.name} </ListItemText>
            <ListItemSecondaryAction>
                <DotLevel theme={props.theme} half={true} level={level} select={runShortcut} />
            </ListItemSecondaryAction>

        </ListItem>
    );
}

