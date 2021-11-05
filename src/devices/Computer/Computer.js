import React, {useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import MouseIcon from '@material-ui/icons/Mouse';
import WindowsIcon from 'resources/WindowsIcon';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import SofaListItem from 'components/SofaListItem';
import CardBase from 'components/CardBase';
import ComputerWol from 'devices/Computer/ComputerWol';
import ComputerVolume from 'devices/Computer/ComputerVolume';

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { directive } from 'store/directive'
import { register, unregister } from 'store/deviceHelpers'

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

const Computer = props => {

    const classes = useStyles();

    const device = useDeviceStore( state => state.devices[props.endpointId] )
    const computerState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Computer-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Computer-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    const name = device.friendlyName ?? "Unknown"

    if (!computerState) {
        return  <CardBase >
                    <SofaListItem   inList={true} avatarBackground={false} avatarState={ 'off'}
                                    avatar={ <WindowsIcon />}
                                    primary={ name }
                                    secondaryActions={
                                        <ComputerWol endpointId={props.endpointId} directive={directive} />
                                    }
                    />
                </CardBase>   
    }    

    const Speaker = computerState.Speaker
    const on = computerState.PowerController ? computerState.PowerController.powerState.value === "ON" : false
    
    function turnOff() {
        directive(props.endpointId, "PowerController", "TurnOff", {}, {}, "")
    }; 
 
    function handleLockButton(event) {
        if (event) {
            directive(props.endpointId, "LockController" , "Lock", {}, {}, "")
        } else {
            directive(props.endpointId, "LockController" , "Unlock", {}, {}, "")
        }
    }; 

    
    function secondaryText() {
        if (computerState.PowerController.powerState.value==='ON' && computerState.EndpointHealth.connectivity.deepvalue==='OK') {
            if (computerState.LockController.lockState.value==='LOCKED') { return 'Locked' }
            return 'Unlocked'
        } 
        return 'Powered off'
    }
    
    function openWebmouse() {
        var domain = window.location.hostname.split('.').slice(1).join('.')
        var newurl = "https://"+window.location.hostname+"/windows?pc="+name+"."+domain
        console.log('new url', newurl)
        var safariWindow = window.open();
        safariWindow.location.href = newurl
        //window.open(newurl,'_mouse');
    }

    return (
        <CardBase >
            <SofaListItem   inList={true} avatarBackground={false} 
                            avatarState={ (computerState.PowerController.powerState.value==='ON' && computerState.EndpointHealth.connectivity.deepvalue==='OK') ? 'on' : 'off'}
                            avatar={ <WindowsIcon />}
                            primary={ name } secondary={ secondaryText() }
                            secondaryActions={
                                <>
                                { (computerState.PowerController.powerState.value==='ON' && computerState.EndpointHealth.connectivity.deepvalue==='OK') ?
                                    <>
                                        <IconButton size={"small"} className={classes.middleButton} onClick={openWebmouse} >
                                            <MouseIcon />
                                        </IconButton>  
                                        { computerState.LockController.lockState.value==='LOCKED' ?
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
                                    <ComputerWol endpointId={props.endpointId} directive={directive} />
                                    }
                                </>
                            }
            />
            { (Speaker && on ) && <ComputerVolume endpointId={props.endpointId} directive={directive} Speaker ={ Speaker } /> }
        </CardBase>   
    );
}

export default Computer;
