import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from '../DataContext/withData';
import { withLayout } from '../layout/NewLayoutProvider';
import { withUser } from '../user/UserProvider';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import PlayerArtOverlay from './PlayerArtOverlay';
import PlayerArtOverlayButtons from './PlayerArtOverlayButtons';

import SonosVolume from './SonosVolume';
import SonosCover from './SonosCover';
import SonosFavorites from './SonosFavorites';
import GridItem from '../GridItem';

const useStyles = makeStyles({

    list: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
});

function PlayerCard(props) {
    
    const classes = useStyles();
    const speakers = props.devicesByCategory('SPEAKER')
    const isMobile = window.innerWidth <= 800;
    const [mini, setMini] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [mediaSelect, setMediaSelect] = useState(false);
    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/sonos/logo'; 
    const [imageLoaded, setImageLoaded] = useState(false)

    function handlePlayPause(event) {
        event.stopPropagation();
        if (props.player.MusicController.playbackState.value =='PLAYING') {
             props.player.MusicController.directive("Pause")
        } else {
             props.player.MusicController.directive("Play")
        }
    }; 

    function handleSkip(event) {
         props.player.MusicController.directive("Skip")
    }; 

    function handleStop(event) {
        event.stopPropagation();
        props.player.MusicController.directive("Stop")
    }; 
    
    function toggleOverlay() {
        setShowOverlay(!showOverlay)
    }
    
    function handleMedia() {
        setMediaSelect(true)
    }

    function closeMediaSelect() {
        setMediaSelect(false)
    }

    function handleCover() {
        var elem = document.documentElement;
        elem.webkitRequestFullScreen();
        setCoverView(true)
    }

    function closeCover() {
        setCoverView(false)
        document.webkitExitFullscreen();
    }

    function addDefaultSrc(ev) {
        ev.target.src = '/image/sonos/logo'
    }
    
    function setPlayerAndMini(endpointId) {
        props.changePlayer(endpointId)
        setMini(false); 
    }

    function handlePlayers(e) {
        props.applyLayoutCard('PlayersLayout',{'player':props.player.endpointId})    
    }
    
    function getLinkedPlayers() {
        var linked=[]
        if (!props.player.MusicController.linked.value) {
            console.log('Linked value is empty',props.player.MusicController.linked.value)
            return []
        }
        if (!Array.isArray(props.player.MusicController.linked.value)) {
            console.log('Linked value is not an array',props.player.MusicController.linked.value)
            return []
        }
        for (var i = 0; i < props.player.MusicController.linked.value.length; i++) {
            console.log('Linked adding:',props.player.MusicController.linked.value[i])
            linked.push(props.deviceByEndpointId(props.player.MusicController.linked.value[i]))
        }
        return linked
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} >
            <PlayerArtOverlay   art={props.player.MusicController.art.value ? props.player.MusicController.art.value : coverDefault }
                                title={props.player.MusicController.title.value ? props.player.MusicController.title.value : ''}
                                artist={props.player.MusicController.artist.value ? props.player.MusicController.artist.value : ''}
                        >
                <PlayerArtOverlayButtons min={props.setMini} media={handleMedia} cover={handleCover} stop={handleStop} players={handlePlayers}
                                            playPause={handlePlayPause} skip={handleSkip} 
                                            playbackState={ props.player.MusicController.playbackState.value ? props.player.MusicController.playbackState.value : 'Unknown'} />
            </PlayerArtOverlay>
            <List className={classes.list} >
                <SonosVolume key={ props.player.endpointId } player={props.player} />
                { getLinkedPlayers().map( linkedplayer => (
                    <SonosVolume key={ linkedplayer.endpointId} player={ linkedplayer } />
                ))}
            </List>

            { mediaSelect ?
                <SonosFavorites open={mediaSelect} close={ closeMediaSelect } />
                :null
            }
            { coverView ?
                <SonosCover playbackState={props.player.MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.player.MusicController.title.value} artist={props.player.MusicController.artist.value} src={props.player.MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
        </ GridItem >
    );
}

export default withUser(withData(withLayout(PlayerCard)));
