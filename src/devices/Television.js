import React,{ useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from '../DataContext/DeviceProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import Switch from '@material-ui/core/Switch';
import TvIcon from '@material-ui/icons/Tv';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';

import SofaSlider from '../SofaSlider'
import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'
import TvRemote from './TvRemote';
import ErrorBoundary from '../ErrorBoundary';
import ModeLines from '../ModeLines'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    list: {
        width: "100%",
    },
    bottomListItem: {
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    select: {
        minWidth: "50%",
    },
});



export function Television(props) {
    
    const classes = useStyles();
    const [mute, setMute] = useState(false);
    const [showRemote, setShowRemote] = useState(false)
    const [showDetail, setShowDetail] = useState(false);
    const [volume, setVolume] = useState(0);
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);
    const { deviceByEndpointId, directive, getInputs} = useContext(DeviceContext);
    const device=deviceByEndpointId(props.device.endpointId)
    const inputs=getInputs(device)  
    
    useEffect(() => {
        if (props.device.hasOwnProperty('SpeakerController')) {
            setVolume(props.device.SpeakerController.volume.value);
            setMute(props.device.SpeakerController.mute.value);
        }
    }, [props.device])

    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        setVolume(event);
        directive(props.device.endpointId,"SpeakerController", 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.device.endpointId,"SpeakerController", 'SetVolume', { "mute" : event} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        directive(props.device.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
       directive(props.device.endpointId,"InputController", 'SelectInput', { "input": inputname } )
    }; 

    function toggleRemote() {
        setShowRemote(!showRemote)
    }
    
    function localVolumeCheck() {
        if ( props.device.hasOwnProperty('SpeakerController') ) {
            if ( props.device.hasOwnProperty('Audio') ) {
                if (props.device.Audio.mode.value==="Audio.audioSystem") {
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
     
    return (
        <GridItem wide={props.wide}>
            <ListItem className={classes.listItem}>
                <ListItemIcon onClick={ () => setShowDetail(!showDetail) } ><TvIcon /></ListItemIcon>
            <ErrorBoundary>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={props.device.PowerController.powerState.value!=='ON' ? 'Off' : props.device.InputController.input.value}/>
            </ErrorBoundary>
                <ListItemSecondaryAction>
                    { props.device.PowerController.powerState.value!=='ON' ? null :
                    <IconButton onClick={ () => toggleRemote() } >
                        <ControlCameraIcon />
                    </IconButton>
                    }

                    <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>
            </ListItem>
        { localVolumeCheck() && powerState==='ON' && showDetail ?
            <ListItem className={classes.listItemBottom}>
                <ToggleAvatar noback={true} onClick={ () => handleMuteChange(!props.device.SpeakerController.mute.value)} avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }>
                    {mute ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                </ToggleAvatar>
                <SofaSlider name="Volume" unit="%" min={0} max={100} defaultValue={0} step={1} value={volume}
                            minWidth={240} preChange={handlePreVolumeChange} change={handleVolumeChange} padLeft={false} />
            </ListItem>
            : null
        }
        { showDetail &&
            <ListItem className={classes.bottomListItem}>
                <ListItemText primary={"Input"} />
                <Select disabled={props.device.PowerController.powerState.value!=='ON'} className={classes.select} displayEmpty value={props.device.InputController.input.value ? props.device.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                    { inputs.map(inp =>
                        <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                    )}
                </Select>
            </ListItem>
        }
        { showDetail &&
            <ModeLines disabled={props.device.PowerController.powerState.value!=='ON'} device={props.device} />
        }
        { showRemote &&
            <ListItem className={classes.remoteListItem}>
                <TvRemote device={props.device} />
            </ListItem>
        }
        </GridItem>
    )
}

export default React.memo(Television);