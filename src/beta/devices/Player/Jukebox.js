import React, { useState } from 'react';
import { Group } from '@mantine/core'
import PlaceholderCard from 'beta/layout/PlaceholderCard';
import PlayerHeader from 'beta/devices/Player/PlayerHeader'
import PlayerHeaderSmall from 'beta/devices/Player/PlayerHeaderSmall'
import SpeakerList from 'beta/devices/Speaker/SpeakerList';
import { useRegister } from 'store/useRegister'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const { deviceState } = useRegister(props.endpointId)

    if (!deviceState) {
        return <PlaceholderCard count={ 3 } />
    }

    function toggleSpeakers() {
        setFilterOff(!filterOff)
        setShowIdle(!showIdle)
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
                <SpeakerList filterOff={filterOff} />
        </Group>
    );
}

export default JukeboxHero;

