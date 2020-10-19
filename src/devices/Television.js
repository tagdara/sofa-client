import React,{ useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from '../DataContext/DeviceProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import Switch from '@material-ui/core/Switch';
import TvIcon from '@material-ui/icons/Tv';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';

import SofaAvatarSlider from '../SofaAvatarSlider'
import CardBase from '../CardBase'
import TvRemote from './TvRemote';
import ModeLines from '../ModeLines'
import SofaListItem from '../SofaListItem'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DotAvatar from '../DotAvatar'

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

});



export function Television(props) {
    
    const classes = useStyles();
    const [showRemote, setShowRemote] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const { directive, getInputs} = useContext(DeviceContext);
    //const device=deviceByEndpointId(props.device.endpointId)
    const inputs=getInputs(props.device.endpointId)  
    
    function handleVolumeChange(event) {
        directive(props.device.endpointId,"SpeakerController", 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.device.endpointId,"SpeakerController", 'SetVolume', { "mute" : event} )
    }; 
    
    function handlePowerChange(event) {
        directive(props.device.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
       directive(props.device.endpointId,"InputController", 'SelectInput', { "input": inputname } )
    }; 

    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    
    function localVolumeCheck() {
        if ( props.deviceState.hasOwnProperty('SpeakerController') ) {
            if ( props.deviceState.hasOwnProperty('Audio') ) {
                if (props.deviceState.Audio.mode.value==="Audio.speaker") {
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
        if (showDetail || props.deviceState.PowerController.powerState.value==='OFF') {
            return null
        }
        return props.deviceState.InputController.input.value
    }
     
    return (
        <CardBase nopad={true}>
            <SofaListItem   avatar={ <TvIcon /> } avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? 'on' : 'off' } avatarBackground={false}
                            onClick={ () => setShowDetail(!showDetail) }
                            primary={props.device.friendlyName} secondary={subText()}
                            secondaryActions={
                                <>
                                    { props.deviceState.PowerController.powerState.value!=='ON' ? null :
                                    <IconButton onClick={ () => toggleRemote() } >
                                        <ControlCameraIcon />
                                    </IconButton>
                                    }
                                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
                                </>
                            }
            />
        { localVolumeCheck() && ( props.deviceState.PowerController.powerState.value==='ON' || showDetail ) &&
            <DotAvatar   label={"Volume"} levelValues={[0,5,7,10,20,50]} centered={true}
                                small={true} reverse={true} minWidth={64} 
                                value={props.deviceState.SpeakerController.volume.value}
                                select={handleVolumeChange} 
                                disabled={ !localVolumeCheck() || props.deviceState.PowerController.powerState.value==='OFF' }
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
                                    disabled={ !localVolumeCheck() || props.deviceState.PowerController.powerState.value==='OFF' }
                />
                <ListItem className={classes.bottomListItem}>
                    <ListItemText primary={"Input"} />
                    <Select disabled={props.deviceState.PowerController.powerState.value!=='ON'} className={classes.select} displayEmpty value={props.deviceState.InputController.input.value ? props.deviceState.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                        { inputs.map(inp =>
                            <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                        )}
                    </Select>
                </ListItem>
                <ModeLines disabled={props.deviceState.PowerController.powerState.value!=='ON'} device={props.device} deviceState={props.deviceState} directive={directive} />
            </>
        }
        { showRemote &&
            <ListItem className={classes.remoteListItem}>
                <TvRemote device={props.device} />
            </ListItem>
        }
        </CardBase>
    )
}

export default React.memo(Television);