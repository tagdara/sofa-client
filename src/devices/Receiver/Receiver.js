import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';

import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import DotAvatar from 'components/DotSlider'
import CardBase from 'components/CardBase'
import ToggleIconButton from 'components/ToggleIconButton'
import SofaListItem from 'components/SofaListItem'
import ModeLines from 'devices/Mode/ModeLines'

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import useRegisterStore from 'store/registerStore'
import { directive } from 'store/directive'
import { getModes, getInputs } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
        titleBar: {
            width: "100%",
            color: theme.palette.primary.contrastText,
            backgroundColor: "#444",
        },
        select: {
            minWidth: "50%",
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
        },
    }

});

const Receiver = props => {

    const classes = useStyles();    
    const [ showDetail, setShowDetail ] = useState(false);
    const [ volumeMode, setVolumeMode ] = useState('presets');
    const volumePresets = [40, 55, 60, 65, 70, 80];

    const device = useDeviceStore( state => state.devices[props.endpointId] )
    const receiver = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(props.endpointId, 'Receiver-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'Receiver-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!receiver) { return null }

    function handleVolumeChange(event) {
        directive(props.endpointId, 'Speaker', 'SetVolume', { "volume" : event} )
    }; 

    //function handleMuteChange(event) {
    //    directive(props.endpointId, 'Speaker', 'SetVolume', { "mute" : !receiver.Speaker.mute.value } )
    //}; 
    
    function handlePowerChange(event) {
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

    function handleVolumeMode(event,modechoice) {
        setVolumeMode(modechoice)
    }; 

    
    function subText() {
        if (showDetail || receiver.PowerController.powerState.value==='OFF') {
            return null
        }
        if (receiver.PowerController.powerState.value!=='OFF') {
            return receiver.InputController.input.value + " / "+ surroundName()
        }
        return receiver.Speaker.volume.value+"% / "+receiver.InputController.input.value + " / "+ surroundName()
    }

    return (
        <CardBase>
            <SofaListItem   avatar={<SpeakerGroupIcon />} avatarState = { receiver.PowerController.powerState.value === 'ON' ? 'on' : 'off' } noPad={true}
                            avatarClick={ () => setShowDetail(!showDetail) } labelClick={ () => setShowDetail(!showDetail) }
                            avatarBackground={false} primary={device.friendlyName} secondary={subText()}
                            secondaryActions={<Switch color="primary" checked={ receiver.PowerController.powerState.value === 'ON' } 
                            onChange={ (e) => handlePowerChange(e) } /> }
            />
            { (showDetail || receiver.PowerController.powerState.value==='ON' ) &&
                <DotAvatar   label={"Volume"} levelValues={volumeMode==='presets' ? volumePresets : undefined } centered={true}
                                    small={true} reverse={true} minWidth={64} 
                                    value={receiver.Speaker.volume.value}
                                    select={handleVolumeChange} 
                                    disabled={ receiver.PowerController.powerState.value==='OFF' }
                />
            }
            <Collapse in={showDetail} className={classes.detail}>
                        <ListItem>
                            <ListItemText primary={"Input"} />
                            { receiver.InputLock &&
                                <ToggleIconButton
                                    buttonState={ receiver.InputLock.mode.value==='InputLock.Locked' ? "on" : "off" } 
                                    disabled={receiver.PowerController.powerState.value!=='ON'}
                                    onIcon={ <LockIcon fontSize={"small"} /> } 
                                    offIcon={ <LockOpenIcon fontSize={"small"} /> }
                                    onClick={ (e) => handleInputLockModeChoice(e, (receiver.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
                                />
                            }
                            <Select disabled={receiver.PowerController.powerState.value!=='ON'} 
                                    className={classes.select} displayEmpty 
                                    value={receiver.InputController.input.value ? receiver.InputController.input.value : ""} 
                                    onChange={ (e) => handleInput(e, e.target.value) } >
                                { getInputs(props.endpointId).map(inp =>
                                    <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                                )}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={"Volume"} />
                            <Select disabled={receiver.PowerController.powerState.value!=='ON'} 
                                    className={classes.select} displayEmpty 
                                    value={volumeMode} 
                                    onChange={ (e) => handleVolumeMode(e, e.target.value) } >
                                <MenuItem value={"open"}>Open</MenuItem>
                                <MenuItem value={"presets"}>Presets</MenuItem>
                            </Select>
                        </ListItem>
                        <ModeLines  directive={directive} disabled={receiver.PowerController.powerState.value!=='ON'} endpointId={props.endpointId}
                                    device={device} deviceState={receiver} exclude={["InputLock"]} />

            </Collapse>
        </CardBase>
    );
}

export default Receiver;
