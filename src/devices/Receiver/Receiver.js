import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import Switch from '@mui/material/Switch';

import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import DotSlider from 'components/DotSlider'
import CardBase from 'components/CardBase'
import ToggleIconButton from 'components/ToggleIconButton'
import ModeLines from 'devices/Mode/ModeLines'

import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { getModes, getInputs, register, unregister, deviceByEndpointId } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
        titleBar: {
            width: "100%",
            color: theme.palette.primary.contrastText,
            backgroundColor: "#444",
        },
        select: {
            minWidth: "50%",
            display: "flex",
        },
        titleText: {
            fontSize: 18,
            fontWeight: 700,
            flexGrow: 1,
        },
        cardline: {
            padding: "8px 16px 8px 16px",
            display: "flex",
        },
        nodetail: {
            padding: "8px 16px 8px 16px",
            display: "flex",
        },
        minLI: {
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
        },
        list: {
            maxWidth: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: 0,
        },
        detail: {
            width: "100%",
            paddingTop: -8,
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
        },
        innerCollapse: {
            width: "100%",
            display: "flex",
        },

    }

});

const Receiver = props => {

    const classes = useStyles();    
    const [ showDetail, setShowDetail ] = useState(false);
    const [ volumePresetMode, setVolumePresetMode ] = useState(true);
    const volumePresets = [40, 55, 60, 65, 70, 80];

    const device = deviceByEndpointId(props.endpointId)
    const receiver = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, 'Receiver-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Receiver-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!receiver) { return null }

    const on = receiver.PowerController.powerState.value === 'ON' 

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 

    //function handleMuteChange(event) {
    //    directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !receiver.Speaker.mute.value } )
    //}; 
    
    function handlePowerChange(event) {
        event.stopPropagation();
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleInput(event, inputname) {
        directive(props.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    
    function surroundName() {
        var surroundmodes = getModes(props.endpointId).Surround
        if (surroundmodes.hasOwnProperty(receiver.Surround.mode.value)) {
            return surroundmodes[receiver.Surround.mode.value]
        }
        return ""
    }
    
    function handleInputLockModeChoice(event,modechoice) {
        directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Receiver.InputLock')
    }; 

    function subText() {
        if (showDetail || !on) {
            return null
        }
        if (on) {
            return receiver.InputController.input.value + " / "+ surroundName()
        }
        return receiver.Speaker.volume.value+"% / "+receiver.InputController.input.value + " / "+ surroundName()
    }

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    return (
        <CardBase>
            <CardLine onClick={ () => setShowDetail(!showDetail)}>
                <CardLineIcon on={on} onClick={stopEventPropagation} longPress={() => setVolumePresetMode(!volumePresetMode) } >
                    <SpeakerGroupIcon />
                </CardLineIcon>
                <CardLineText primary={device.friendlyName} secondary={subText()} />
                <Switch color="primary" checked={ on } onClick={stopEventPropagation} onChange={ handlePowerChange } />
            </CardLine>
            { (showDetail || on ) &&
                <DotSlider   label={"Volume"} levelValues={volumePresetMode ? volumePresets : undefined } centered={true}
                                    small={true} reverse={true} minWidth={64} 
                                    value={receiver.Speaker.volume.value}
                                    select={handleVolumeChange} 
                                    disabled={ !on }
                />
            }
            <Collapse in={showDetail} className={classes.detail} classes={{ wrapperInner: classes.detail}}>
                <CardLine onClick={ () => setShowDetail(!showDetail)}>
                    <CardLineText primary={"Input"} />
                    { receiver.InputLock &&
                        <ToggleIconButton
                            buttonState={ receiver.InputLock.mode.value==='InputLock.Locked' ? "on" : "off" } 
                            disabled={!on}
                            onIcon={ <LockIcon fontSize={"small"} /> } 
                            offIcon={ <LockOpenIcon fontSize={"small"} /> }
                            onClick={ (e) => handleInputLockModeChoice(e, (receiver.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
                        />
                    }
                    <Select disabled={!on} variant={"standard"}
                            className={classes.select} displayEmpty 
                            value={receiver.InputController.input.value ? receiver.InputController.input.value : ""} 
                            onChange={ (e) => handleInput(e, e.target.value) } >
                        { getInputs(props.endpointId).map(inp =>
                            <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                        )}
                    </Select>
                </CardLine>
                <ModeLines  directive={directive} disabled={!on} endpointId={props.endpointId}
                            device={device} deviceState={receiver} exclude={["InputLock"]} />

            </Collapse>
        </CardBase>
    );
}

export default Receiver;
