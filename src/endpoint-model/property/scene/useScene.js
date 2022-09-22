import { useEffect } from 'react';
import { useRegister } from 'endpoint-model/register/useRegister'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import useChildren from 'endpoint-model/property/children/useChildren'

const useScene = (endpointId, value, directive) => {

    // Scene property of an AreaController representing the current "best match" scene

    const controller = "Sofa.AreaController"
    const { deviceState } = useRegister(endpointId)
    const { scenes } = useChildren(endpointId)

    // no real directive yet but could potentially add in the future or
    // scene may become a dynamic modeController instead

    const activeDirective = directive 
    const stateScene = deviceState?.[controller]?.scene?.value || []
    const scene = value ? value : stateScene
    const selections = scenes.map( item => ({ label: friendlyNameByEndpointId(item), value: item }))
    const sceneLabel = friendlyNameByEndpointId(scene)

    useEffect(() => {
        // set default in activity editor
        if (directive && value === undefined) {
            setScene(stateScene)
        }
    // eslint-disable-next-line 
    }, [  ]);

    const setScene = newScene => {
        activeDirective(endpointId, controller, "SetScene", {"scene": newScene })
    }

    return { scene, setScene, sceneLabel, selections}
}

export default useScene 
