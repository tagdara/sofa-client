import React from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Grid from '@material-ui/core/Grid';
import SpeakerIcon from '@material-ui/icons/Speaker';

const useStyles = makeStyles(theme => {
    
    return {    
        playIcon: {
            height: 38,
            width: 38,
        },
        playerButton: {
            backgroundColor: theme.palette.background.button,
            marginRight: 8,
        },
        spacer: {
            flexGrow: 1,
        },
        buttonRow: {
            display: "flex",
            paddingRight: 16,
        }
    }
});

export default function PlayerArtOverlayButtons(props) {
    
    const classes = useStyles();
    
    function openJukebox() {
        var newurl="https://jukebox.dayton.tech"
        window.open(newurl,'_jukebox');
    }
    
    return ( 
        <Grid className={classes.buttonRow}>
            <IconButton size={"small"} aria-label="play" className={classes.playerButton} onClick={ (e) => props.playPause(e)}>
                { props.playbackState==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </IconButton>
            { props.playbackState!=='STOPPED' &&
                <IconButton size={"small"} className={classes.playerButton} onClick={ (e) => props.skip(e)}>
                    <SkipNextIcon />
                </IconButton>
            }
            <div className={classes.spacer} />
            
            { props.jukebox &&
                <IconButton size={"small"} className={classes.playerButton} onClick={props.toggleSpeakerFilter}>
                    <SpeakerIcon />
                </IconButton>
            }
            { props.jukebox &&
                <IconButton size={"small"} className={classes.playerButton} onClick={openJukebox}>
                    <QueueMusicIcon />
                </IconButton>
            }
            { props.players &&
            <IconButton size={"small"} color="primary" className={classes.playerButton} onClick={ (e) => props.players(e)}>
                <ViewModuleIcon />
            </IconButton>
            }
        </Grid>
    );
}

