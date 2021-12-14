import React, { useState, useEffect } from 'react';
import { Group } from '@mantine/core'
import PlaceholderCard from 'beta/layout/PlaceholderCard';
import StackCard from 'beta/components/StackCard'

import PlayerHeader from 'beta/devices/Player/PlayerHeader'
import PlayerHeaderSmall from 'beta/devices/Player/PlayerHeaderSmall'
import SpeakerList from 'beta/devices/Speaker/SpeakerList';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'

const JukeboxHero = props => {
    
    const [ showIdle, setShowIdle ]=useState(false)
    const [ filterOff, setFilterOff] = useState(true)
    const jukeboxState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(props.endpointId, 'jukeboxhero')
        return function cleanup() {
            unregister(props.endpointId, 'jukeboxhero')
        };
    // eslint-disable-next-line 
    }, [])

    if (!jukeboxState) {
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
            return ['IDLE','STOPPED'].includes(jukeboxState.MusicController.playbackState.value)
        }
        catch {
            return true
        }
    }

    return (
        <StackCard>
            <Group direction="column" noWrap grow spacing="xl">
            { (isIdle() && !showIdle) ?
                <PlayerHeaderSmall endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers} />
            :
                <PlayerHeader endpointId={props.endpointId} toggleIdle={toggleIdle} toggleSpeakers={toggleSpeakers} />
            }
                <SpeakerList filterOff={filterOff} />
            </Group>
        </StackCard >
    );
}

export default JukeboxHero;

