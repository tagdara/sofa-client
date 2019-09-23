import React, { useState, useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import SofaAvatarSlider from '../SofaAvatarSlider'

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'
import ToggleChip from '../ToggleChip'
import ModeLines from '../ModeLines'

export default function Receiver(props) {
    
    const { getModes } = useContext(DataContext);
    const [mute, setMute] = useState(props.device.SpeakerController.mute.value);
    const [showDetail, setShowDetail] = useState(false);

    function handleVolumeChange(event) {
        props.device.SpeakerController.directive('SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        setMute(event)
        props.device.SpeakerController.directive('SetVolume', { "mute" : !mute} )
    }; 
    
    function handlePowerChange(event) {
        props.device.PowerController.directive(event.target.checked ? 'TurnOn' : 'TurnOff')
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
    
    function surroundName() {
        var surroundmodes=getModes(props.device).Surround
        if (surroundmodes.hasOwnProperty(props.device.Surround.mode.value)) {
            return surroundmodes[props.device.Surround.mode.value]
        }
        return ""
    }

    return (
        <GridItem wide={props.wide}>
            <ListItem>
                <ToggleAvatar noback={true} onClick={ () => setShowDetail(!showDetail) } avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }>
                    <SpeakerGroupIcon />
                </ToggleAvatar>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={ props.device.PowerController.powerState.value==='OFF' ? 'Off' : (props.device.InputController.input.value) ? props.device.InputController.input.value + " / "+ surroundName() : null}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>

            </ListItem>
        { (props.device.InputController.input.value==='Sonos' && !showDetail) || props.device.PowerController.powerState.value==='OFF'  ? null :
            <SofaAvatarSlider   avatarClick={ () => handleMuteChange(!props.device.SpeakerController.mute.value)} noAvatarBack={true} 
                                avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }
                                name="Volume" min={0} max={100} defaultValue={0} step={1} value={props.device.SpeakerController.volume.value}
                                disabled={ props.device.PowerController.powerState.value==='OFF' } minWidth={240} 
                                change={handleVolumeChange} />
        }
        { !showDetail || props.device.PowerController.powerState.value==='OFF' ? null :
            <React.Fragment>
                <ListItem>
                    <ListItemText primary={"Input"} />
                    { getInputs().map(inp => 
                        <ToggleChip key = {inp} label = { inp } chipState={ props.device.InputController.input.value===inp ? "on" : "off" } onClick={ (e) => handleInput(e, inp)} />
                    )}
                </ListItem>
                <ModeLines device={props.device} />
            </React.Fragment>
        }
        </GridItem>
    );
}

