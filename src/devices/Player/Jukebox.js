import React, { useState } from 'react';
import { Stack } from '@mantine/core'
// import PlaceholderCard from 'layout/PlaceholderCard';
import PlayerHeader from 'devices/Player/PlayerHeader'
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { endpointIdsByDisplayCategory } from 'endpoint-model/discovery'
import JukeboxOff from 'devices/Player/JukeboxOff'
import JukeboxPullUp from 'devices/Player/JukeboxPullUp'
import useLayoutStore from 'layout/layoutStore'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const { playbackState } = usePlaybackState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === name

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

    const showOverlay = () => {
        setStackCardHighlight(pullUpActive ? null : 'JukeboxHero')
        setStackPullUp(pullUpActive ? null : name, {})
    }

    return (
        <>
            <Stack spacing="xl">
                { ( isIdle && !onCount ) ?
                    <JukeboxOff onClick={showOverlay} name={"Jukebox"} endpointId={props.endpointId} />           
                :
                    <PlayerHeader 
                        showOverlay={showOverlay} 
                        endpointId={props.endpointId} 
                        toggleIdle={toggleIdle} 
                        toggleSpeakers={toggleSpeakers}  
                        url={props.url} 
                    />
                }
            </Stack>
            { pullUpActive && <JukeboxPullUp endpointId={props.endpointId} /> }
        </>
    );
}

export default JukeboxHero;

