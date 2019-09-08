import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import PlayerCard from './sonos/PlayerCard';
import Sonos from './sonos/Sonos';
import NoPlayer from './sonos/NoPlayer';

function bestPlayerId(speakers, defaultPlayer) {
    
    var defaultexists=false

    var hotplayer=undefined;
    for (var s = 0; s < speakers.length; s++) {
        if (hotplayer===undefined) { hotplayer=speakers[s];}
        if (defaultPlayer===speakers[s].endpointId) defaultexists=true;
        if (speakers[s].MusicController.playbackState.value==='PLAYING') {
            hotplayer=speakers[s]
            break
        }
        if (speakers[s].MusicController.playbackState.value!=='STOPPED') {
            // set hotplayer but keep looking.
            hotplayer=speakers[s]
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
    return undefined
}


export default function PlayerHero(props) {
    
    const { devicesByCategory, deviceByEndpointId } = useContext(DataContext);
    const speakers = devicesByCategory('SPEAKER')
    const [mini, setMini] = useState(false);
    const defaultPlayer = useState(props.Primary);
    const [playerId, setPlayerId] = useState('')

    useEffect(()=> {
        setPlayerId(bestPlayerId(speakers, defaultPlayer))
    }, [speakers, defaultPlayer] )
    
    function changePlayer(endpointId) {
        setPlayerId(endpointId)
        setMini(false); 
    }

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
                    <Sonos changePlayer={changePlayer} wide={props.wide} small={true} player={deviceByEndpointId(playerId)} />
                :
                    <PlayerCard wide={props.wide} changePlayer={changePlayer} player={deviceByEndpointId(playerId)} setMini={setMini} />
                }
            </>
            :
            <NoPlayer wide={true} />
            }
        </React.Fragment>
    );
}

