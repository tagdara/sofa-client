import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'

const useScene = (endpointId, value, directive) => {

    // Scene property of an AreaController representing the current "best match" scene

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateScene = deviceState && deviceState.AreaController ? deviceState.AreaController.scene.value : []
    const scene = value ? value : stateScene

    const setScene = newScene => {
        activeDirective(endpointId, "AreaController", "SetScene", {"scene": newScene })
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setScene(stateScene)
    }

    return { scene, setScene }
}

export default useScene 
