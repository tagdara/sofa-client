import create from 'zustand'
import useUserStore from "store/userStore"

const serverUrl = "https://"+window.location.hostname;
const layoutUrl = serverUrl+ 'layout/default'

const useLayoutStore = create((set, get) => ({
    currentStack: undefined,
    currentPage: 'Stacks',
    currentProps: undefined,
    breadCrumbs: [],
    drawerOpen: false,
    rightDrawerOpen: false,
    modules: {},
    stackModules: {},
    stackLayout: {},
    maxScreenWidth: Math.min(1800, window.innerWidth),
    isMobile: window.innerWidth <= 800,
    minStackWidth: 320,

    refreshStackLayout: async () => {
        const accessToken = useUserStore.getState().access_token;
        const headers = { authorization : accessToken }
        const response = await fetch(layoutUrl, { headers: headers })
        const result = await response.json()
        console.log('stack layout',result)
        set({ stackLayout: result})
    },
    selectPage: (pagename, pageprops) => {
        const currentPage = get().currentPage
        const currentProps = get().currentProps
        if (currentPage!=="Stacks") {
            const breadCrumbs = get().breadCrumbs
            if (!breadCrumbs.includes(currentPage) )  {
                set({ breadCrumbs: [...breadCrumbs, { "page":currentPage, "props":currentProps }] })
            }
        }
        set({ drawerOpen: false, rightDrawerOpen: false, currentStack: undefined, currentPage: pagename, currentProps: pageprops})
    }
}))

export default useLayoutStore;