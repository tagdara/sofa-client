import React from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const useStyles = makeStyles({

    playIcon: {
        height: 38,
        width: 38,
    },
    playButton: {
        position: "absolute",
        bottom: 8,
        left: 16,
    },
    stopButton: {
        position: "absolute",
        bottom: 20,
        right: 96,
    },
    skipButton: {
        position: "absolute",
        bottom: 12,
        left: 64,
    },
    playersButton: {
        position: "absolute",
        bottom: 12,
        right: 16,
    },
    coverButton: {
        position: "absolute",
        bottom: 20,
        left: 64,
    },
    minButton: {
        position: "absolute",
        top: 20,
        right: 20,
    },

});

export default function PlayerArtOverlayButtons(props) {
    
    const classes = useStyles();


    return ( 
        <React.Fragment >
            <IconButton size={"small"} color="primary" className={classes.playersButton} onClick={ (e) => props.players(e)}>
                <ViewModuleIcon />
            </IconButton>
            <Fab size={"small"} color="primary" aria-label="play" className={classes.playButton} onClick={ (e) => props.playPause(e)}>
                { props.playbackState==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </Fab>
            <IconButton size={"small"} className={classes.skipButton} onClick={ (e) => props.skip(e)}>
                <SkipNextIcon />
            </IconButton>
        </React.Fragment>
    );
}

