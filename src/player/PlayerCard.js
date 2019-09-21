import React, { useState, useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { DataContext } from '../DataContext/DataProvider';

import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import PlayerArtOverlay from './PlayerArtOverlay';
import PlayerArtOverlayButtons from './PlayerArtOverlayButtons';

import PlayerVolume from './PlayerVolume';
import PlayerCover from './PlayerCover';
import GridItem from '../GridItem';

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
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceByEndpointId } = useContext(DataContext);

    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/'+props.player.endpointId.split(':')[0]+'/logo'

    function handlePlayPause(event) {
        event.stopPropagation();
        if (props.player.MusicController.playbackState.value ==='PLAYING') {
             props.player.MusicController.directive("Pause")
        } else {
             props.player.MusicController.directive("Play")
        }
    }; 

    function handleSkip(event) {
         props.player.MusicController.directive("Skip")
    }; 

    function handleStop(event) {
        props.player.MusicController.directive("Stop")
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
        applyLayoutCard('PlayersLayout',{'player':props.player.endpointId})    
    }
    
    function getLinkedPlayers() {
        var linked=[]
        if (!props.player.MusicController.linked.value) {
            return []
        }
        if (!Array.isArray(props.player.MusicController.linked.value)) {
            return []
        }
        for (var i = 0; i < props.player.MusicController.linked.value.length; i++) {
            if (deviceByEndpointId(props.player.MusicController.linked.value[i])) {
                linked.push(deviceByEndpointId(props.player.MusicController.linked.value[i]))
            }
        }
        console.log('linked', linked)
        return linked
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} >
            <PlayerArtOverlay   art={props.player.MusicController.art.value ? props.player.MusicController.art.value : coverDefault }
                                title={props.player.MusicController.title.value ? props.player.MusicController.title.value : ''}
                                artist={props.player.MusicController.artist.value ? props.player.MusicController.artist.value : ''}
                        >
                <PlayerArtOverlayButtons min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                            playPause={handlePlayPause} skip={handleSkip} 
                                            playbackState={ props.player.MusicController.playbackState.value ? props.player.MusicController.playbackState.value : 'Unknown'} />
            </PlayerArtOverlay>
            <List className={classes.list} >
                <PlayerVolume key={ props.player.endpointId } player={props.player} />
                { getLinkedPlayers().map( linkedplayer => (
                    <PlayerVolume key={ linkedplayer.endpointId} player={ linkedplayer } />
                ))}
            </List>
            { coverView ?
                <PlayerCover playbackState={props.player.MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.player.MusicController.title.value} artist={props.player.MusicController.artist.value} src={props.player.MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
        </ GridItem >
    );
}
