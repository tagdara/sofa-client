
import { useRegister } from 'endpoint-model/register/useRegister'
import useTokenImage from 'helpers/useTokenImage'

const useArt = (endpointId, value, directive) => {

    const controller = 'Alexa.MediaMetadata'
    const { deviceState } = useRegister(endpointId)
    const stateArt = deviceState?.[controller]?.art?.value 
    const stateTitle = deviceState?.[controller]?.title?.value
    
    const baseArt = value !== undefined ? value : stateArt
    const art = (stateTitle && !value) ? baseArt + "?" + stateTitle : baseArt
    const { localImageUrl: image, imageLoaded } = useTokenImage(art)

    return { image, art, imageLoaded }

}

export default useArt
