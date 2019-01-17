import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from '../DataContext/withData';

import List from '@material-ui/core/List';

import PlayerArtOverlay from './PlayerArtOverlay';
import PlayerArtOverlayButtons from './PlayerArtOverlayButtons';

import SonosVolume from './sonosvolume';
import SonosCover from './sonosCover';
import SonosFavorites from './sonosFavorites';
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
    const [playerName, setPlayerName] = useState("");
    const [defaultPlayer, setDefaultPlayer] = useState("Office");
    const device = props.deviceByName(playerName)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        setPlayerName(bestPlayer())
    },[]);


    function endpointId(playername) {
        if (playername && props.deviceByName(playername).hasOwnProperty('endpointId')) {
            return props.deviceByName(playername).endpointId
        } else {
            return ''
        }
    }

    function getCoordinatorFromPlayer(playername) {
        if (props.deviceProperties.hasOwnProperty(playername)) {
            setPlayerName(props.deviceProperties[playername].input)
        } else {
            setPlayerName(playername)
        }
    }
    
    function bestPlayer() {
        
        if (props.player) {
            return props.player
        } else {
            var hotplayer='';
            for (var s = 0; s < speakers.length; s++) {
                var name=speakers[s].friendlyName
                if (props.deviceProperties.hasOwnProperty(name)) {
                    var dev=props.deviceProperties[name]
                    if (dev.hasOwnProperty("playbackState")) {
                        if (dev.playbackState=='PLAYING') {
                            if (hotplayer=="" || name==defaultPlayer) {
                                if (dev.input==name || dev.input=="") {
                                    hotplayer=name
                                } else {
                                    hotplayer=dev.input
                                }
                            }
                        }
                    }
                }
            }
            
            if (hotplayer) { return hotplayer }
        } 
                
        return defaultPlayer
    }
    
    function createLinkVolumes() {

        let volumes=[];
        if (props.deviceProperties[playerName]) {
            var allvol=[playerName]
            if (props.deviceProperties[playerName].hasOwnProperty('linked')) {
                allvol=[playerName, ...props.deviceProperties[playerName].linked];
            }
        
            for (var i = 0; i < allvol.length; i++) {
                volumes.push(
                    <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ allvol[i] } name={ allvol[i] } endpointId={ props.deviceByName(allvol[i]).endpointId } deviceProperties={ props.deviceProperties[allvol[i]] } />
                )
            }
        }
        return volumes
    }

    function handlePlayPause(event) {
        event.stopPropagation();
        if (props.deviceProperties[playerName].playbackState=='PLAYING') {
            props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Pause")
        } else {
            props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Play")
        }
    }; 


    function handleSkip(event) {
        event.stopPropagation();
        props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Skip")
    }; 


    function handleStop(event) {
        event.stopPropagation();
        props.sendAlexaCommand(playerName, device.endpointId, 'MusicController', "Stop")
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
    
    function setPlayerAndMini(name) {
        props.setPlayer(name)
        setMini(false); 
    }
    
    function playerProps(name) {
        if (name && props.deviceProperties.hasOwnProperty(name)) {
            return props.deviceProperties[name]
        } else {
            return {}
        }
    }
    
    function handlePlayers(e) {
        props.setLayoutCard('PlayersLayout',{'player':playerName})    
    }
    
    return ( 
        props.deviceProperties.hasOwnProperty(playerName) &&
        <GridItem wide={props.wide} nopad={true} >
            <PlayerArtOverlay   art={props.deviceProperties[playerName] ? props.deviceProperties[playerName].art : coverDefault }
                                title={props.deviceProperties[playerName] ? props.deviceProperties[playerName].title : ''}
                                artist={props.deviceProperties[playerName] ? props.deviceProperties[playerName].artist : ''}
                        >
                <PlayerArtOverlayButtons min={setMini} media={handleMedia} cover={handleCover} stop={handleStop} players={handlePlayers}
                                            playPause={handlePlayPause} skip={handleSkip} 
                                            playbackState={ props.deviceProperties[playerName] ? props.deviceProperties[playerName].playbackState : 'Unknown'} />
            </PlayerArtOverlay>
            <List className={classes.list} >
                <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ playerName } name={ playerName } endpointId={ endpointId() } deviceProperties={ props.deviceProperties[playerName] } />
                { !props.deviceProperties[playerName].hasOwnProperty('linked') ? null :
                    props.deviceProperties[playerName].linked.map( linkedplayer =>
                        <SonosVolume sendAlexaCommand={props.sendAlexaCommand} key={ linkedplayer } name={ linkedplayer } endpointId={ props.deviceByName(linkedplayer).endpointId } deviceProperties={ props.deviceProperties[linkedplayer] } />
                    )
                }
            </List>
            { mediaSelect ?
                <SonosFavorites open={mediaSelect} close={ closeMediaSelect } />
                :null
            }
            { coverView ?
                <SonosCover playbackState={props.deviceProperties[playerName].playbackState} handleSkip={ handleSkip} handlePlayPause={handlePlayPause} title={props.deviceProperties[playerName].title} artist={props.deviceProperties[playerName].artist} src={props.deviceProperties[playerName].art} open={coverView} close={ closeCover } />
                :null
            }
        </ GridItem >
    );
}

export default withData(PlayerCard);
