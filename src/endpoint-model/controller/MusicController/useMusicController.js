import { useRegister } from 'endpoint-model/register/useRegister'
import { camelCase } from 'helpers/camelCase'

const useMusicController = ( endpointId, value, directive) => {

    // This is deprecated in favor of the Sofa.MediaReporter, Alexa.PlaybackStateReporter, and Alexa.PlaybackController

    const controller = "Sofa.MusicController"
    const { deviceState } = useRegister(endpointId)
    const playbackState = deviceState?.[controller]?.playbackState?.value 
    const playbackStateLabel = (!playbackState) ? "Unknown" : camelCase(playbackState)
    const art = deviceState?.[controller]?.art?.value 
    const artist = deviceState?.[controller]?.artist?.value 
    const title = deviceState?.[controller]?.title?.value 
    const url = deviceState?.[controller]?.url?.value 

    return { art, artist, title, url, playbackState, playbackStateLabel }

}

export default useMusicController
