import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { endpointByEndpointId }  from 'endpoint-model/discovery'

export const useActivityItem = (category, index) => {

    const item = useActivityEditorStore(state => state.activity[category][index] )
    const endpointId = item.endpointId
    const device = endpointByEndpointId(endpointId)
    const itemTypes = {
        "conditions": "property",
        "triggers": "property",
        "actions": "command"
    }

    const itemType = itemTypes[category]

    return { item, itemType, endpointId, device }
}

export default useActivityItem