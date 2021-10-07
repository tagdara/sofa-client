import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import PlayerArtOverlay from './PlayerArtOverlay';
import PlayerArtOverlayButtons from './PlayerArtOverlayButtons';

import PlayerVolume from './PlayerVolume';
import PlayerLinks from './PlayerLinks';
import PlayerCover from './PlayerCover';
import CardBase from 'components/CardBase';
import PlaceholderCard from 'layout/PlaceholderCard';

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
    const { selectPage } = useContext(LayoutContext);
    const { cardReady, devices, deviceState, getEndpointIdsByCategory, getEndpointIdsByFriendlyName, directive, unregisterDevices } = useContext(DeviceStateContext);

    const [coverView, setCoverView] = useState(false);
    var coverDefault = undefined
    try {
        coverDefault = '/image/'+props.player.split(':')[0]+'/logo'
    } 
    catch {}

    const [jukebox, setJukebox]=useState(undefined)
    
    useEffect(() => {
        getEndpointIdsByCategory('SPEAKER','PlayerCard')
        setJukebox(getEndpointIdsByFriendlyName('Jukebox', 'PlayerCard')[0])
        return function cleanup() {
            unregisterDevices('PlayerCard');
        };
    // eslint-disable-next-line 
    }, [] )


    function handlePlayPause(event) {
        event.stopPropagation();

        if (deviceState(props.player).MusicController.title.value==='Line-In' ) {
            if (deviceState(jukebox).MusicController.playbackState.value ==='PLAYING') {
                directive(jukebox, 'MusicController', 'Pause')
            } else {
                directive(jukebox, 'MusicController', 'Play')
            }
        } else {
            if (deviceState(props.player).MusicController.playbackState.value ==='PLAYING') {
                directive(props.player, 'MusicController', 'Pause')
            } else {
                directive(props.player, 'MusicController', 'Play')
            }
        }
    }; 

    function handleSkip(event) {
        if (deviceState(props.player).MusicController.title.value==='Line-In' ) {
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

        if (!deviceState(props.player).MusicController.linked.value) {
            return []
        }
        if (!Array.isArray(deviceState(props.player).MusicController.linked.value)) {
            return []
        }
        return deviceState(props.player).MusicController.linked.value
    }
    
    if (!cardReady('PlayerCard') || !props.player) {
        return <PlaceholderCard count={ 3 } />
    }

    return (
        <CardBase nopad={true} >
            { deviceState(props.player).MusicController.title.value==='Line-In' && jukebox ?
                <PlayerArtOverlay   art={deviceState(jukebox).MusicController.art.value ? deviceState(jukebox).MusicController.art.value : coverDefault }
                                    title={deviceState(jukebox).MusicController.title.value ? deviceState(jukebox).MusicController.title.value : ''}
                                    artist={deviceState(jukebox).MusicController.artist.value ? deviceState(jukebox).MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} jukebox={true}
                                                playbackState={ deviceState(jukebox).MusicController.playbackState.value ? deviceState(jukebox).MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            :
                <PlayerArtOverlay   art={deviceState(props.player).MusicController.art.value ? deviceState(props.player).MusicController.art.value : coverDefault }
                                    title={deviceState(props.player).MusicController.title.value ? deviceState(props.player).MusicController.title.value : ''}
                                    artist={deviceState(props.player).MusicController.artist.value ? deviceState(props.player).MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} 
                                                playbackState={ deviceState(props.player).MusicController.playbackState.value ? deviceState(props.player).MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            }
            <Grid item xs={12}>
            <List className={classes.list} >
                <PlayerVolume key={ props.player } name={ devices[props.player].friendlyName } device={ devices[props.player] } deviceState={deviceState(props.player)} directive={directive} />
                <PlayerLinks links={getLinkedPlayers()} />
            </List>
            { coverView ?
                <PlayerCover    playbackState={deviceState(props.player).MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} 
                                title={deviceState(props.player).MusicController.title.value} artist={deviceState(props.player).MusicController.artist.value} 
                                src={deviceState(props.player).MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
            </Grid>
        </ CardBase >
    );
}
