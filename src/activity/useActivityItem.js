import useActivityEditorStore from 'store/activityEditorStore'
import { deviceByEndpointId }  from 'store/deviceHelpers'

export const useActivityItem = (category, index) => {

    const item = useActivityEditorStore(state => state.activity[category][index] )
    const endpointId = item.endpointId
    const device = deviceByEndpointId(endpointId)
    const itemTypes = {
        "conditions": "property",
        "triggers": "property",
        "actions": "command"
    }

    const itemType = itemTypes[category]

    return { item, itemType, endpointId, device }
}

export default useActivityItem