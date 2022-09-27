import React, { useState } from 'react';
import PlayerHeader from 'devices/Player/PlayerHeader'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import JukeboxOff from 'devices/Jukebox/JukeboxOff'
import usePullUp from 'layout/pullup/usePullUp'
import JukeboxPullUp from 'devices/Jukebox/JukeboxPullUp'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const { playbackState } = usePlaybackState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 
    const { pullUpActive, showPullUp } = usePullUp('JukeboxHero', name)

    const excludeSpeakers = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const speakers = endpointIdsByDisplayCategory( "SPEAKER").filter(item => !excludeSpeakers.includes(item))
    const { onCount } = useMultiPower(speakers)

    function toggleSpeakers() {
        console.log('toggling speaker filter to ', !filterOff, 'showidle is', showIdle)
        if (filterOff) {
            setShowIdle(true)
        }
        setFilterOff(!filterOff)
    }

    function toggleIdle() {
        setShowIdle(!showIdle)
    }

    const isIdle = ['IDLE','STOPPED'].includes(playbackState) 

    return (
        <>
            { ( isIdle && !onCount ) ?
                <JukeboxOff onClick={showPullUp} name={"Jukebox"} endpointId={props.endpointId} />           
            :
                <PlayerHeader 
                    showOverlay={showPullUp} 
                    endpointId={props.endpointId} 
                    toggleIdle={toggleIdle} 
                    toggleSpeakers={toggleSpeakers}  
                    url={props.url} 
                />
            }
            { pullUpActive && <JukeboxPullUp endpointId={props.endpointId} /> }
        </>
    );
}

export default JukeboxHero;

