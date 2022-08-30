import useLoginStore from 'store/loginStore'
import useDeviceStore from 'store/deviceStore'
import { storeUpdater } from "store/storeUpdater" 
import { getController } from 'store/deviceHelpers'

const serverUrl = useLoginStore.getState().server_url
const directivesUrl = serverUrl + "/directives"
const propertiesUrl = serverUrl + "/properties"

function newtoken() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
    )
}

export const directive = async (endpointId, controllerName, command, payload={}, cookie={}, instance="") => {
    const accessToken = useLoginStore.getState().access_token;  
    const controller = getController(endpointId, controllerName)
    if (!controller) {
        var dev = useDeviceStore.getState().devices[endpointId]
        if (!dev) {
            console.log('device not ready', endpointId)
            return {}
        }
        console.log('controller not ready for directive', endpointId, controllerName, controller)
        console.log('device', dev)
        return {}
    }
    const headers = { authorization : accessToken }
    var directiveHeader={ "name": command, "namespace": controller.interface, "payloadVersion":"3", "messageId": newtoken(), "correlationToken": newtoken() }
    if (instance) {
        directiveHeader.instance=instance
    } else if (controller.hasOwnProperty('instance')) {
        directiveHeader.instance=controller.instance
    }
    const directiveEndpoint = {"endpointId": endpointId, "cookie": cookie, "scope": { "type":"BearerToken", "token":accessToken }}
    const body = { "directive": {"header": directiveHeader, "endpoint": directiveEndpoint, "payload": payload }}
    const response = await fetch(serverUrl, {  headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    storeUpdater(result)
    return result
}

export const directives = useDeviceStore.getState().directives

export const refreshDirectives = async () => {
    console.log('refresh directives')
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(directivesUrl, { headers: headers })
    if (response.status === 401) { 
        useLoginStore.setState({ access_token: undefined, logged_in: false })
        return
    } 

    const result = await response.json()
    console.log('result', directivesUrl, result)
    useDeviceStore.setState({directives: result})
}

export const refreshProperties = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(propertiesUrl, { headers: headers })
    const result = await response.json()
    useDeviceStore.setState({controllerProperties: result})
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
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const body = discoveryDirective
    const response = await fetch(serverUrl, { headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    storeUpdater(result)
}

export const propertyFromDirective = (controller, directive) => {
    if (controller===undefined || directive===undefined) {
        return undefined
    }

    if (controller.includes('.')) {
        controller = controller.split('.')[1]
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
