import { useRegister } from 'endpoint-model/register/useRegister'
import { directive as storeDirective } from 'endpoint-model/directive/directive'
import { sortByName, hasDisplayCategory, hasCapability } from 'endpoint-model/discovery'

const useChildren = (endpointId, value, directive) => {

    // Children property of an AreaController
    const controller = 'Sofa.AreaController'
    const { deviceState } = useRegister(endpointId)
    const activeDirective = directive || storeDirective
    const stateChildren = deviceState?.[controller]?.children?.value || []
    const unsortedChildren = value ? value : stateChildren
    const children = sortByName(unsortedChildren)

    const setChildren = newChildren => {
        activeDirective(endpointId, controller, "SetChildren", {"children": newChildren })
    }

    const addChildren = newChildren => {
        activeDirective(endpointId, controller, "SetChildren", {"children": [...children, ...newChildren] })
    }

    const removeChildren = newChildren => {
        const finalChildren = children.filter( item => !newChildren.includes(item))
        activeDirective(endpointId, controller, "SetChildren", {"children": [ ...finalChildren ] })
    }

    const areas = children.filter(endpointId => hasCapability(endpointId, controller))
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))

    return { children, areas, lights, scenes, setChildren, addChildren, removeChildren }
}

export default useChildren 
