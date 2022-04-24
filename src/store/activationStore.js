import create from 'zustand'
import useLoginStore from "store/loginStore"

const serverUrl = useLoginStore.getState().server_url
const activationsUrl = serverUrl+ '/activations'
const removeUrl = activationsUrl + "/remove"
const approveUrl = activationsUrl + "/approve"

const useActivationStore = create((set, get) => ({
    activations: {},
    currentPage: 'Stacks',
    currentProps: undefined,
    breadCrumbs: undefined,
    drawerOpen: false,
    rightDrawerOpen: false,
    modules: {},
    stackModules: {},
    stackLayout: {},
    removeActivations: async (name, short_key) => {
        const accessToken = useLoginStore.getState().access_token;
        const headers = { authorization : accessToken }
        const body = {"name":name, "api_key":short_key}
        const response = await fetch(removeUrl, { headers: headers, method: "post", body: JSON.stringify(body)})
        const result = await response.json()
        console.log('remove act',result)
        set({ activations: result})
    },
    approveActivations: async (name, short_key) => {
        const accessToken = useLoginStore.getState().access_token;
        const headers = { authorization : accessToken }
        const body = {"name":name, "api_key":short_key}
        const response = await fetch(approveUrl, { headers: headers, method: "post", body: JSON.stringify(body)})
        const result = await response.json()
        console.log('approve act',result)
        set({ activations: result})
    },
    refreshActivations: async () => {
        const accessToken = useLoginStore.getState().access_token;
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl, { headers: headers })
        const result = await response.json()
        console.log('refresh act',result)
        set({ activations: result})
    },
}))

export default useActivationStore;