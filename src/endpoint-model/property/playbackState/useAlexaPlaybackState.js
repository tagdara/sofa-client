import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { camelCase } from 'helpers/camelCase'

const usePlaybackState = ( endpointId, value, directive) => {

    const controller = "Alexa.PlaybackStateReporter"
    const { deviceState } = useRegister(endpointId)
    const stateValue = deviceState?.[controller]?.playbackState?.value
    const playbackState = value?.playbackState || stateValue

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setPlaybackState(stateValue)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setPlaybackState = newState => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        directive(endpointId, controller, 'SetPlaybackState', { "playbackState": newState } )
    }

    const playbackStateLabel = playbackState ? camelCase(playbackState) : "Unknown" 
    const selections = [{ label: "Playing", value: "PLAYING"}, { label: "Idle", value: "IDLE"}, { label: "Paused", value: "PAUSED"}, { label: "Stopped", value: "STOPPED"}]

    return { playbackState, playbackStateLabel, selections, setPlaybackState }

}

export default usePlaybackState
