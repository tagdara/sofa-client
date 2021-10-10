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

import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

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

const AppleTV = React.memo(props => {

    const classes = useStyles();

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'AppleTV-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('AppleTV-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])

    if (!props.deviceState || !props.deviceState[props.endpointId]) { return null }

    const serverurl="https://"+window.location.hostname;
    const deviceState = props.deviceState[props.endpointId]
    const name = props.devices[props.endpointId].friendlyName
    const playing = deviceState.MediaController.playbackState.value === 'PLAYING'
    const on = deviceState.PowerController.powerState.value==='ON'
    const title = deviceState.MediaController.title.value 

    function handlePowerChange(event) {
        props.directive(props.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleCommand(command) {
        props.directive(props.endpointId, 'MediaController', command)
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
}, deviceStatesAreEqual);

export default dataFilter(AppleTV);