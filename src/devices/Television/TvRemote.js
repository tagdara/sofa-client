import React from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import HomeIcon from '@mui/icons-material/Home';


const useStyles = makeStyles(theme => {
    
    return {
        Grid: { 
            maxWidth: 320,
            margin: "0 auto !important",
            backgroundColor: theme.palette.background.default,
        },
        gridButtonTile: {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        remoteButton: {
            width: "100%",
            flexGrow: 1,
            height: "100%",
        },
    }
});


export default function TvRemote(props) {
    
    const classes = useStyles();

    function handleRemoteButton(buttonName) {
        console.log('sending button',  buttonName)
        props.device.RemoteController.directive('PressRemoteButton', { 'buttonName' : buttonName })
    };

    return (
        <Grid cellHeight={80} className={classes.Grid} cols={3}>
            <Grid cols={1}>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorUp')}>
                    <ExpandLessIcon />
                </Button>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
            </Grid>

            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorLeft')}>
                    <ChevronLeftIcon />
                </Button>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('DpadCenter')}>
                    <FullscreenIcon />
                </Button>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorRight')}>
                    <ChevronRightIcon />
                </Button>
            </Grid>

            <Grid cols={1} className={classes.gridButtonTile}>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorDown')}>
                    <ExpandMoreIcon />
                </Button>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
            </Grid>

            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('Exit')}>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
            </Grid>
            <Grid cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('Home')}>
                    <HomeIcon />
                </Button>
            </Grid>
        </Grid>
    );

}

