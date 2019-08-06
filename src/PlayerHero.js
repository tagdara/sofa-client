import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';
import { withUser } from './user/UserProvider';

import PlayerCard from './sonos/PlayerCard';
import Sonos from './sonos/Sonos';
import GridItem from './GridItem';
import NoPlayer from './sonos/NoPlayer';

function PlayerHero(props) {
    
    const [speakers, setSpeakers] = useState(props.devicesByCategory('SPEAKER'))
    const isMobile = window.innerWidth <= 800;
    const [mini, setMini] = useState(false);
    const [defaultPlayer, setDefaultPlayer] = useState(props.Primary);
    const [player, setPlayer] = useState({})

    useEffect(() => {
        // unfortunately happens every time theres an update of any kind
        setSpeakers(props.devicesByCategory('SPEAKER'))
        setPlayer(props.deviceByEndpointId(bestPlayer()))
    },[props.deviceProperties, props.devices]);

    function bestPlayer() {
        
        var defaultexists=false
        
        if (props.userPlayer) {
            return props.userPlayer
        } else {
            var hotplayer='';
            for (var s = 0; s < speakers.length; s++) {
                if (hotplayer=='') { hotplayer=speakers[s].endpointId }
                var name=speakers[s].friendlyName
                if (defaultPlayer==speakers[s].endpointId) {
                    defaultexists=true
                }
                if (props.deviceProperties.hasOwnProperty(speakers[s].endpointId)) {
                    var dev=props.deviceProperties[speakers[s].endpointId]
                    if (dev.hasOwnProperty("playbackState")) {
                        if (dev.playbackState=='PLAYING') {
                            if (dev.input==name || dev.input=="") {
                                hotplayer=name
                            } else {
                                hotplayer=dev.input
                            }
                            break
                        }
                    }
                }
            }
            if (hotplayer) { return hotplayer }
        } 
        if (defaultexists) {
            return defaultPlayer
        } 
        
        return ''
    }

    function changePlayer(endpointId) {
        setPlayer(props.deviceByEndpointId(endpointId))
        setMini(false); 
    }

    function playerProps(endpointId) {
        if (props.deviceProperties.hasOwnProperty(endpointId)) {
            return props.deviceProperties[endpointId]
        } else {
            return {}
        }
    }
    
    function bigCard() {
        
        if (mini || !player || !playerProps(player.endpointId)) {
            return false
        }
        if (playerProps(player.endpointId).hasOwnProperty('playbackState')) {
            if (playerProps(player.endpointId).playbackState && playerProps(player.endpointId).playbackState!='STOPPED') {
                return true
            }
        }
        return false
    }
    
    return ( 
        <React.Fragment>
            { player ?
            <>
                { bigCard()==false ?
                    <Sonos changePlayer={changePlayer} wide={props.wide} small={true} setLayoutCard={props.setLayoutCard} player={player} name={player.friendlyName} deviceProperties={playerProps(player.endpointId)} />
                :
                    <PlayerCard wide={props.wide} changePlayer={changePlayer} player={player} name={player.friendlyName}  setMini={setMini} />
                }
            </>
            :
            <NoPlayer wide={true} />
            }
        </React.Fragment>
    );
}


export default withUser(withData(PlayerHero));
