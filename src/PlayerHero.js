import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { UserContext } from './user/UserProvider';

import PlayerCard from './player/PlayerCard';
import PlayerMini from './player/PlayerMini';
import NoPlayer from './player/NoPlayer';

function bestPlayer(speakers, defaultPlayer, userPlayer) {

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
        for (var t = 0; t < speakers.length; t++) {
            if (speakers[t].friendlyName===hotplayer.InputController.input.value) {
                return speakers[t].endpointId
            }
        }
    }

    if (defaultexists) {
        return defaultPlayer
    }
    
    if (speakers.length>0) {
        return speakers[0].endpointId
    }
    return undefined
}


export default function PlayerHero(props) {
    
    const { userPlayer } = useContext(UserContext);
    const { cardReady, defaultPlayer, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    //const speakers = deviceStatesByCategory('SPEAKER')
    const [mini, setMini] = useState(props.mini);
    const [player, setPlayer] = useState('')
    const [speakers, setSpeakers]=useState(undefined)
    
    useEffect(() => {
        setSpeakers(getEndpointIdsByCategory('SPEAKER','PlayerHero'))
        return function cleanup() {
            unregisterDevices('PlayerHero');
        };
    // eslint-disable-next-line 
    }, [])

    useEffect(()=> {
        var best=bestPlayer(speakers, defaultPlayer, userPlayer)
        setPlayer(best)
    }, [speakers, defaultPlayer, userPlayer] )
    
    return ( 
        cardReady('PlayerHero') && player ?
        <>
            { mini ?
                <PlayerMini wide={props.wide} small={true} player={player} setMini={setMini} />
            :
                <PlayerCard wide={props.wide} player={player} setMini={setMini} />
            }
        </>
        :
        <NoPlayer wide={true} />
    );
}

PlayerHero.defaultProps = {
    mini: false,
}

