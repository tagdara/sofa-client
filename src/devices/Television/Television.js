import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';


import IconButton from '@material-ui/core/IconButton';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TvIcon from '@material-ui/icons/Tv';
import DotAvatar from 'components/DotAvatar'
import ItemBase from 'components/ItemBase'
import TvRemote from 'devices/Television/TvRemote';
import ModeLines from 'devices/Mode/ModeLines'
import SofaAvatarSlider from 'components/SofaAvatarSlider'
import PlaceholderCard from 'layout/PlaceholderCard';

import Computer from 'devices/Computer/Computer.js';

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getInputs,register,unregister, deviceByEndpointId } from 'store/deviceHelpers'

const useStyles = makeStyles({
    list: {
        width: "100%",
        padding: 0,
    },
    bottomListItem: {
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    select: {
        minWidth: "50%",
    },
    minLI: {
        minHeight: 48,
        display: "flex",
        alignItems: "center",
    },
    detail: {
        width: "100%",
        paddingTop: -8,
    },
});



const Television = props => {
    
    const classes = useStyles();
    const [ showRemote, setShowRemote ] = useState(false)
    const [ showDetail, setShowDetail ] = useState(false);

    const device = deviceByEndpointId(props.endpointId)
    const tv = useDeviceStateStore( state => state.deviceStates[props.endpointId] )


    useEffect(() => {
        register(props.endpointId, 'television')
        return function cleanup() {
            unregister(props.endpointId, 'television');
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!tv) { 
        return <PlaceholderCard count={ 1 } />
    }

    const on = tv.PowerController.powerState.value === 'ON'
    const matrixSet = on && tv.InputController.input.value === "Matrix"

    const inputs = getInputs(props.endpointId)     
    // const on = tv.PowerController.powerState.value === "ON"

    function handleVolumeChange(event) {
        directive(props.endpointId,"Speaker", 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.endpointId,"Speaker", 'SetVolume', { "mute" : event} )
    }; 
    
    function handlePowerChange(event) {
        directive(props.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
        directive(props.endpointId,"InputController", 'SelectInput', { "input": inputname } )
    }; 

    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    
    function localVolumeCheck() {
        if ( tv.hasOwnProperty('Speaker') ) {
            if ( tv.hasOwnProperty('Audio') ) {
                if ( tv.Audio.mode.value==="Audio.speaker") {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        }
        
        return false

    }
    
    function subText() {
        if (showDetail || tv.PowerController.powerState.value==='OFF') {
            return null
        }
        return tv.InputController.input.value
    }

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }
   
    return (
        <>
            <ItemBase nopad={true}>
                <CardLine onClick={ () => setShowDetail(!showDetail)}>
                    <CardLineIcon color={on ? "primary" : undefined } onClick={stopEventPropagation}  >
                        <TvIcon />
                    </CardLineIcon>
                    <CardLineText primary={device.friendlyName} secondary={subText()} />
                    { on && <IconButton onClick={ () => toggleRemote() } ><ControlCameraIcon /></IconButton> }
                    <Switch color="primary" checked={ on } onClick={stopEventPropagation} onChange={ handlePowerChange } />
                </CardLine>
            { localVolumeCheck() && ( on || showDetail ) &&
                <DotAvatar   label={"Volume"} levelValues={[0,5,7,10,20,50]} centered={true}
                                    small={true} reverse={true} minWidth={64} 
                                    value={ tv.Speaker.volume.value }
                                    select={handleVolumeChange} 
                                    disabled={ !localVolumeCheck() || !on }
                />
            }
            <Collapse in={showDetail || showRemote } className={classes.detail} classes={{ wrapperInner: classes.detail}}>
                { showDetail &&
                    <>
                        { localVolumeCheck() &&
                            <SofaAvatarSlider   label={"Volume"} 
                                                small={true} reverse={true} minWidth={64} 
                                                value={ tv.Speaker.volume.value }
                                                change={handleVolumeChange} 
                                                avatarClick={ () => handleMuteChange(!tv.Speaker.mute.value)} 
                                                avatarState={ on ? "on" : "off" }
                                                disabled={ !localVolumeCheck() || !on }
                            />
                        }
                        <ListItem className={classes.bottomListItem}>
                            <ListItemText primary={"Input"} />
                            <Select disabled={ tv.PowerController.powerState.value!=='ON'} className={classes.select} displayEmpty 
                                    value={tv.InputController.input.value ? tv.InputController.input.value : ""} 
                                    onChange={ (e) => handleInput(e, e.target.value) } >
                                { inputs.map(inp =>
                                    <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                                )}
                            </Select>
                        </ListItem>
                        <ModeLines disabled={tv.PowerController.powerState.value!=='ON'} device={device} deviceState={tv} directive={directive} />
                    </>
                }
                { showRemote &&
                    <ListItem className={classes.remoteListItem}>
                        <TvRemote device={device} />
                    </ListItem>
                }
            </Collapse>
            </ItemBase>
            { matrixSet &&
                <Computer endpointId={"pc2:windows"} />
            }
        </>
    )
}

export default Television;