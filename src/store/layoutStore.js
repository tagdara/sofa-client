import create from 'zustand'
import useUserStore from "store/userStore"

const serverUrl = "https://"+window.location.hostname;
const layoutUrl = serverUrl+ 'layout/default'

const useLayoutStore = create((set, get) => ({
    currentStack: undefined,
    currentPage: 'Stacks',
    currentProps: undefined,
    breadCrumbs: undefined,
    drawerOpen: false,
    rightDrawerOpen: false,
    modules: {},
    stackModules: {},
    stackLayout: {},
    refreshStackLayout: async () => {
        const accessToken = useUserStore.getState().access_token;
        const headers = { authorization : accessToken }
        const response = await fetch(layoutUrl, { headers: headers })
        const result = await response.json()
        console.log('stack layout',result)
        set({ stackLayout: result})
    },
}))

export default useLayoutStore;