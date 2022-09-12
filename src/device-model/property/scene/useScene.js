import { useRegister } from 'store/useRegister'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import useChildren from 'device-model/property/children/useChildren'

const useScene = (endpointId, value, directive) => {

    // Scene property of an AreaController representing the current "best match" scene

    const { deviceState } = useRegister(endpointId)
    const { scenes } = useChildren(endpointId)

    // no real directive yet but could potentially add in the future or
    // scene may become a dynamic modeController instead

    const activeDirective = directive 
    const stateScene = deviceState && deviceState.AreaController && deviceState.AreaController.scene ? deviceState.AreaController.scene.value : []
    const scene = value ? value : stateScene
    const selections = scenes.map( item => ({ label: friendlyNameByEndpointId(item), value: item }))

    const setScene = newScene => {
        activeDirective(endpointId, "AreaController", "SetScene", {"scene": newScene })
    }

    // set default in activity editor
    if (directive && value === undefined) {
        setScene(stateScene)
    }

    const sceneLabel = friendlyNameByEndpointId(scene)

    return { scene, setScene, sceneLabel, selections}
}

export default useScene 
