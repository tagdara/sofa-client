import React from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

const useStyles = makeStyles(theme => {
    
    return {    
        playIcon: {
            height: 38,
            width: 38,
        },
        playButton: {
            position: "absolute",
            bottom: 8,
            left: 16,
            backgroundColor: theme.palette.background.button,
        },
        stopButton: {
            position: "absolute",
            bottom: 8,
            right: 96,
        },
        skipButton: {
            position: "absolute",
            bottom: 8,
            left: 56,
            backgroundColor: theme.palette.background.button,
        },
        jukeButton: {
            position: "absolute",
            bottom: 8,
            left: 96,
            backgroundColor: theme.palette.background.button,
        },
    
        playersButton: {
            position: "absolute",
            bottom: 8,
            right: 16,
            backgroundColor: theme.palette.background.button,
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
    }
});

export default function PlayerArtOverlayButtons(props) {
    
    const classes = useStyles();
    
    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        window.open(newurl,'_jukebox');
    }
    
    return ( 
        <React.Fragment >
            <IconButton size={"small"} color="primary" className={classes.playersButton} onClick={ (e) => props.players(e)}>
                <ViewModuleIcon />
            </IconButton>
            <IconButton size={"small"} aria-label="play" className={classes.playButton} onClick={ (e) => props.playPause(e)}>
                { props.playbackState==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </IconButton>
            <IconButton size={"small"} className={classes.skipButton} onClick={ (e) => props.skip(e)}>
                <SkipNextIcon />
            </IconButton>
            { props.jukebox &&
            <IconButton size={"small"} className={classes.jukeButton} onClick={openJukebox}>
                <QueueMusicIcon />
            </IconButton>
            }
        </React.Fragment>
    );
}

