
import { useRegister } from 'store/useRegister'
import useTokenImage from 'helpers/useTokenImage'

const useArt = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const stateArt = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.art ? deviceState.MediaMetadata.art.value : undefined
    const stateTitle = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.title ? deviceState.MediaMetadata.title.value : undefined
    const baseArt = value !== undefined ? value : stateArt
    const art = (stateTitle && !value) ? baseArt + "?" + stateTitle : baseArt
    const { localImageUrl: image, imageLoaded } = useTokenImage(art)

    return { image, art, imageLoaded }

}

export default useArt
