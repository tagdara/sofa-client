import React, { useState, useContext } from 'react';
import { DeviceContext } from '../DataContext/DeviceProvider';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import DotAvatar from '../DotAvatar'
import SofaAvatarSlider from '../SofaAvatarSlider'

import GridItem from '../GridItem'
import ToggleIconButton from '../ToggleIconButton'

import ModeLines from '../ModeLines'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
    }

});


export default function Receiver(props) {
    
    const classes = useStyles();
    const { devices, getModes, directive, getInputs} = useContext(DeviceContext);
    const [showDetail, setShowDetail] = useState(false);
    //const device=deviceByEndpointId(props.device.endpointId)
    //const inputs=getInputs(device)
    //const [inputs, setInputs]=useState()
    
    function handleVolumeChange(event) {
        directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "mute" : !props.deviceState.SpeakerController.mute.value } )
    }; 
    
    function handlePowerChange(event) {
        directive(props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleInput(event, inputname) {
        directive(props.device.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    
    function surroundName() {
        var surroundmodes=getModes(props.endpointId).Surround
        if (surroundmodes.hasOwnProperty(props.deviceState.Surround.mode.value)) {
            return surroundmodes[props.deviceState.Surround.mode.value]
        }
        return ""
    }
    
    function handleInputLockModeChoice(event,modechoice) {
        directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Receiver.InputLock')
    }; 
    
    function subText() {
        if (showDetail || props.deviceState.PowerController.powerState.value==='OFF') {
            return null
        }
        if (props.deviceState.PowerController.powerState.value!=='OFF') {
            return props.deviceState.InputController.input.value + " / "+ surroundName()
        }
        return props.deviceState.SpeakerController.volume.value+"% / "+props.deviceState.InputController.input.value + " / "+ surroundName()
    }

    return (
        props.deviceState ?
        <GridItem wide={props.wide} nopad={true} >
            {props.deviceState &&
            <List className={classes.list} >
                <ListItem className={ classes.cardline } >
                    <ListItemIcon onClick={ () => setShowDetail(!showDetail) } ><SpeakerGroupIcon /></ListItemIcon>
                    <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={devices[props.endpointId].friendlyName} secondary={subText()} className={subText() ? classes.normal : classes.minLI} />
                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItem>
                { (showDetail || props.deviceState.PowerController.powerState.value==='ON' ) &&
                        <DotAvatar   label={"Volume"} levelValues={[0,30,55,65,70,80]}
                                            small={true} reverse={true} minWidth={64} 
                                            value={props.deviceState.SpeakerController.volume.value}
                                            select={handleVolumeChange} 
                                            disabled={ props.deviceState.PowerController.powerState.value==='OFF' }
                        />
                }

                { showDetail &&
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
                            <ListItemText primary={"Input"} />
                            { props.deviceState.InputLock &&
                                <ToggleIconButton
                                    buttonState={ props.deviceState.InputLock.mode.value==='InputLock.Locked' ? "on" : "off" } disabled={props.deviceState.PowerController.powerState.value!=='ON'}
                                    onIcon={ <LockIcon fontSize={"small"} /> } offIcon={ <LockOpenIcon fontSize={"small"} /> }
                                    onClick={ (e) => handleInputLockModeChoice(e, (props.deviceState.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
                                />
                            }
                            <Select disabled={props.deviceState.PowerController.powerState.value!=='ON'} className={classes.select} displayEmpty value={props.deviceState.InputController.input.value ? props.deviceState.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                                { getInputs(props.endpointId).map(inp =>
                                    <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                                )}
                            </Select>
                        </ListItem>
                        <ModeLines directive={directive} disabled={props.deviceState.PowerController.powerState.value!=='ON'} device={props.device} deviceState={props.deviceState} exclude={["InputLock"]} />
                    </>
                }
            </List>
            }
        </GridItem>
        :
        null
    );
}

