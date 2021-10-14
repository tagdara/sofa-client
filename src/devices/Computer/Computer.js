import React, {useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import MouseIcon from '@material-ui/icons/Mouse';
import WindowsIcon from 'resources/WindowsIcon';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import SofaListItem from 'components/SofaListItem';
import CardBase from 'components/CardBase';
import ComputerWol from 'devices/Computer/ComputerWol';
import ComputerVolume from 'devices/Computer/ComputerVolume';

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

const Computer = React.memo(props => {

    const classes = useStyles();

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'Computer-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('Computer-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])

    const name = props.devices && props.devices[props.endpointId] ? props.devices[props.endpointId].friendlyName : "Unknown"

    if (!props.deviceState || !props.deviceState[props.endpointId]) {
        return  <CardBase >
                    <SofaListItem   inList={true} avatarBackground={false} avatarState={ 'off'}
                                    avatar={ <WindowsIcon />}
                                    primary={ name }
                                    secondaryActions={
                                        <ComputerWol endpointId={props.endpointId} directive={props.directive} />
                                    }
                    />
                </CardBase>   
    }    

    const computerState = props.deviceState[props.endpointId]
    const Speaker = computerState.Speaker
    const on = computerState.PowerController ? computerState.PowerController.powerState.value === "ON" : false
    
    function turnOff() {
        props.directive(props.device.endpointId, "PowerController", "TurnOff", {}, {}, "")
    }; 
 
    function handleLockButton(event) {
        if (event) {
            props.directive(props.endpointId, "LockController" , "Lock", {}, {}, "")
        } else {
            props.directive(props.endpointId, "LockController" , "Unlock", {}, {}, "")
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
        var newurl="https://"+name+".dayton.tech:9998"
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
                                    <ComputerWol endpointId={props.endpointId} directive={props.directive} />
                                    }
                                </>
                            }
            />
            { (Speaker && on ) && <ComputerVolume endpointId={props.endpointId} directive={props.directive} Speaker ={ Speaker } /> }
        </CardBase>   
    );
}, deviceStatesAreEqual);

export default dataFilter(Computer);
