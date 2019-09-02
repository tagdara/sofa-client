import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => {
    
    return {
        gridList: { 
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
        <GridList cellHeight={80} className={classes.gridList} cols={3}>
            <GridListTile cols={1}>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorUp')}>
                    <ExpandLessIcon />
                </Button>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
            </GridListTile>

            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorLeft')}>
                    <ChevronLeftIcon />
                </Button>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('DpadCenter')}>
                    <FullscreenIcon />
                </Button>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorRight')}>
                    <ChevronRightIcon />
                </Button>
            </GridListTile>

            <GridListTile cols={1} className={classes.gridButtonTile}>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('CursorDown')}>
                    <ExpandMoreIcon />
                </Button>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
            </GridListTile>

            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('Exit')}>
                    <ArrowBackIcon />
                </Button>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
            </GridListTile>
            <GridListTile cols={1} className={classes.gridButtonTile}>
                <Button className={classes.remoteButton} onClick={ (e) => handleRemoteButton('Home')}>
                    <HomeIcon />
                </Button>
            </GridListTile>
        </GridList>
    );

}

