import React, { useState } from 'react';
import { Stack } from '@mantine/core'
import PlaceholderCard from 'layout/PlaceholderCard';
import PlayerHeader from 'devices/Player/PlayerHeader'
import PlayerHeaderSmall from 'devices/Player/PlayerHeaderSmall'
import SpeakerList from 'devices/Speaker/SpeakerList';
import useMultiPower from 'endpoint-model/multidevice/useMultiPower'
import usePlaybackState from 'endpoint-model/property/playbackState/usePlaybackState'
import { endpointIdsByDisplayCategory } from 'store/deviceHelpers'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const { playbackState } = usePlaybackState(props.endpointId)
    const exclude = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]
    const speakers = endpointIdsByDisplayCategory( "SPEAKER").filter(item => !exclude.includes(item))
    const { onCount } =useMultiPower(speakers)

    if (!playbackState) {
        return <PlaceholderCard count={ 3 } />
    }

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

    function isIdle() {
        try {
            return ['IDLE','STOPPED'].includes(playbackState)
        }
        catch {
            return true
        }
    }

    return (
        <Stack spacing="xl">
            { ( isIdle() && !showIdle && !onCount ) ?
                <PlayerHeaderSmall endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers} url={props.url} />
            :
                <PlayerHeader endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers}  url={props.url} />
            }
                <SpeakerList filterOff={filterOff} exclude={exclude} />
        </Stack>
    );
}

export default JukeboxHero;

