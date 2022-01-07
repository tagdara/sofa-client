import { useRegister } from 'store/useRegister'
import { directive as storeDirective } from 'store/directive'
import { sortByName, hasDisplayCategory, hasCapability } from 'store/deviceHelpers'

const useChildren = (endpointId, value, directive) => {

    // Children property of an AreaController

    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive ? directive : storeDirective
    const stateChildren = deviceState && deviceState.AreaController ? deviceState.AreaController.children.value : []
    const unsortedChildren = value ? value : stateChildren
    const children = sortByName(unsortedChildren)

    const setChildren = newChildren => {
        activeDirective(endpointId, "AreaController", "SetChildren", {"children": newChildren })
    }

    const addChildren = newChildren => {
        activeDirective(endpointId, "AreaController", "SetChildren", {"children": [...children, ...newChildren] })
    }

    const removeChildren = newChildren => {
        const finalChildren = children.filter( item => !newChildren.includes(item))
        activeDirective(endpointId, "AreaController", "SetChildren", {"children": [ ...finalChildren ] })
    }

    const areas = children.filter(endpointId => hasCapability(endpointId, "AreaController"))
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))

    return { children, areas, lights, scenes, setChildren, addChildren, removeChildren }
}

export default useChildren 
