import React, { useState, useEffect } from 'react';
import { selectPage } from 'store/layoutHelpers'

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import PlayerArtOverlay from './PlayerArtOverlay';
import PlayerArtOverlayButtons from './PlayerArtOverlayButtons';

import PlayerVolume from './PlayerVolume';
import PlayerLinks from './PlayerLinks';
import PlayerCover from './PlayerCover';
import CardBase from 'components/CardBase';
import PlaceholderCard from 'layout/PlaceholderCard';
import { directive } from 'store/directive'
import { register, unregister, endpointIdsByDisplayCategory, endpointIdsByFriendlyName, compareState } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'

const useStyles = makeStyles({

    list: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
});

export default function PlayerCard(props) {
    
    const classes = useStyles();
    const jukebox = endpointIdsByFriendlyName('Jukebox')[0]
    const speakers = endpointIdsByDisplayCategory('SPEAKER')
    const states = useDeviceStateStore(state => Object.fromEntries([jukebox, ...speakers].filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))
    const [coverView, setCoverView] = useState(false);
    var coverDefault = undefined
    try {
        coverDefault = '/image/'+props.player.split(':')[0]+'/logo'
    } 
    catch {}

    useEffect(() => {
        register([jukebox, ...speakers], "playercard")
        return function cleanup() {
            unregister([jukebox, ...speakers], "playercard")
        };
    // eslint-disable-next-line 
    }, []) 


    function handlePlayPause(event) {
        event.stopPropagation();

        if (states[props.player].MusicController.title.value==='Line-In' ) {
            if (states[jukebox].MusicController.playbackState.value ==='PLAYING') {
                directive(jukebox, 'MusicController', 'Pause')
            } else {
                directive(jukebox, 'MusicController', 'Play')
            }
        } else {
            if (states[props.player].MusicController.playbackState.value ==='PLAYING') {
                directive(props.player, 'MusicController', 'Pause')
            } else {
                directive(props.player, 'MusicController', 'Play')
            }
        }
    }; 

    function handleSkip(event) {
        if (states[props.player].MusicController.title.value==='Line-In' ) {
            directive(jukebox, 'MusicController', "Skip")
        } else {
            directive(props.player, 'MusicController', "Skip")
        }
    }; 

    function handleStop(event) {
        directive(props.player, 'MusicController', "Stop")
    }; 

    function handleCover() {
        var elem = document.documentElement;
        elem.webkitRequestFullScreen();
        setCoverView(true)
    }

    function closeCover() {
        setCoverView(false)
        document.webkitExitFullscreen();
    }
    
    function handlePlayers(e) {
        selectPage('PlayersLayout',{'player':props.player.endpointId})    
    }
    
    function getLinkedPlayers() {

        if (!states[props.player].MusicController.linked.value) {
            return []
        }
        if (!Array.isArray(states[props.player].MusicController.linked.value)) {
            return []
        }
        return states[props.player].MusicController.linked.value
    }
    
    if (!states || !props.player) {
        return <PlaceholderCard count={ 3 } />
    }

    return (
        <CardBase nopad={true} >
            { states[props.player].MusicController.title.value==='Line-In' && jukebox ?
                <PlayerArtOverlay   art={states[jukebox].MusicController.art.value ? states[jukebox].MusicController.art.value : coverDefault }
                                    title={states[jukebox].MusicController.title.value ? states[jukebox].MusicController.title.value : ''}
                                    artist={states[jukebox].MusicController.artist.value ? states[jukebox].MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} jukebox={true}
                                                playbackState={ states[jukebox].MusicController.playbackState.value ? states[jukebox].MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            :
                <PlayerArtOverlay   art={states[props.player].MusicController.art.value ? states[props.player].MusicController.art.value : coverDefault }
                                    title={states[props.player].MusicController.title.value ? states[props.player].MusicController.title.value : ''}
                                    artist={states[props.player].MusicController.artist.value ? states[props.player].MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} 
                                                playbackState={ states[props.player].MusicController.playbackState.value ? states[props.player].MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            }
            <Grid item xs={12}>
            <List className={classes.list} >
                <PlayerVolume key={ props.player } endpointId={props.player} />
                <PlayerLinks links={getLinkedPlayers()} />
            </List>
            { coverView ?
                <PlayerCover    playbackState={states[props.player].MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} 
                                title={states[props.player].MusicController.title.value} artist={states[props.player].MusicController.artist.value} 
                                src={states[props.player].MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
            </Grid>
        </ CardBase >
    );
}
