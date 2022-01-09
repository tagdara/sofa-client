import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useApp = (endpointId, value, directive) => {

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateApp = deviceState && deviceState.MediaMetadata && deviceState.MediaMetadata.app ? deviceState.MediaMetadata.app.value : undefined
    const app = value !== undefined ? value : stateApp

    const setApp = newState => {
        // only for editor
        activeDirective(endpointId, "MediaMetadata", "SetApp", {"app": newState})
    }

    const appLabel = app

    return { app, appLabel, setApp }

}

export default useApp
