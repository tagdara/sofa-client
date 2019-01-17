import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import PlayerCard from './sonos/PlayerCard';
import Sonos from './sonos/sonos';
import GridItem from './GridItem';
import NoPlayer from './sonos/NoPlayer';

function PlayerHero(props) {
    
    const speakers = props.devicesByCategory('SPEAKER')
    const isMobile = window.innerWidth <= 800;
    const [mini, setMini] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [defaultPlayer, setDefaultPlayer] = useState("Office");
    const device = props.deviceByName(playerName)

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
    
    return ( 
        ( mini || !playerName || !playerProps(playerName) || (playerProps(playerName).playbackState=='STOPPED' && !props.player)) ?
        <Sonos setPlayer={setPlayerAndMini} wide={props.wide} small={true} setLayoutCard={props.setLayoutCard} name={playerName} deviceProperties={playerProps(playerName)} />
        :
        <PlayerCard wide={props.wide} name={playerName} />
    );
}


export default withData(PlayerHero);
