
import { useRegister } from 'store/useRegister'
import useTokenImage from 'helpers/useTokenImage'

const useArt = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const stateArt = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.art ? deviceState.MediaMetadata.art.value : undefined
    const art = value !== undefined ? value : stateArt
    const { localImageUrl: image, imageLoaded } = useTokenImage(art)

    return { image, art, imageLoaded }

}

export default useArt
