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
    const spkset = JSON.stringify(props.devicesByCategory('SPEAKER'))

    const speakers = props.devicesByCategory('SPEAKER')
    const isMobile = window.innerWidth <= 800;
    const [mini, setMini] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [mediaSelect, setMediaSelect] = useState(false);
    const [coverView, setCoverView] = useState(false);
    const coverDefault = '/image/sonos/logo'; 
    const [imageLoaded, setImageLoaded] = useState(false)

    function createLinkVolumes() {

        let volumes=[];
        if (props.deviceProperties[props.player.endpointId]) {
            var allvol=[props.player.endpointId]
            if (props.deviceProperties[props.player.endpointId].hasOwnProperty('linked')) {
                allvol=[props.player.endpointId, ...props.deviceProperties[props.player.endpointId].linked];
            }
        
            for (var i = 0; i < allvol.length; i++) {
                volumes.push(
                    <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ allvol[i] } name={ props.deviceProperties[allvol[i]].friendlyName } endpointId={ allvol[i] } deviceProperties={ props.deviceProperties[allvol[i]] } />
                )
            }
        }
        return volumes
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (props.deviceProperties[props.player.endpointId].playbackState=='PLAYING') {
            props.sendAlexaCommand(props.player.friendlyName, props.player.endpointId, 'MusicController', "Pause")
        } else {
            props.sendAlexaCommand(props.player.friendlyName, props.player.endpointId, 'MusicController', "Play")
        }
    }; 


    function handleSkip(event) {
        event.stopPropagation();
        props.sendAlexaCommand(props.player.friendlyName, props.player.endpointId, 'MusicController', "Skip")
    }; 


    function handleStop(event) {
        event.stopPropagation();
        props.sendAlexaCommand(props.player.friendlyName, props.player.endpointId, 'MusicController', "Stop")
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
    
    function playerProps(endpointId) {
        if (name && props.deviceProperties.hasOwnProperty(endpointId)) {
            return props.deviceProperties[endpointId]
        } else {
            return {}
        }
    }
    
    function handlePlayers(e) {
        props.applyLayoutCard('PlayersLayout',{'player':props.player})    
    }
    
    return (
        props.deviceProperties && props.deviceProperties.hasOwnProperty(props.player.endpointId) ?
        <GridItem wide={props.wide} nopad={true} >
            <PlayerArtOverlay   art={props.deviceProperties[props.player.endpointId] ? props.deviceProperties[props.player.endpointId].art : coverDefault }
                                title={props.deviceProperties[props.player.endpointId] ? props.deviceProperties[props.player.endpointId].title : ''}
                                artist={props.deviceProperties[props.player.endpointId] ? props.deviceProperties[props.player.endpointId].artist : ''}
                        >
                <PlayerArtOverlayButtons min={props.setMini} media={handleMedia} cover={handleCover} stop={handleStop} players={handlePlayers}
                                            playPause={handlePlayPause} skip={handleSkip} 
                                            playbackState={ props.deviceProperties[props.player.endpointId] ? props.deviceProperties[props.player.endpointId].playbackState : 'Unknown'} />
            </PlayerArtOverlay>
            <List className={classes.list} >
                <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ props.player.endpointId } name={ props.player.friendlyName } endpointId={ props.player.endpointId} deviceProperties={ props.deviceProperties[props.player.endpointId] } />
                { !props.deviceProperties[props.player.endpointId].hasOwnProperty('linked') ? null :
                    props.deviceProperties[props.player.endpointId].linked.map( linkedplayer =>
                        <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ linkedplayer} name={ props.nameByEndpointId(linkedplayer) } endpointId={ linkedplayer } deviceProperties={ props.deviceProperties[linkedplayer] } />
                    )
                }
            </List>
            { mediaSelect ?
                <SonosFavorites open={mediaSelect} close={ closeMediaSelect } />
                :null
            }
            { coverView ?
                <SonosCover playbackState={props.deviceProperties[props.player.endpointId].playbackState} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.deviceProperties[props.player.endpointId].title} artist={props.deviceProperties[props.player.endpointId].artist} src={props.deviceProperties[props.player.endpointId].art} open={coverView} close={ closeCover } />
                :null
            }
        </ GridItem >
        :
        null
    );
}

export default withUser(withData(withLayout(PlayerCard)));
