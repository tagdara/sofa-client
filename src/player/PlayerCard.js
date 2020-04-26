import React, { useState, useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { DataContext } from '../DataContext/DataProvider';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
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
    const { deviceStateByEndpointId, directive } = useContext(DataContext);

    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/'+props.player.endpointId.split(':')[0]+'/logo'
    const jukebox = deviceStateByEndpointId('jukebox:player:jukebox')

    function handlePlayPause(event) {
        event.stopPropagation();

        if (props.player.MusicController.title.value==='Line-In' ) {
            if (jukebox.MusicController.playbackState.value ==='PLAYING') {
                directive(jukebox.endpointId, 'MusicController', 'Pause')
            } else {
                directive(jukebox.endpointId, 'MusicController', 'Play')
            }
        } else {
            if (props.player.MusicController.playbackState.value ==='PLAYING') {
                directive(props.player.endpointId, 'MusicController', 'Pause')
            } else {
                directive(props.player.endpointId, 'MusicController', 'Play')
            }
        }
    }; 

    function handleSkip(event) {
        if (props.player.MusicController.title.value==='Line-In' ) {
            directive(jukebox.endpointId, 'MusicController', "Skip")
        } else {
            directive(props.player.endpointId, 'MusicController', "Skip")
        }
    }; 

    function handleStop(event) {
        directive(props.player.endpointId, 'MusicController', "Stop")
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
            if (deviceStateByEndpointId(props.player.MusicController.linked.value[i])) {
                linked.push(deviceStateByEndpointId(props.player.MusicController.linked.value[i]))
            }
        }
        return linked
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} >
            { props.player.MusicController.title.value==='Line-In' ?
                <PlayerArtOverlay   art={jukebox.MusicController.art.value ? jukebox.MusicController.art.value : coverDefault }
                                    title={jukebox.MusicController.title.value ? jukebox.MusicController.title.value : ''}
                                    artist={jukebox.MusicController.artist.value ? jukebox.MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} jukebox={true}
                                                playbackState={ jukebox.MusicController.playbackState.value ? jukebox.MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            :
                <PlayerArtOverlay   art={props.player.MusicController.art.value ? props.player.MusicController.art.value : coverDefault }
                                    title={props.player.MusicController.title.value ? props.player.MusicController.title.value : ''}
                                    artist={props.player.MusicController.artist.value ? props.player.MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} 
                                                playbackState={ props.player.MusicController.playbackState.value ? props.player.MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            }
            <Grid item xs={12}>
            <List className={classes.list} >
                <PlayerVolume key={ props.player.endpointId } player={props.player} directive={directive} />
                { getLinkedPlayers().map( linkedplayer => (
                    <PlayerVolume key={ linkedplayer.endpointId} player={ linkedplayer } directive={directive} />
                ))}
            </List>
            { coverView ?
                <PlayerCover playbackState={props.player.MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.player.MusicController.title.value} artist={props.player.MusicController.artist.value} src={props.player.MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
            </Grid>
        </ GridItem >
    );
}
