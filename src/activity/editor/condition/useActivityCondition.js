import useActivityEditorStore from 'activity/editor/activityEditorStore'
import { mapDeviceProperties, endpointByEndpointId }  from 'endpoint-model/discovery'

export const useActivityCondition = (category, index) => {

    // Setting up variables so that failure to retrieve items does not cause other errors
    // consts cannot be defined inside of a try/catch

    const { item, endpointId, device } = useActivityItem(category, index)

    var item = undefined
    var endpointId = undefined
    var device = undefined

    try {
        item = useActivityEditorStore(state => state.activity[props.category][props.index] )
        endpointId = item.endpointId
        device = endpointByEndpointId(endpointId)
    } 
    catch (error) {
        console.log('Error getting activity item', category, index)
        item = undefined
        endpointId = undefined
    }

    return { item, endpointId, device }
}

export default useActivityItem