import { hasCapability, hasDisplayCategory } from 'endpoint-model/discovery'
import { tokenFetch } from 'network/tokenFetch'

export const deleteActivityDefinition = async endpointId => {

    if ( hasDisplayCategory(endpointId, 'ACTIVITY_TRIGGER') ) {
        if ( hasCapability(endpointId, 'Sofa.DefinitionController') ) {
            const response = await tokenFetch("/del/logic/activity/"+endpointId, { "action" : "delete" })
            console.log('response')
            return response
        }
    }
    console.log('!! cannot delete a device which is not an activity with a definition controller', endpointId)
    return {}
}
