import React from 'react';
import { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

import SofaSlider from '../SofaSlider'

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'
import ToggleChip from '../ToggleChip'

export default function Receiver(props) {
    
    const [mute, setMute] = useState(props.device.SpeakerController.mute.value);
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);
    const [showDetail, setShowDetail] = useState(false);
    const [volume, setVolume] = useState(props.device.SpeakerController.volume.value);

    function handleVolumeChange(event) {
        props.device.SpeakerController.directive('SetVolume', { "volume" : event} )
    }; 

    function handleVolumePreChange(event) {
        setVolume(event)
    }

    function handleMuteChange(event) {
        setMute(event)
        props.device.SpeakerController.directive('SetVolume', { "mute" : !mute} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        props.device.PowerController.directive(event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleSurround(event, surroundmode) {
        props.device.SurroundController.directive('SetSurround', {"surround": surroundmode } )
    }; 
    
    function handleInput(event, inputname) {
        props.device.InputController.directive('SelectInput', { "input": inputname } )
    }; 

    function getInputs() {
        var inputlist=[]
        if (props.device.InputController.hasOwnProperty('inputs')) {
            for (var k = 0; k < props.device.InputController.inputs.length; k++) {
                inputlist.push(props.device.InputController.inputs[k].name)
            }
        }
        return inputlist
    }

    return (
        <GridItem wide={props.wide}>
            <ListItem>
                <ToggleAvatar noback={true} onClick={ () => setShowDetail(!showDetail) } avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }>
                    <SpeakerGroupIcon />
                </ToggleAvatar>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={ props.device.PowerController.powerState.value==='OFF' ? 'Off' : (props.device.InputController.input.value) ? props.device.InputController.input.value + " / "+ props.device.SurroundController.surround.value : null}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={powerState==='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>

            </ListItem>
        { (props.device.InputController.input.value==='Sonos' && !showDetail) || props.device.PowerController.powerState.value==='OFF'  ? null :
            <ListItem>
                <ToggleAvatar onClick={ () => handleMuteChange(!props.device.SpeakerController.mute.value)} noback={true} avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }>
                    { props.device.PowerController.powerState.value!=='ON' ? <VolumeMuteIcon /> :
                        (props.device.SpeakerController.mute.value) ? <VolumeOffIcon /> :  volume
                    }
                </ToggleAvatar>
                <SofaSlider name="Volume" min={0} max={100} defaultValue={0} step={1} value={props.device.SpeakerController.volume.value}
                            disabled={ props.device.PowerController.powerState.value==='OFF' } minWidth={240} preChange={handleVolumePreChange} change={handleVolumeChange} />
            </ListItem>
        }
        { !showDetail || props.device.PowerController.powerState.value==='OFF' ? null :
            <React.Fragment>
                <ListItem>
                    <ListItemText primary={"Input"} />
                    { getInputs().map(inp => 
                        <ToggleChip key = {inp} label = { inp } chipState={ props.device.InputController.input.value===inp ? "on" : "off" } onClick={ (e) => handleInput(e, inp)} />
                    )}
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Surround Sound"} />
                        <ToggleChip 
                            key = '7ch Stereo'
                            label= '7ch Stereo'
                            chipState={ props.device.SurroundController.surround.value==='7ch Stereo' ? "on" : "off" }
                            onClick={ (e) => handleSurround(e, '7ch Stereo')}
                        />
                        <ToggleChip 
                            key = 'Surround Decoder'
                            label='Surround Decoder'
                            chipState={ props.device.SurroundController.surround.value==='Surround Decoder' ? "on" : "off" }
                            onClick={ (e) => handleSurround(e, 'Surround Decoder')}
                        />
                </ListItem>
            </React.Fragment>
        }
        </GridItem>
    );
}

