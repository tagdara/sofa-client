import { useRegister } from 'endpoint-model/register/useRegister'
import { camelCase } from 'helpers/camelCase'

const usePlaybackStateReporter = ( endpointId, value, directive) => {

    // This is deprecated in favor of the Sofa.MediaReporter, Alexa.PlaybackStateReporter, and Alexa.PlaybackController

    const controller = "Alexa.PlaybackStateReporter"
    const { deviceState } = useRegister(endpointId)
    const playbackState = deviceState?.[controller]?.playbackState?.value 
    const playbackStateLabel = (!playbackState) ? "Unknown" : camelCase(playbackState)

    const isPlaying = playbackState === 'PLAYING'
    const isStopped = playbackState === 'STOPPED' 

    return { playbackState, playbackStateLabel, isPlaying, isStopped }

}

export default usePlaybackStateReporter
