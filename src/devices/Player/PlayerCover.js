import React from 'react';
import { makeStyles } from '@mui/styles';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

const useStyles = makeStyles({

    bigDialog: {
        backgroundColor: "#000",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        minWidth: '320px',
        boxSizing: "border-box",
    },
    root: {
        backgroundColor: "#000"
    },
    paper: {
        backgroundColor: "#000",
        boxShadow: "none",
        overflow: "hidden"
    },
    coverArt: {
        width: "100%",
        maxWidth: "100%",
        background: "#000",
        opacity: "1.0", 
        margin: "auto auto",
        borderRadius: 4,
    },
    titleText: {
        padding: "0 24 0 24",
        color: "#ccc",
    },
    artistText: {
        padding: "0 24 0 24",
        color: "#999",
    },
    maingrid: {
        padding: 24,
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    nopad: {
        display: 'flex',
        margin: 0,
        boxSizing: "border-box",
        padding: 0,
        flexWrap: 'wrap',
        alignItems: "center",
        flexGrow: 1,
        minWidth: "320px",
        flexBasis: 0,
        position: "relative",
    },
    textbox: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
    },
    closebutton: {
        position: "fixed",
        top: 8,
        right: 8,
    },
    pausebutton: {
        position: "fixed",
        bottom: 8,
        right: 8,
    },
    skipbutton: {
        position: "fixed",
        bottom: 8,
        right: 72,
    }
});

export default function PlayerCover(props) {
    
    const serverurl="https://"+window.location.hostname;
    const classes = useStyles();
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;

    function addDefaultSrc(ev) {
        // allow unique logos per adapter
        ev.target.src = '/image/'+props.player.endpointId.split(':')[0]+'/darklogo'
    }
    
    console.log('src',props.src)

    return (
        <Dialog fullScreen open={props.open} onClose={() => props.close()} className={classes.bigDialog} PaperProps ={{ classes: { root: classes.paper}}}>
            <Grid container spacing={8} className={classes.maingrid}>
                <Grid item xs={isMobile ? 12 : 6}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <Paper elevation={1} className={ classes.nopad} >
                        <img onError={addDefaultSrc} className={classes.coverArt} src={serverurl+props.src} alt={props.title} />
                    </Paper>
                </Slide>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6} className={classes.textbox} >
                    <Typography className={classes.titleText} variant="h1" >{props.title}</Typography>
                    <Typography className={classes.artistText} variant="h2" >{props.artist}</Typography>
                </Grid>
            </Grid>
            <IconButton className={classes.skipbutton} onClick={ (e) => props.handlePlayPause(e) } color="primary">
                { props.playbackState==='PLAYING' ? <PauseIcon /> : <PlayArrowIcon /> }
            </IconButton>
            <IconButton className={classes.pausebutton} onClick={ (e) => props.handleSkip(e) } color="primary">
                <SkipNextIcon />
            </IconButton>
            <IconButton className={classes.closebutton} onClick={() => props.close()} aria-label="Close" color="primary" autoFocus>
                <CloseIcon />
            </IconButton>
        </Dialog>
    )
    
};

