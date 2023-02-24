import { create } from 'zustand'

import { persist, createJSONStorage } from 'zustand/middleware'
import useLoginStore from 'login/loginStore'

const serverUrl = useLoginStore.getState().server_url
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
            return await response.json()         
        },
        refresh: async () => {
            const accessToken = useLoginStore.getState().access_token;
            const headers = { authorization : accessToken }
            const response = await fetch(userUrl, { headers: headers })
            const result = await response.json()
            set({preferences: result.data} )
        },
    }),
    {
        name: "userStore", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used        
    }
))

export default useUserStore;