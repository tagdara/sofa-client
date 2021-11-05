import create from 'zustand'
import { storeUpdater } from 'store/storeUpdater'
import useUserStore from 'store/userStore'

const serverUrl = "https://"+window.location.hostname;
const registerUrl = serverUrl + "/register_devices";

const removeKey = (key, {[key]: _, ...rest}) => rest;

const useRegisterStore = create((set, get) => ({
    registered: {},
    adds: [],
    removes: [],
    add: async (endpointIds, source) => {
        if (!Array.isArray(endpointIds)) {
            endpointIds=[endpointIds]
        }
        var adds = []
        var result = endpointIds.reduce(function (data, endpointId) {
            if (!data[endpointId]) {
                data[endpointId] = []
            }
            if (!data[endpointId].includes(source)) {
                data[endpointId] = [ ...data[endpointId], source ]
                if (!adds.includes(endpointId)) {
                    adds = [...adds, endpointId ]
                }
            }
            return data
        }, get().registered)
        if (adds) {
            // we may use a pending flag to aggregate changes later but for now we will
            // just not write the adds to the final set
            const accessToken = useUserStore.getState().access_token;
            const headers = { authorization : accessToken }
            const body = { add: adds }
            const response = await fetch(registerUrl, {  headers: headers, method: "post", body: JSON.stringify(body)})
            const addResult = await response.json()
            //console.log('addresult', body, addResult)
            storeUpdater({ "event": {"header": {"name": "multiple StateReports"}}, "data": addResult })
        }
        set({ registered: result })
    },
    remove: async (endpointIds, source) => {
        if (!Array.isArray(endpointIds)) {
            endpointIds=[endpointIds]
        }
        var removes = []
        var result = endpointIds.reduce(function (data, endpointId) {
            if (data[endpointId] && data[endpointId].includes(source)) {
                data[endpointId] = data[endpointId].filter( src => src !== source )
                if (data[endpointId].length<1) {
                    data = removeKey(endpointId, data)
                    if (!removes.includes(endpointId)) {
                        removes = [...removes, endpointId ]
                    }
                }
            }
            return data
        }, get().registered)
        if (result.removes) {
            // we may use a pending flag to aggregate changes later but for now we will
            // just not write the adds to the final set
            const accessToken = useUserStore.getState().access_token;
            const headers = { authorization : accessToken }
            const body = { removes: result.removes }
            const response = await fetch(registerUrl, {  headers: headers, method: "post", body: JSON.stringify(body)})
            const removeResult = await response.json()
            console.log('removeresult', result.removes, removeResult)
            result.removes=[]
        }
        //console.log('removeresult', result)
        set({ registered: result })
    }
}))

export default useRegisterStore;