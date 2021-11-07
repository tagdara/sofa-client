import create from 'zustand'
import { persist } from "zustand/middleware"
import useLoginStore from 'store/loginStore'

const serverUrl = "https://"+window.location.hostname;
const userUrl = serverUrl + '/user'
const userSaveUrl = userUrl + "/save"

const useUserStore = create(persist(
    (set,get) => ({
        preferences: {
            name: undefined,
            refresh_token: undefined,
            camera: undefined,
            favorites: [],
            area: undefined,
        },
        set_camera: endpointId => set ({camera: endpointId}),
        update: async (setting, value) => {
            var prefs = { ...get().preferences, [setting]: value }
            set({ preferences: prefs })
            const accessToken = useLoginStore.getState().access_token;
            const headers = { authorization : accessToken }
            const body = prefs
            const response = await fetch(userSaveUrl, {  headers: headers, method: "post", body: JSON.stringify(body)})
            const result = await response.json()
            console.log('user info', result)          
        },
        refresh: async () => {
            const accessToken = useLoginStore.getState().access_token;
            const headers = { authorization : accessToken }
            const response = await fetch(userUrl, { headers: headers })
            const result = await response.json()
            console.log('user info', result)
            set({preferences: result} )
        },
    }),
    {
        name: "userStore", // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used        
    }
))

export default useUserStore;