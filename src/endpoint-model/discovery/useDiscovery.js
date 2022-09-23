
import { endpointByEndpointId } from 'endpoint-model/discovery'

export const useEndpointDiscovery = endpointId => {

    const device = endpointByEndpointId(endpointId)
    const friendlyName = device.friendlyName
    const displayCategories = device.displayCategories
    
    return { friendlyName, displayCategories }

}