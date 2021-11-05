import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AirplayIcon from '@material-ui/icons/Airplay';

import ItemBase from 'components/ItemBase'
import SofaListItem from 'components/SofaListItem'

import { register, unregister, deviceByEndpointId } from 'store/deviceHelpers'
import { directive } from 'store/directive'
import useDeviceStateStore from 'store/deviceStateStore'

const useStyles = makeStyles(theme => {
    return {        
        art: {
            boxSizing: "border-box",
            padding: 0,
            width: "100%",
        },
        media: {
            padding: "0 16px",
        },
        mediaText: {
            padding: "0 0 0 16px",
        }
    }
})

const AppleTV = props => {

    const classes = useStyles();
    const device = deviceByEndpointId(props.endpointId)
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device.name

    useEffect(() => {
        register(props.endpointId, "appleTv-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "appleTv-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    if (!deviceState) { return null }

    const serverurl="https://"+window.location.hostname;
    const playing = deviceState.MediaController.playbackState.value === 'PLAYING'
    const on = deviceState.PowerController.powerState.value==='ON'
    const title = deviceState.MediaController.title.value 

    function handlePowerChange(event) {
        directive(props.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleCommand(command) {
        directive(props.endpointId, 'MediaController', command)
    }; 


    return (
        <ItemBase small={true}>
            <SofaListItem   avatar={ <AirplayIcon /> } 
                            avatarState={ on ? 'on' : 'off' } 
                            avatarBackground={false}
                            primary={ name }
                            secondaryActions={
                                <>
                                    <Switch color="primary" checked={ on } onChange={ (e) => handlePowerChange(e) } />
                                </>
                            }
            />
            { ( on && title ) &&
                <Grid container className={classes.media} >
                    <Grid item xs={4} >
                        <img    className={classes.art} 
                                src={ serverurl + title + "?title=" + title} 
                                alt={ title } />
                    </Grid>
                    <Grid item container xs={8} className={classes.mediaText}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">{ title }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton size={"small"} aria-label="play" className={classes.playButton} 
                                        onClick={ () => handleCommand(playing ? 'Pause': 'Play' )}>
                                { playing ? <PauseIcon /> : <PlayArrowIcon /> }
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </ItemBase>
    )
}

export default AppleTV;