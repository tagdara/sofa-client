import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

import SofaSlider from '../SofaSlider'

import GridItem from '../GridItem'
import ToggleAvatar from '../ToggleAvatar'
import ToggleChip from '../ToggleChip'

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    list: {
        width: "100%",
    },
    xlist: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    xlistItem: {
        width: '100%',
        minHeight: 48,
        padding: 0,
    },
    xbottomListItem: {
        width: '100%',
        minHeight: 48,
        padding: 8,
    },
		xlistItemBottom: {
				padding: "16 0 0 0",
		},
	extendedIcon: {
        marginRight: 8,
    },
});

export default function Receiver(props) {
    
    const classes = useStyles();
    const [powerState, setPowerState] = useState(props.device.PowerController.powerState.value);
    const [volume, setVolume] = useState(props.device.SpeakerController.volume.value);
    const [mute, setMute] = useState(props.device.SpeakerController.mute.value);

    const [showDetail, setShowDetail] = useState(false);
    const [avinput, setInput] = useState(props.device.InputController.input.value);
    const [inputs, setInputs] = useState({});
    const [topInputs, setTopInputs] = useState(['TV','Sonos']);
    
    
    useEffect(() => {
  	    fetch('/list/yamaha/inputs')
 		    .then(result=>result.json())
            .then(result=>setInputs(result));
        }, []);
    
    useEffect(() => {
        setVolume(props.device.SpeakerController.volume.value)

        }, [props.device.SpeakerController.volume.value]);

    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        setVolume(event);
        props.device.SpeakerController.directive('SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.device.SpeakerController.directive('SetVolume', { "mute" : !mute} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        props.device.PowerController.directive(event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleSurround(event, surroundmode) {
        props.device.SurroundController.directive('SetSurround', {"surround": surroundmode } )
    }; 
    
    function handleInput(event, inputname) {
        props.device.InputController.directive('SelectInput', { "input": inputname } )
    }; 

    function getYamahaInput(inputname) {
        // this is to fix the hacky yamaha input naming system
        for (var yinput in inputs) {
            if (inputname==yinput) {
                return inputs[yinput]
            }
            if (inputname==yinput.replace('_','')) {
                return inputs[yinput]
            }
        }
        return inputname
                
    }
    
    return (
        <GridItem wide={props.wide}>
            <ListItem className={classes.listItem}>
                <ToggleAvatar noback={true} onClick={ () => setShowDetail(!showDetail) } avatarState={ props.device.PowerController.powerState.value=='ON' ? "on" : "off" }>
                    <SpeakerGroupIcon />
                </ToggleAvatar>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={ props.device.PowerController.powerState.value=='OFF' ? 'Off' : (props.device.InputController.input.value) ? getYamahaInput(props.device.InputController.input.value) + " / "+ props.device.SurroundController.surround.value : null}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.device.PowerController.powerState.value=='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>

            </ListItem>
        { (getYamahaInput(props.device.InputController.input.value)=='Sonos' && !showDetail) || props.device.PowerController.powerState.value=='OFF'  ? null :
            <ListItem className={classes.listItemBottom}>

                <ToggleAvatar onClick={ () => setMute(!mute)} noback={true} avatarState={ props.device.PowerController.powerState.value=='ON' ? "on" : "off" }>
                    { props.device.PowerController.powerState.value!='ON' ? <VolumeMuteIcon /> :
                        (props.device.SpeakerController.mute.value) ? <VolumeOffIcon /> :  volume
                    }
                </ToggleAvatar>
                <SofaSlider name="Volume" min={0} max={100} defaultValue={0} step={1} value={volume}
                            disabled={ props.device.PowerController.powerState.value=='OFF' } minWidth={240} preChange={handlePreVolumeChange} change={handleVolumeChange} />
            </ListItem>
        }
        { !showDetail || props.device.PowerController.powerState.value=='OFF' ? null :
            <React.Fragment>
                <ListItem className={classes.bottomListItem}>
                    <ListItemText primary={"Input"} />
                    { Object.keys(inputs).map(inp => (
                        topInputs.includes(inputs[inp]) ?
                        <ToggleChip key = {inp} label = { inputs[inp] } chipState={ (getYamahaInput(props.device.InputController.input.value)==inputs[inp] ) ? "on" : "off" } onClick={ (e) => handleInput(e, inp)} />
                        : null
                    ))}
                </ListItem>
                <ListItem className={classes.bottomListItem}>
                    <ListItemText primary={"Surround Sound"} />
                        <ToggleChip 
                            key = '7ch Stereo'
                            label= '7ch Stereo'
                            chipState={ props.device.SurroundController.surround.value=='7ch Stereo' ? "on" : "off" }
                            onClick={ (e) => handleSurround(e, '7ch Stereo')}
                        />
                        <ToggleChip 
                            key = 'Surround Decoder'
                            label='Surround Decoder'
                            chipState={ props.device.SurroundController.surround.value=='Surround Decoder' ? "on" : "off" }
                            onClick={ (e) => handleSurround(e, 'Surround Decoder')}
                        />
                </ListItem>
            </React.Fragment>
        }
        </GridItem>
    );
}

