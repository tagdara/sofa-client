import React, { useState, useContext } from 'react';
import { DeviceContext } from '../DataContext/DeviceProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

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
        }
    }

});


export default function Receiver(props) {
    
    const classes = useStyles();
    const { deviceByEndpointId, getModes, directive, getInputs} = useContext(DeviceContext);
    const [showDetail, setShowDetail] = useState(props.device.PowerController.powerState.value==='ON');
    const device=deviceByEndpointId(props.device.endpointId)
    const inputs=getInputs(device)
    
    function handleVolumeChange(event) {
        directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    function handleMuteChange(event) {
        directive(props.device.endpointId, 'SpeakerController', 'SetVolume', { "mute" : !props.device.SpeakerController.mute.value } )
    }; 
    
    function handlePowerChange(event) {
        directive(props.device.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleInput(event, inputname) {
        directive(props.device.endpointId, 'InputController', 'SelectInput', { "input": inputname } )
    }; 

    
    function surroundName() {
        var surroundmodes=getModes(props.device).Surround
        if (surroundmodes.hasOwnProperty(props.device.Surround.mode.value)) {
            return surroundmodes[props.device.Surround.mode.value]
        }
        return ""
    }
    
    function handleInputLockModeChoice(event,modechoice) {
        console.log(event, modechoice)
        for (var k = 0; k < props.device.interfaces.length; k++) {
            if (props.device[props.device.interfaces[k]].controller==='ModeController') {
                var mc=props.device[props.device.interfaces[k]]
                var modename=mc.capabilityResources.friendlyNames[0].value.text
                if (modename==="InputLock") {
                    mc.directive('SetMode', { "mode": modechoice })
                }
            }
        }
    }; 

    return (
        <>
        <GridItem wide={props.wide} >
        <ListItem className={ classes.cardline } >
            <ListItemIcon onClick={ () => setShowDetail(!showDetail) } ><SpeakerGroupIcon /></ListItemIcon>
            { ( showDetail && props.device.PowerController.powerState.value!=='OFF' ) ? 
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} className={classes.minLI} />
            :
                <ListItemText onClick={ () => setShowDetail(!showDetail) } primary={props.device.friendlyName} secondary={ props.device.PowerController.powerState.value==='OFF' ? 'Off' : (props.device.InputController.input.value) ? props.device.SpeakerController.volume.value+"% / "+props.device.InputController.input.value + " / "+ surroundName() : null}/>
            }
            <Switch color="primary" checked={props.device.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
        </ListItem>
        { showDetail &&
            <>
                <SofaAvatarSlider   avatarClick={ () => handleMuteChange(!props.device.SpeakerController.mute.value)} 
                                    avatarState={ props.device.PowerController.powerState.value==='ON' ? "on" : "off" }
                                    name="Volume" min={0} max={100} defaultValue={0} step={1} value={props.device.SpeakerController.volume.value}
                                    disabled={ props.device.PowerController.powerState.value==='OFF' } minWidth={240} 
                                    change={handleVolumeChange} />
                <ListItem>
                    <ListItemText primary={"Input"} />
                    { props.device.InputLock &&
                        <ToggleIconButton
                            buttonState={ props.device.InputLock.mode.value==='InputLock.Locked' ? "on" : "off" } disabled={props.device.PowerController.powerState.value!=='ON'}
                            onIcon={ <LockIcon fontSize={"small"} /> } offIcon={ <LockOpenIcon fontSize={"small"} /> }
                            onClick={ (e) => handleInputLockModeChoice(e, (props.device.InputLock.mode.value==='InputLock.Locked' ? 'InputLock.Unlocked' : 'InputLock.Locked'))} 
                        />
                    }
                    <Select disabled={props.device.PowerController.powerState.value!=='ON'} className={classes.select} displayEmpty value={props.device.InputController.input.value ? props.device.InputController.input.value : ""} onChange={ (e) => handleInput(e, e.target.value) } >
                        { inputs.map(inp =>
                            <MenuItem key={inp} value={inp}>{inp}</MenuItem>
                        )}
                    </Select>
                </ListItem>
                <ModeLines directive={directive} disabled={props.device.PowerController.powerState.value!=='ON'} device={props.device} exclude={["InputLock"]} />
            </>
        }
        </GridItem>
        </>
    );
}

