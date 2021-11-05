import useUserStore from 'store/userStore'
import useDeviceStore from 'store/deviceStore'
import { storeUpdater } from "store/storeUpdater" 
import { getController } from 'store/deviceHelpers'
const serverUrl = "https://"+window.location.hostname;
const directivesUrl = serverUrl + "/directives"
const propertiesUrl = serverUrl + "/properties"

function newtoken() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
    )
}

export const directive = async (endpointId, controllerName, command, payload={}, cookie={}, instance="") => {
    const accessToken = useUserStore.getState().access_token;  
    const controller = getController(endpointId, controllerName)
    const headers = { authorization : accessToken }
    const directiveHeader={ "name": command, "namespace": controller.interface, "payloadVersion":"3", "messageId": newtoken(), "correlationToken": newtoken() }
    const directiveEndpoint = {"endpointId": endpointId, "cookie": cookie, "scope": { "type":"BearerToken", "token":accessToken }}
    const body = { "directive": {"header": directiveHeader, "endpoint": directiveEndpoint, "payload": payload }}
    const response = await fetch(serverUrl, {  headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    console.log('result',result)
    storeUpdater(result)
}

export const directives = useDeviceStore.getState().directives

export const refreshDirectives = async () => {
    const accessToken = useUserStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(directivesUrl, { headers: headers })
    const result = await response.json()
    console.log('directives', result)
    useDeviceStore.setState({directives: result})
}

export const refreshProperties = async () => {
    const accessToken = useUserStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(propertiesUrl, { headers: headers })
    const result = await response.json()
    console.log('properties', result)
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
    const accessToken = useUserStore.getState().access_token;
    const headers = { authorization : accessToken }
    const body = discoveryDirective
    const response = await fetch(serverUrl, { headers: headers, method: "post", body: JSON.stringify(body)})
    const result = await response.json()
    storeUpdater(result)
}

