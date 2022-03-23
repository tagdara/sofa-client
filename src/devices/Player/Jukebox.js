import React, { useState } from 'react';
import { Group } from '@mantine/core'
import PlaceholderCard from 'layout/PlaceholderCard';
import PlayerHeader from 'devices/Player/PlayerHeader'
import PlayerHeaderSmall from 'devices/Player/PlayerHeaderSmall'
import SpeakerList from 'devices/Speaker/SpeakerList';
import { useRegister } from 'store/useRegister'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const { deviceState } = useRegister(props.endpointId)
    const exclude = ['jukebox', 'sonos:player:RINCON_B8E9378E1E8001400' ]

    if (!deviceState) {
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
            return ['IDLE','STOPPED'].includes(deviceState.MusicController.playbackState.value)
        }
        catch {
            return true
        }
    }

    return (
        <Group direction="column" noWrap grow spacing="xl">
            { (isIdle() && !showIdle) ?
                <PlayerHeaderSmall endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers} url={props.url} />
            :
                <PlayerHeader endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers}  url={props.url} />
            }
                <SpeakerList filterOff={filterOff} exclude={exclude} />
        </Group>
    );
}

export default JukeboxHero;

