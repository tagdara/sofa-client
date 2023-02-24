import { create } from 'zustand'

import useLoginStore from "login/loginStore"

const serverUrl = useLoginStore.getState().server_url
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
    maxScreenWidth: 1800,
    isMobile: window.innerWidth <= 800,
    minStackWidth: 310,
    previousStack: undefined,
    stackPad: 16, // This should be computed from mantine pad
    hideHome: false,
    stackPullUp: undefined,
    setStackPullUp: name => {
        set({ stackPullUp: name})
    },

    transitionDirection: "fade",
    setTransitionDirection: direction => {
        set({ transitionDirection: direction })
    },
    setDrawerOpen: open => {
        const isOpen = get().drawerOpen
        set( { drawerOpen: open === undefined ? open : !isOpen })
    },
    refreshStackLayout: async () => {
        const accessToken = useLoginStore.getState().access_token;
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
        set({ drawerOpen: false, rightDrawerOpen: false, currentPage: pagename, currentProps: pageprops})
    }
}))

export default useLayoutStore;