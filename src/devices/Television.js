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
import ErrorBoundary from '../ErrorBoundary';

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
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);
    
    if (props.device.hasOwnProperty('SpeakerController')) {
        const [volume, setVolume] = useState(props.device.SpeakerController.volume.value);
        const [mute, setMute] = useState(props.device.SpeakerController.mute.value);
    }
    const [showRemote, setShowRemote] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const [avinput, setInput] = useState(props.device.InputController.input.value);
    const [inputs, setInputs] = useState({});
    
    function getInputs() {
        var inputlist=[]
        if (props.device.InputController.hasOwnProperty('inputs')) {
            for (var k = 0; k < props.device.InputController.inputs.length; k++) {
                inputlist.push(props.device.InputController.inputs[k].name)
            }
        }
        return inputlist
    }


    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        setVolume(event);
        props.device.SpeakerController.directive('SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.device.SpeakerController.directive('SetVolume', { "mute" : !mute} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        props.device.PowerController.directive(event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
        props.device.InputController.directive('SelectInput', { "input": inputname } )
    }; 
    
    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    return (
        <GridItem wide={props.wide}>
            <ListItem className={classes.listItem}>
            <ErrorBoundary>
                <ToggleAvatar noback={true} onClick={ () => setShowDetail(!showDetail) } avatarState={ props.device.PowerController.powerState.value=='ON' ? "on" : "off" }>
                    <TvIcon />
                </ToggleAvatar>
            </ErrorBoundary>
            <ErrorBoundary>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={props.device.InputController.input.value}/>
            </ErrorBoundary>
                <ListItemSecondaryAction>
                    { props.device.PowerController.powerState.value!='ON' ? null :
                    <IconButton onClick={ () => toggleRemote() } >
                        <ControlCameraIcon />
                    </IconButton>
                    }

                    <Switch color="primary" checked={props.device.PowerController.powerState.value=='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>
            </ListItem>
        { props.device.hasOwnProperty('SpeakerController') && props.device.PowerController.powerState.value=='ON' && showDetail ?
            <ListItem className={classes.listItemBottom}>
                <ToggleAvatar noback={true} onClick={ () => setMuted(!muted)} avatarState={ props.device.PowerController.powerState.value=='ON' ? "on" : "off" }>
                    {props.device.SpeakerController.mute.value ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                </ToggleAvatar>
                <SofaSlider name="Volume" unit="%" min={0} max={100} defaultValue={0} step={1} value={props.device.SpeakerController.volume.value}
                            minWidth={240} preChange={handlePreVolumeChange} change={handleVolumeChange} padLeft={false} />
            </ListItem>
            : null
        }
        { showDetail &&
            <ListItem className={classes.bottomListItem}>
                
                <ListItemText primary={"Input"} />
                { getInputs().map(inp => 
                    <ToggleChip key = {inp} label = { inp } chipState={ props.device.InputController.input.value==inp ? "on" : "off" } onClick={ (e) => handleInput(e, inp)} />
                )}
            </ListItem>
        }
        { showRemote &&
            <ListItem className={classes.remoteListItem}>
                <TvRemote device={props.device} />
            </ListItem>
        }

        </GridItem>
    );
}

