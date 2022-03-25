import { useRegister } from 'store/useRegister'
import { camelCase } from 'store/deviceHelpers';

const useInput = ( endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const selections = [{ label: "Playing", value: "PLAYING"}, { label: "Idle", value: "IDLE"}, { label: "Paused", value: "PAUSED"}, { label: "Stopped", value: "STOPPED"}]
    const stateValue = deviceState && deviceState.MusicController ? deviceState.MusicController.playbackState.value : undefined
    const playbackState = value !== undefined ? value : stateValue

    const setPlaybackState = newState => {
        //endpointId, controllerName, command, payload={}, cookie={}, instance=""
        directive(endpointId, "MusicController", 'SetPlaybackState', { "playbackState": newState } )
    }

    const playbackStateLabel = (!playbackState) ? "Unknown" : camelCase(playbackState)

    // set default in activity editor
    if (directive && value === undefined) {
        setPlaybackState(stateValue)
    }

    return { playbackState, playbackStateLabel, selections, setPlaybackState }

}

export default useInput;
