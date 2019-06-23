import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import Switch from '@material-ui/core/Switch';
import TvIcon from '@material-ui/icons/Tv';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';

import SofaSlider from '../SofaSlider'
import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'
import ToggleChip from '../ToggleChip'
import TvRemote from './TvRemote';

const useStyles = makeStyles({
    list: {
        width: "100%",
    },
    xlist: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    xlistItem: {
        width: '100%',
        minHeight: 48,
        padding: 0,
    },
    bottomListItem: {
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    xx: {
        minHeight: 48,
        padding: 8,
    },
		xlistItemBottom: {
				padding: "16 0 0 0",
		}
});

export default function Television(props) {
    
    const classes = useStyles();
    const [powerState, setPowerState] = useState(props.deviceProperties.powerState);
    const [volume, setVolume] = useState(props.deviceProperties.volume);
    const [muted, setMuted] = useState(props.deviceProperties.muted);
    const [showRemote, setShowRemote] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const [avinput, setInput] = useState(props.deviceProperties.input);
    const [inputs, setInputs] = useState({});
    
    function getInputs() {
        var inputlist=[]
        for (var j = 0; j < props.device.capabilities.length; j++) {
            if (props.device.capabilities[j].interface=="Alexa.InputController") {
                if (props.device.capabilities[j].hasOwnProperty('inputs')) {
                    for (var k = 0; k < props.device.capabilities[j].inputs.length; k++) {
                        inputlist.push(props.device.capabilities[j].inputs[k].name)
                    }
                }
            }
        }
        return inputlist
    }

    function hasSpeaker() {
        for (var j = 0; j < props.device.capabilities.length; j++) {
            if (props.device.capabilities[j].interface=="Sofa.SpeakerController") {
                return true
            }
        }
        return false
    }

    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'SpeakerController', 'SetMute', { "muted" : !muted} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 
    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    return (
        <GridItem wide={props.wide}>
            <ListItem className={classes.listItem}>
                <ToggleAvatar onClick={ () => setShowDetail(!showDetail) } avatarState={ props.deviceProperties.powerState=='ON' ? "on" : "off" }>
                    <TvIcon />
                </ToggleAvatar>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.name} secondary={props.deviceProperties.input ? props.deviceProperties.input : null}/>
                <ListItemSecondaryAction>
                    { props.deviceProperties.powerState!='ON' ? null :
                    <IconButton onClick={ () => toggleRemote() } >
                        <ControlCameraIcon />
                    </IconButton>
                    }

                    <Switch color="primary" checked={props.deviceProperties.powerState=='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>

            </ListItem>
        { hasSpeaker() && props.deviceProperties.powerState=='ON' && showDetail ?
            <ListItem className={classes.listItemBottom}>
                <ToggleAvatar onClick={ () => setMuted(!muted)} avatarState={ props.deviceProperties.powerState=='ON' ? "on" : "off" }>
                    {props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                </ToggleAvatar>
                <SofaSlider name="Volume" unit="%" min={0} max={100} defaultValue={0} step={1} value={props.deviceProperties.volume}
                            minWidth={240} preChange={handlePreVolumeChange} change={handleVolumeChange} padLeft={true} />
            </ListItem>
            : null
        }
        { showDetail &&
            <ListItem className={classes.bottomListItem}>
                <ListItemText primary={"Input"} />
                { getInputs().map(inp => 
                    <ToggleChip key = {inp} label = { inp } chipState={ props.deviceProperties.input==inp ? "on" : "off" } onClick={ (e) => handleInput(e, inp)} />
                )}
            </ListItem>
        }
        { showRemote &&
            <ListItem className={classes.remoteListItem}>
                <TvRemote endpointId={props.device.endpointId} name={props.device.friendlyName} sendAlexaCommand={props.sendAlexaCommand} />
            </ListItem>
        }

        </GridItem>
    );
}

