import React from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import MaximizeIcon from '@material-ui/icons/Maximize';

const useStyles = makeStyles({

    playIcon: {
        height: 38,
        width: 38,
    },
    playButton: {
        position: "absolute",
        bottom: 16,
        right: 48,
    },
    stopButton: {
        position: "absolute",
        bottom: 20,
        right: 96,
    },
    skipButton: {
        position: "absolute",
        bottom: 20,
        right: 4,
    },
    playersButton: {
        position: "absolute",
        bottom: 20,
        left: 16,
    },

    coverButton: {
        position: "absolute",
        bottom: 20,
        left: 112,
    },
    minButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },

});

export default function PlayerArtOverlayButtons(props) {
    
    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;

    return ( 
        <React.Fragment >
            <IconButton color="primary" className={classes.minButton} onClick={ (e) => props.min(true)}>
                <MaximizeIcon />
            </IconButton>
            <IconButton color="primary" className={classes.playersButton} onClick={ (e) => props.players(e)}>
                <ViewModuleIcon />
            </IconButton>
            { isMobile ? null :
            <IconButton color="primary" className={classes.coverButton} onClick={ (e) => props.cover(e)}>
                <FullscreenIcon />
            </IconButton>
            }
            <IconButton className={classes.stopButton} onClick={ (e) => props.stop(e)}>
                <StopIcon />
            </IconButton>
            <Fab color="primary" aria-label="play" className={classes.playButton} onClick={ (e) => props.playPause(e)}>
                { props.playbackState==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </Fab>
            <IconButton className={classes.skipButton} onClick={ (e) => props.skip(e)}>
                <SkipNextIcon />
            </IconButton>
        </React.Fragment>
    );
}

