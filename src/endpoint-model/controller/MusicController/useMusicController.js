import { useRegister } from 'endpoint-model/register/useRegister'
import { camelCase } from 'store/deviceHelpers';

const useMusicController = ( endpointId, value, directive) => {

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
