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

import SofaSlider from '../sofaSlider'
import SofaCard from '../sofaCard'
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
    bottomListItem: {
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    xx: {
        minHeight: 48,
        padding: 8,
    },
		xlistItemBottom: {
				padding: "16 0 0 0",
		}
});

export default function Television(props) {
    
    const classes = useStyles();
    const [powerState, setPowerState] = useState(props.deviceProperties.powerState);
    const [volume, setVolume] = useState(props.deviceProperties.volume);
    const [muted, setMuted] = useState(props.deviceProperties.muted);

    const [showDetail, setShowDetail] = useState(false);
    const [avinput, setInput] = useState(props.deviceProperties.input);
    const [inputs, setInputs] = useState({});
    
    useEffect(() => {
  	    fetch('/list/vizio/inputs')
 		    .then(result=>result.json())
            .then(result=>setInputs(result));
    }, []);

    function handlePreVolumeChange(event) {
        setVolume(event);
    }; 

    function handleVolumeChange(event) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'SpeakerController', 'SetMute', { "muted" : !muted} )
    }; 
    
    function handlePowerChange(event) {
        setPowerState(event.target.checked);
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };

    function handleInput(event, inputname) {
        props.sendAlexaCommand(props.device.friendlyName, props.device.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    return (
        <GridItem wide={props.wide}>
            <ListItem className={classes.listItem}>
                <ToggleAvatar onClick={ () => setShowDetail(!showDetail) } avatarState={ props.deviceProperties.powerState=='ON' ? "on" : "off" }>
                    <SpeakerGroupIcon />
                </ToggleAvatar>
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.name} secondary={props.deviceProperties.input ? props.deviceProperties.input : null}/>
                <ListItemSecondaryAction>
                    <Switch color="primary" checked={props.deviceProperties.powerState=='ON'} onChange={ (e) => handlePowerChange(e) } />
                </ListItemSecondaryAction>

            </ListItem>
        { props.deviceProperties.powerState!='ON' && !showDetail ? null :
            <ListItem className={classes.listItemBottom}>
                <ToggleAvatar onClick={ () => setMuted(!muted)} avatarState={ props.deviceProperties.powerState=='ON' ? "on" : "off" }>
                    {props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                </ToggleAvatar>
                <SofaSlider name="Volume" unit="%" min={0} max={100} defaultValue={0} step={1} value={props.deviceProperties.volume}
                            minWidth={240} preChange={handlePreVolumeChange} change={handleVolumeChange} padLeft={true} />
            </ListItem>
        }
        { !showDetail ? null :
            <React.Fragment>
                <ListItem className={classes.bottomListItem}>
                    <ListItemText primary={"Input"} />
                    { Object.keys(inputs).map(inp => 
                        <ToggleChip key = {inp} label = { inputs[inp] } chipState={ props.deviceProperties.input==inputs[inp] ? "on" : "off" } onClick={ (e) => handleInput(e, inputs[inp])} />
                    )}
                </ListItem>
            </React.Fragment>
        }
        </GridItem>
    );
}

