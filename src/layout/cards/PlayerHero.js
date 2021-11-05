import React, { useState, useEffect, useContext } from 'react';
import { register, unregister, endpointIdsByDisplayCategory, compareState } from 'store/deviceHelpers'
import useDeviceStateStore from 'store/deviceStateStore'
import { UserContext } from 'user/UserProvider';

import PlayerCard from 'devices/Player/PlayerCard';
import PlayerMini from 'devices/Player/PlayerMini';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function PlayerHero(props) {
    
    const { userPlayer } = useContext(UserContext);
    const defaultPlayer = "" // this should be defined somewhere
    //const speakers = deviceStatesByCategory('SPEAKER')
    const [ mini, setMini ] = useState(props.mini);
    const speakers = endpointIdsByDisplayCategory('SPEAKER')
    const states = useDeviceStateStore(state => Object.fromEntries(speakers.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))


    function bestPlayer(speakers, defaultPlayer, userPlayer) {
    
        var defaultexists=false
        var hotplayer=undefined;
        
        if (userPlayer) {
            return userPlayer
        }
    
        if (!speakers) {
            return hotplayer
        }
        
        for (var s = 0; s < speakers.length; s++) {
            if (speakers[s]===defaultPlayer) {defaultexists=true}
            if (states[speakers[s]].MusicController.playbackState.value==='PLAYING') {
                hotplayer=speakers[s]
                break
            }
        }
    
        if (hotplayer) { 
            try {
                if (hotplayer.InputController.input.value===hotplayer.friendlyName || hotplayer.InputController.input.value==="") {
                    return hotplayer.endpointId
                }
                for (var t = 0; t < speakers.length; t++) {
                    if (speakers[t].friendlyName===hotplayer.InputController.input.value) {
                        return speakers[t].endpointId
                    }
                }
            } 
            catch {
                console.log('Error getting input details from hotplayer', hotplayer)
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
    
    useEffect(() => {
        register(speakers, 'PlayerHero')
        return function cleanup() {
            unregister(speakers, 'PlayerHero')
        };
    // eslint-disable-next-line 
    }, [])

    if (!states) {
        return <PlaceholderCard count={3} />
    }

    return ( 
        mini ?
            <PlayerMini wide={props.wide} small={true} player={bestPlayer(speakers, defaultPlayer, userPlayer)} setMini={setMini} />
        :
            <PlayerCard wide={props.wide} player={bestPlayer(speakers, defaultPlayer, userPlayer)} setMini={setMini} />
    );
}

PlayerHero.defaultProps = {
    mini: false,
}

