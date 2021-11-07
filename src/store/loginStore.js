import create from 'zustand'
import useUserStore from 'store/userStore'

const serverUrl = "https://"+window.location.hostname;
const tokenUrl = serverUrl+'/auth/o2/token'
const loginUrl = serverUrl + "/login";

const useLoginStore = create((set,get) => ({
        name: localStorage.getItem('user'),
        refresh_token: localStorage.getItem('refresh_token'),
        access_token: undefined,
        login_message: "welcome",
        logged_in: false,
        setUserName: (name) => set( { name: name }),
        setStoreAccessToken: (token) => set( { access_token: token }),
        setLogin: (status) => set( { loggedin: status}),
        setRefreshToken: (newToken) => set( { refresh_token: newToken }),
        setLoginMessage: (message) => set( { login_message: message}),
        logout: () => {
            localStorage.setItem('refresh_token', undefined)
            set({ refresh_token: undefined, access_token: undefined, admin: undefined, logged_in: false, login_message : "You are logged out" })
        }, 
        login: async (username, password) => {
            var result = undefined
            set({ login_message : ""})
            const body = { "user": username, "password": password }
            const response = await fetch(loginUrl, {  method: "post", body: JSON.stringify(body)})
            if (response.status === 401) {
                set({ login_message : "Bad username or PIN"})
            } else if (response.status === 403) {
                set({ login_message : "Guest logins are disabled"})
            } else {
                result = await response.json()
                if (result.refresh_token) {
                    console.log('Logged in as', username)
                    localStorage.setItem('user', username)
                    localStorage.setItem('refresh_token', result.refresh_token)
                    set({ refresh_token: result.refresh_token})
                } else {
                    console.log('no token', result)
                }
                if (result.access_token) {
                    set({ access_token: result.access_token, logged_in: true})
                }
                set(result)
            }
            return result
        },
        checkToken: async () => {
            const user = useUserStore.getState().name
            const refreshToken = get().refresh_token
            if (user && refreshToken) {
                const body = { "user": user, "refresh_token": refreshToken }
                const response = await fetch(tokenUrl, {  method: "post", body: JSON.stringify(body)})
                try {
                    var result = await response.json()
                    set(result)
                    set({ logged_in: true })
                }
                catch {
                    console.log('invalid token')
                    set({ login_message: "Invalid token"})
                }
            }
            set({ login_message: ""})
        },
    })
)

export default useLoginStore;