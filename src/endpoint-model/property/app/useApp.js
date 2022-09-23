import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'

const useApp = (endpointId, value, directive) => {

    const controller = 'Alexa.MediaMetadata'
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateApp = deviceState?.[controller]?.app?.value
    const app = value !== undefined ? value : stateApp

    const setApp = newState => {
        // only for editor
        activeDirective(endpointId, controller, "SetApp", {"app": newState})
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setApp(stateApp)
    }
    
    const appLabel = app

    return { app, appLabel, setApp }

}

export default useApp
