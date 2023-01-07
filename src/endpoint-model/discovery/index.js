import { deviceDirectives } from "endpoint-model/discovery/deviceDirectives"
import { friendlyNameByEndpointId, endpointIdByFriendlyName, sortByName } from "endpoint-model/discovery/friendlyName"
import { categoryLabelByEndpointId, endpointIdsByDisplayCategory,hasDisplayCategory } from 'endpoint-model/discovery/displayCategories'
import { hasCapability } from "endpoint-model/discovery/capability"
import { devicesByEndpointIds, endpointByEndpointId } from "endpoint-model/discovery/endpointId"
import { mapDeviceProperties } from "endpoint-model/discovery/properties"
import { capabilityFriendlyName, getControllerInterface, hasInstance } from "endpoint-model/discovery/interfaces"
import { descriptionIncludes } from "endpoint-model/discovery/description"

export {    
    capabilityFriendlyName, categoryLabelByEndpointId,
    descriptionIncludes, deviceDirectives, devicesByEndpointIds,
    endpointByEndpointId, endpointIdsByDisplayCategory, endpointIdByFriendlyName, 
    getControllerInterface,
    friendlyNameByEndpointId, 
    hasCapability, hasDisplayCategory, hasInstance,
    mapDeviceProperties,
    sortByName
}