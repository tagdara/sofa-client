import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SofaAvatarSlider from '../SofaAvatarSlider'

import GridItem from '../GridItem';
import ToggleAvatar from '../ToggleAvatar';

export default function Computer(props) {

    function handlePowerChange(event) {

        if (event.target.checked) {
            props.directive(props.device.endpointId, "PowerController", "TurnOn", {}, {}, "")
        } else {
            props.directive(props.device.endpointId, "PowerController", "TurnOff", {}, {}, "")
        }
    }; 

    function handleLockChange(event) {

        if (event.target.checked) {
            props.directive(props.device.endpointId, "LockController" , "Lock", {}, {}, "")
        } else {
            props.directive(props.device.endpointId, "LockController" , "Unlock", {}, {}, "")
        }
    }; 
    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "mute" : !props.deviceState.SpeakerController.mute.value } )
    }; 
 
    
    return (
        props.deviceState?
        <GridItem >
            <ListItem>
                <ToggleAvatar noback={true} avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? 'on' : 'off'}><DesktopWindowsIcon /></ToggleAvatar>
                { props.deviceState.PowerController.powerState.value==='ON' ?
                <ListItemText primary={props.device.friendlyName} secondary={props.deviceState.LockController.lockState.value==='LOCKED' ? 'Locked':'Unlocked'}/>
                : 
                <ListItemText primary={props.device.friendlyName} secondary={'Powered off'}/>
                }
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={handlePowerChange} />
                </ListItemSecondaryAction>
            </ListItem>
            { props.deviceState.PowerController.powerState.value==='ON' &&
                <>
                <SofaAvatarSlider   label={"Volume"} 
                                    small={true} reverse={true} minWidth={64} 
                                    value={props.deviceState.SpeakerController.volume.value}
                                    change={handleVolumeChange} 
                                    avatarClick={ () => handleMuteChange(!props.deviceState.SpeakerController.mute.value)} 
                                    avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? "on" : "off" }
                                    disabled={ props.deviceState.PowerController.powerState.value==='OFF' }
                />
                <ListItem>
                    <ToggleAvatar avatarState={ props.deviceState.LockController.lockState.value==='LOCKED' ? 'off' : 'on'}>
                        { props.deviceState.LockController.lockState.value==='LOCKED' ? <LockIcon /> : <LockOpenIcon /> }
                    </ToggleAvatar>
                    <ListItemSecondaryAction>
                        <Switch color="primary" checked={props.deviceState.LockController.lockState.value==='LOCKED'} onChange={handleLockChange} />
                    </ListItemSecondaryAction>
               </ListItem>
               </>
            }

        </GridItem>   
        :null
    );
}
