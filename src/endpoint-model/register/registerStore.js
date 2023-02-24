import { create } from 'zustand'

import { storeUpdater } from 'endpoint-model/storeUpdater'
import { tokenFetch } from 'network/tokenFetch'
import useLoginStore from "login/loginStore"
import produce from "immer"

const registerUrl = "/register_devices";

//const removeKey = (key, {[key]: _, ...rest}) => rest;

// TODO - This works for now, but many small controls can trigger a ton of registrations.  Should find a way to debounce these changes with a short delay in updating

const useRegisterStore = create((set, get) => ({
    ready: false,
    registered: {},
    adds: [],
    removes: [],
    setReady: newReady => {
        set ({ready: newReady})
    },
    refresh: async () => {
        const loggedIn = useLoginStore.getState().logged_in;
        if (!loggedIn) { return }
        const endpointIds = Object.keys(get().registered)
        const data = { add : endpointIds }
        const result = await tokenFetch(registerUrl, data)
        storeUpdater({ "event": {"header": {"name": "multiple StateReports"}}, "data": result })
    },
    add: async (endpointIds, source) => {
        const loggedIn = useLoginStore.getState().logged_in;
        if (!loggedIn) { return }
        if (!Array.isArray(endpointIds)) {
            endpointIds=[endpointIds]
        }
        var adds = []
        var current = get().registered
        var updatedRegistered = endpointIds.reduce(function (data, endpointId) {
            if (!current.hasOwnProperty(endpointId)) {
                set(produce(state => { state.registered[endpointId] = [ source ] }))
                //data[endpointId] = [ source ]
                adds = [...adds, endpointId ]
            } else if (!current[endpointId].includes(source)) {
                set(produce(state => { state.registered[endpointId] = [ ...current[endpointId], source ] }))
                //data[endpointId] = [ ...data[endpointId], source ]
            }
            return data
        }, current)

        if (get().ready && adds && adds.length > 0 ) {
            // we may use a pending flag to aggregate changes later but for now we will
            // just not write the adds to the final set
            const data = { add: adds }
            const result = await tokenFetch(registerUrl, data)
            storeUpdater({ "event": {"header": {"name": "multiple StateReports"}}, "data": result })
        }
        set({ registered: updatedRegistered })
    },
    remove: async (endpointIds, source) => {
        if (!Array.isArray(endpointIds)) {
            endpointIds = [ endpointIds ]
        }
        var removes = []
        var current = get().registered
        endpointIds.reduce(function (data, endpointId) {
            if (data[endpointId] && data[endpointId].includes(source)) {
                var currentEndpoint = current[endpointId].filter( src => src !== source )
                set(produce(state => { state.registered[endpointId] = currentEndpoint }))
                if ( currentEndpoint.length < 1 ) {
                    //data = removeKey(endpointId, data)
                    //set(produce(state => { delete state.registered[endpointId] }))
                    if (!removes.includes(endpointId)) {
                        removes = [...removes, endpointId ]
                    }
                }
            }
            return data
        }, current )
        removes.map( endpointId => (
            set(produce(state => { delete state.registered[endpointId] }))
        ))

        const loggedIn = useLoginStore.getState().logged_in;
        if (!loggedIn) { return }

        if ( removes && removes.length > 0 ) {
            // we may use a pending flag to aggregate changes later but for now we will
            // just not write the adds to the final set
            const data = { remove: removes }
            await tokenFetch(registerUrl, data)
        }
        //console.log('removeresult', updatedRegistered)
        //set({ registered: updatedRegistered })
    }
}))

export default useRegisterStore;