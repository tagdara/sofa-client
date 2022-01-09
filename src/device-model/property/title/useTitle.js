import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useTitle = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateTitle = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.title ? deviceState.MediaMetadata.title.value : undefined
    const title = value !== undefined ? value : stateTitle

    const setTitle= newState => {
        // only for editor
        activeDirective(endpointId, "MediaMetadata", "SetTitle", {"title": newState})
    }

    return { title, setTitle }

}

export default useTitle
