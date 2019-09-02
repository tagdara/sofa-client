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
    const [player, setPlayer] = useState(bestPlayer())

    useEffect(() => {
        if (player=='') {
            setSpeakers(props.devicesByCategory('SPEAKER'))
            setPlayer(bestPlayer()) 
        }
    }, [props.devices])

    function bestPlayer() {
        
        var defaultexists=false
        
        if (props.userPlayer) {
            return props.userPlayer
        } else {
            var hotplayer='';
            for (var s = 0; s < speakers.length; s++) {
                if (hotplayer=='') { hotplayer=speakers[s];}
                if (defaultPlayer==speakers[s].endpointId) {
                    defaultexists=true
                }
                if (speakers[s].MusicController.playbackState.value=='PLAYING') {
                    if (speakers[s].InputController.input.value==speakers[s].friendlyName || speakers[s].InputController.input.value=="") {
                        hotplayer=speakers[s]
                    } else {
                        hotplayer=props.deviceByEndpointId(speakers[s].InputController.input.value)
                    }
                    break
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

    function bigCard() {
        
        if (mini || !player) {
            return false
        }
        if (!mini || (player.hasOwnProperty('MusicController') && player.MusicController.playbackState.value && player.MusicController.playbackState.value!='STOPPED')) {
            return true
        }
        return false
    }
    
    return ( 
        <React.Fragment>
            { player ?
            <>
                { bigCard()==false ?
                    <Sonos changePlayer={changePlayer} wide={props.wide} small={true} setLayoutCard={props.setLayoutCard} player={player} />
                :
                    <PlayerCard wide={props.wide} changePlayer={changePlayer} player={player} setMini={setMini} />
                }
            </>
            :
            <NoPlayer wide={true} />
            }
        </React.Fragment>
    );
}


export default withUser(withData(PlayerHero));
