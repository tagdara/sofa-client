import { tokenFetch } from 'network/tokenFetch'

export const deleteCachedEndpoint = async endpointId => {

    const response = await tokenFetch("/del/eventgateway/endpoints", { "endpoints" : [ endpointId ] })
    console.log('response', response)
    return response
}
