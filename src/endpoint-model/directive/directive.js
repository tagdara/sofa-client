import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'
import { storeUpdater } from "endpoint-model/storeUpdater" 
import { getControllerInterface } from 'endpoint-model/discovery'
import { showNotification } from '@mantine/notifications';
import { getAccessToken, tokenFetch} from 'network/tokenFetch'


function newtoken() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
    )
}

export const directive = async (endpointId, controllerName, command, payload={}, cookie={}, instance="") => {
    console.log('directive', endpointId, controllerName, command, payload, cookie, instance)
    const controller = getControllerInterface(endpointId, controllerName)
    if (!controller) {
        var dev = useDiscoveryStore.getState().devices[endpointId]
        if (!dev) {
            showNotification({
                title: 'Error: Device is not ready',
                message: endpointId+' device has not been discovered by this client',
                color: 'red',
            }) 
            return {}
        }
        console.log('controller not ready for directive', endpointId, controllerName, instance, controller)
        return {}
    }

    var directiveHeader={ "name": command, "namespace": controller.interface, "payloadVersion":"3", "messageId": newtoken(), "correlationToken": newtoken() }
    if (instance) {
        directiveHeader.instance=instance
    } else if (controller.hasOwnProperty('instance')) {
        directiveHeader.instance=controller.instance
    }
    const accessToken = getAccessToken()
    const directiveEndpoint = {"endpointId": endpointId, "cookie": cookie, "scope": { "type":"BearerToken", "token": accessToken }}
    const directiveJson = { "directive": {"header": directiveHeader, "endpoint": directiveEndpoint, "payload": payload }}
    const result = await tokenFetch("/", directiveJson)
    if (result.event?.header?.name === "ErrorResponse") {
        showNotification({
            title: 'Error: '+result.event.payload.type+" ("+endpointId+")",
            message: result.event.payload.message,
            color: 'red',
        })        
    }
    if (result.event?.header?.name === "DeferredResponse") {
        const delay = result.event.payload?.estimatedDeferralInSeconds || "several"
        showNotification({
            title: 'Request Received',
            message: 'Your request was received but may take ' + delay + ' seconds to process',
            color: 'green',
        })        
    }
    storeUpdater(result)
    return result
}

export const directives = useDiscoveryStore.getState().directives

export const refreshDirectives = async () => {
    console.log('.. refresh directives')
    const result = await tokenFetch("/directives")
    useDiscoveryStore.setState({directives: result})
}

export const refreshProperties = async () => {
    console.log('.. refresh properties')
    const result = await tokenFetch("/properties")
    useDiscoveryStore.setState({controllerProperties: result})
}

export const discovery = async () => {
    var discoveryDirective = {
            "directive": {
                "header": {
                    "namespace": "Alexa.Discovery",
                    "name": "Discover",
                    "messageId": newtoken(),
                    "payloadVersion": "3"
                },
                "payload": {
                    "scope": {
                        "type": "BearerToken",
                        "token": "sofa-interchange-token"
                    }
                }
            }
        }
    const result = await tokenFetch("/", discoveryDirective)
    storeUpdater(result)
}

export const propertyFromDirective = (controller, directive) => {
    if (controller===undefined || directive===undefined) {
        return undefined
    }

    if (directives.hasOwnProperty(controller) && directives[controller].hasOwnProperty(directive)) {
        var actionValues = directives[controller][directive]
        if (actionValues) { 
            try {
                return Object.keys(actionValues)[0]
            } 
            catch {}
        }
    }

    return undefined
}    
