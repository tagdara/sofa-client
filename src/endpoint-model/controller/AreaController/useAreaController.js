import { useRegister } from 'endpoint-model/register/useRegister'
import { sortByName, hasCapability, hasDisplayCategory } from 'endpoint-model/discovery'

const useAreaController = ( endpointId, directive) => {

    const controller = "Sofa.AreaController"
    const { device, deviceState } = useRegister(endpointId)

    const name = device.friendlyName

    const children = sortByName(deviceState?.[controller]?.children?.value || [])
    const areas = children.filter(endpointId => hasCapability(endpointId, controller))
    const lights= children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes= children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE"))

    return { name, children, areas, lights, scenes }

}

export default useAreaController
