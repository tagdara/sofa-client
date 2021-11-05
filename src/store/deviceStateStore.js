import create from 'zustand'
import { persist } from "zustand/middleware"
import useUserStore from 'store/userStore'
import useDeviceStore from 'store/deviceStore'
import { storeUpdater } from "store/storeUpdater" 
const serverUrl = "https://"+window.location.hostname;

function newtoken() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (((c ^ crypto.getRandomValues(new Uint8Array(1))[0] ) & 15) >> c / 4).toString(16)
    )
}

const useDeviceStateStore = create(persist(
    set => ({
        deviceStates: {},
        registeredDevices: [],
        directive: async (endpointId, controllerName, command, payload={}, cookie={}, instance="") => {
            const accessToken = useUserStore.getState().access_token;
            const getController = useDeviceStore.getState().getController    
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
    }),
    {
        name: "deviceStateStore", // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used        
    }
))

export default useDeviceStateStore;

