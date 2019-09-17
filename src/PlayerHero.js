import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import PlayerCard from './sonos/PlayerCard';
import Sonos from './sonos/Sonos';
import NoPlayer from './sonos/NoPlayer';

function bestPlayerId(speakers, defaultPlayer, userPlayer) {
    
    var defaultexists=false
    
    if (userPlayer) {
        return userPlayer
    }

    var hotplayer=undefined;
    
    for (var s = 0; s < speakers.length; s++) {
        if (speakers[s].endpointId===defaultPlayer) {defaultexists=true}
        if (speakers[s].MusicController.playbackState.value==='PLAYING') {
            hotplayer=speakers[s]
            break
        }
    }

    if (hotplayer) { 
        if (hotplayer.InputController.input.value===hotplayer.friendlyName || hotplayer.InputController.input.value==="") {
            return hotplayer.endpointId
        }
        return hotplayer.InputController.input.value
    }

    if (defaultexists) {
        return defaultPlayer
    }
    
    if (speakers) {
        return speakers[0].endpointId
    }
    return undefined
}


export default function PlayerHero(props) {
    
    const { userPlayer, defaultPlayer, setUserPlayer, devicesByCategory, deviceByEndpointId } = useContext(DataContext);
    const speakers = devicesByCategory('SPEAKER')
    const [mini, setMini] = useState(false);
    const [playerId, setPlayerId] = useState('')

    useEffect(()=> {
        setPlayerId(bestPlayerId(speakers, defaultPlayer, userPlayer))
    }, [speakers, defaultPlayer, userPlayer] )

    function bigCard() {
        
        var player=deviceByEndpointId(playerId)
        
        if (mini || !player) {
            return false
        }
        if (!mini || (player.hasOwnProperty('MusicController') && player.MusicController.playbackState.value && player.MusicController.playbackState.value!=='STOPPED')) {
            return true
        }
        return false
    }
    
    return ( 
        <React.Fragment>
            { playerId ?
            <>
                { bigCard()===false ?
                    <Sonos setUserPlayer={setUserPlayer} wide={props.wide} small={true} player={deviceByEndpointId(playerId)} />
                :
                    <PlayerCard wide={props.wide} player={deviceByEndpointId(playerId)} setMini={setMini} />
                }
            </>
            :
            <NoPlayer wide={true} />
            }
        </React.Fragment>
    );
}

