import React, { useState, useEffect } from 'react';
import SofaListItem from '../SofaListItem';

import IconButton from '@material-ui/core/IconButton';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SofaAvatarSlider from '../SofaAvatarSlider'
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import { makeStyles } from '@material-ui/styles';
import CardBase from '../CardBase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
    return {        
        middleButton: {
            marginRight: 16,
        },
        spinner: {
            margin :0,
        }
    }
})

export default function Computer(props) {
    
    const classes = useStyles();
    const [wolFlip, setWolFlip]=useState(false)
    
    useEffect(() => {
        try {
            if (props.deviceState.PowerController.powerState.value==='ON') {
                setWolFlip(false)
            }
        }
        
        catch {}
        
    // eslint-disable-next-line     
    }, [ wolFlip, props.deviceState ])

    
    function turnOn() {
        setWolFlip(true)
        props.directive(props.device.endpointId, "PowerController", "TurnOn", {}, {}, "")

    }; 

    function turnOff() {
        props.directive(props.device.endpointId, "PowerController", "TurnOff", {}, {}, "")
    }; 
 
    function handleLockButton(event) {

        if (event) {
            props.directive(props.device.endpointId, "LockController" , "Lock", {}, {}, "")
        } else {
            props.directive(props.device.endpointId, "LockController" , "Unlock", {}, {}, "")
        }
    }; 

    
    function handleVolumeChange(event) {
        props.directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.directive(props.device.endpointId, 'SpeakerController', 'SetMute', { "mute" : !props.deviceState.SpeakerController.mute.value } )
    }; 
    
    function secondaryText() {
        if (props.deviceState.PowerController.powerState.value==='ON' && props.deviceState.EndpointHealth.connectivity.deepvalue==='OK') {
            if (props.deviceState.LockController.lockState.value==='LOCKED') { return 'Locked' }
            return 'Unlocked'
        } 
        return 'Powered off'
    }

    return (
        props.deviceState ?
            <CardBase >
                <SofaListItem   inList={true} avatarBackground={false} avatarState={ (props.deviceState.PowerController.powerState.value==='ON' && props.deviceState.EndpointHealth.connectivity.deepvalue==='OK') ? 'on' : 'off'}
                                avatar={ <DesktopWindowsIcon />}
                                primary={props.device.friendlyName} secondary={ secondaryText() }
                                secondaryActions={
                                    <>
                                    { (props.deviceState.PowerController.powerState.value==='ON' && props.deviceState.EndpointHealth.connectivity.deepvalue==='OK') ?
                                        <>
                                            { props.deviceState.LockController.lockState.value==='LOCKED' ?
                                                <IconButton size={"small"} className={classes.middleButton} onClick={ () => handleLockButton(false) } >
                                                    <LockOpenIcon />
                                                </IconButton>    
                                                :
                                                <IconButton size={"small"} className={classes.middleButton} onClick={ () => handleLockButton(true) } >
                                                    <LockIcon />
                                                </IconButton>  
                                            }
                                            <IconButton size={"small"} onClick={ () => turnOff() } >
                                                <NightsStayIcon />
                                            </IconButton>        
                                        </>
                                    :
                                        <>
                                        { wolFlip ? 
                                        <CircularProgress size={24} onClick={ () => turnOn() } />
                                        :
                                        <IconButton size={"small"} onClick={ () => turnOn() } >
                                            <WifiTetheringIcon />
                                        </IconButton>  
                                        }
                                        </>
                                    }
                                    </>
                                }
                />
                { (props.deviceState.PowerController.powerState.value==='ON' && props.deviceState.EndpointHealth.connectivity.deepvalue==='OK') &&
                    <SofaAvatarSlider   label={"Volume"} 
                                        small={true} reverse={true} minWidth={64} 
                                        value={props.deviceState.SpeakerController.volume.value}
                                        change={handleVolumeChange} 
                                        avatarClick={ () => handleMuteChange(!props.deviceState.SpeakerController.mute.value)} 
                                        avatarState={ props.deviceState.SpeakerController.mute.value===false ? "on" : "off" }
                                        disabled={ props.deviceState.PowerController.powerState.value==='OFF' }
                    />
                }
            </CardBase>   
        :
            <CardBase >
                <SofaListItem   inList={true} avatarBackground={false} avatarState={ 'off'}
                                avatar={ <DesktopWindowsIcon />}
                                primary={props.device.friendlyName}
                                secondaryActions={
                                        <>
                                        { wolFlip ? 
                                        <CircularProgress size={24} className={classes.spinner} onClick={ () => turnOn() } />
                                        :
                                        <IconButton size={"small"} onClick={ () => turnOn() } >
                                            <WifiTetheringIcon />
                                        </IconButton>  
                                        }
                                        </>
                                }
                />
            </CardBase>   
    );
}
