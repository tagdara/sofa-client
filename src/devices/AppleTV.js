import React,{ useContext } from 'react';
import { DeviceContext } from '../DataContext/DeviceProvider';

import Switch from '@material-ui/core/Switch';
import AirplayIcon from '@material-ui/icons/Airplay';

import CardBase from '../CardBase'
import SofaListItem from '../SofaListItem'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

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

export function AppleTV(props) {

    const classes = useStyles();
    const { directive } = useContext(DeviceContext);

    function handlePowerChange(event) {
        directive(props.device.endpointId,"PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    };
    
    function handleCommand(command) {
        directive(props.device.endpointId, 'MediaController', command)
    }; 


    const serverurl="https://"+window.location.hostname;

    return (
        <CardBase nopad={true}>
            <SofaListItem   avatar={ <AirplayIcon /> } avatarState={ props.deviceState.PowerController.powerState.value==='ON' ? 'on' : 'off' } avatarBackground={false}
                            primary={props.device.friendlyName}
                            secondaryActions={
                                <>
                                    <Switch color="primary" checked={props.deviceState.PowerController.powerState.value==='ON'} onChange={ (e) => handlePowerChange(e) } />
                                </>
                            }
            />
            { (props.deviceState.PowerController.powerState.value==='ON' && props.deviceState.MediaController.title.value) &&
                <Grid container className={classes.media} >
                    <Grid item xs={4} >
                        <img className={classes.art} src={serverurl+props.deviceState.MediaController.art.value+"?title="+props.deviceState.MediaController.title.value} alt={ props.deviceState.MediaController.title.value} />
                    </Grid>
                    <Grid item container xs={8} className={classes.mediaText}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">{props.deviceState.MediaController.title.value}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton size={"small"} aria-label="play" className={classes.playButton} onClick={ () => handleCommand(props.deviceState.MediaController.playbackState.value==='PLAYING' ? 'Pause': 'Play' )}>
                                { props.deviceState.MediaController.playbackState.value==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </CardBase>
    )
}

export default React.memo(AppleTV);