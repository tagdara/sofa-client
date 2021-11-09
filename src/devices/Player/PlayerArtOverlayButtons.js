import React from 'react';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Grid from '@mui/material/Grid';
import SpeakerIcon from '@mui/icons-material/Speaker';

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
            width: "100%",
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

