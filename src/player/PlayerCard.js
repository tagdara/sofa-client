import React, { useState, useEffect, useContext } from 'react';
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
    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, getEndpointIdsByFriendlyName, directive, unregisterDevices } = useContext(DataContext);

    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/'+props.player.split(':')[0]+'/logo'
    //const jukebox = deviceStateByEndpointId('jukebox:player:jukebox')

    const [jukebox, setJukebox]=useState(undefined)
    
    useEffect(() => {
        getEndpointIdsByCategory('SPEAKER','PlayerCard')
        setJukebox(getEndpointIdsByFriendlyName('Jukebox', 'PlayerCard'))
        return function cleanup() {
            unregisterDevices('PlayerCard');
        };
    // eslint-disable-next-line 
    }, [] )


    function handlePlayPause(event) {
        event.stopPropagation();

        if (deviceStates[props.player].MusicController.title.value==='Line-In' ) {
            if (deviceStates[jukebox].MusicController.playbackState.value ==='PLAYING') {
                directive(jukebox, 'MusicController', 'Pause')
            } else {
                directive(jukebox, 'MusicController', 'Play')
            }
        } else {
            if (deviceStates[props.player].MusicController.playbackState.value ==='PLAYING') {
                directive(props.player, 'MusicController', 'Pause')
            } else {
                directive(props.player, 'MusicController', 'Play')
            }
        }
    }; 

    function handleSkip(event) {
        if (deviceStates[props.player].MusicController.title.value==='Line-In' ) {
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
        applyLayoutCard('PlayersLayout',{'player':props.player.endpointId})    
    }
    
    function getLinkedPlayers() {
        var linked=[]
        if (!deviceStates[props.player].MusicController.linked.value) {
            return []
        }
        if (!Array.isArray(deviceStates[props.player].MusicController.linked.value)) {
            return []
        }
        for (var i = 0; i < deviceStates[props.player].MusicController.linked.value.length; i++) {
            if (deviceStates[props.player].MusicController.linked.value[i]) {
                linked.push(deviceStates[props.player].MusicController.linked.value[i])
            }
        }
        return linked
    }

    return (
        cardReady('PlayerCard') ?
        <GridItem wide={props.wide} nopad={true} >
            { deviceStates[props.player].MusicController.title.value==='Line-In' && jukebox ?
                <PlayerArtOverlay   art={deviceStates[jukebox].MusicController.art.value ? deviceStates[jukebox].MusicController.art.value : coverDefault }
                                    title={deviceStates[jukebox].MusicController.title.value ? deviceStates[jukebox].MusicController.title.value : ''}
                                    artist={deviceStates[jukebox].MusicController.artist.value ? deviceStates[jukebox].MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} jukebox={true}
                                                playbackState={ deviceStates[jukebox].MusicController.playbackState.value ? deviceStates[jukebox].MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            :
                <PlayerArtOverlay   art={deviceStates[props.player].MusicController.art.value ? deviceStates[props.player].MusicController.art.value : coverDefault }
                                    title={deviceStates[props.player].MusicController.title.value ? deviceStates[props.player].MusicController.title.value : ''}
                                    artist={deviceStates[props.player].MusicController.artist.value ? deviceStates[props.player].MusicController.artist.value : ''}
                                    cover={handleCover} setMini={props.setMini}
                >
                    <PlayerArtOverlayButtons    min={props.setMini} cover={handleCover} stop={handleStop} players={handlePlayers}
                                                playPause={handlePlayPause} skip={handleSkip} 
                                                playbackState={ deviceStates[props.player].MusicController.playbackState.value ? deviceStates[props.player].MusicController.playbackState.value : 'Unknown'} />
                </PlayerArtOverlay>
            }
            <Grid item xs={12}>
            <List className={classes.list} >
                <PlayerVolume key={ props.player } name={ devices[props.player].friendlyName } player={deviceStates[props.player]} directive={directive} />
                { getLinkedPlayers().map( linkedplayer => (
                    <PlayerVolume key={ linkedplayer.endpointId} player={ linkedplayer } directive={directive} />
                ))}
            </List>
            { coverView ?
                <PlayerCover    playbackState={deviceStates[props.player].MusicController.playbackState.value} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} 
                                title={deviceStates[props.player].MusicController.title.value} artist={deviceStates[props.player].MusicController.artist.value} 
                                src={deviceStates[props.player].MusicController.art.value} open={coverView} close={ closeCover } />
                :null
            }
            </Grid>
        </ GridItem >
        : 
        null
    );
}
