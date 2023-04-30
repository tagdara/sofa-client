import { create } from 'zustand'


const hostName = ( process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.hostname )
const serverUrl = "https://" + hostName + "/sofa" // + ":5444"
//const serverUrl = "https://" + window.location.hostname;
const tokenUrl = serverUrl + '/auth'
//const tokenUrl = serverUrl+'/auth/o2/token'
const loginUrl = serverUrl + "/login";

const useLoginStore = create((set,get) => ({
    name: localStorage.getItem('name'),
    refresh_token: localStorage.getItem('refresh_token'),
    access_token: undefined,
    login_message: "",
    logged_in: false,
    checking: false,
    host_name: hostName,
    server_url: serverUrl,
    setUserName: (name) => set( { name: name }),
    setStoreAccessToken: (token) => set( { access_token: token }),
    setLogin: (status) => set( { loggedin: status}),
    setRefreshToken: (newToken) => set( { refresh_token: newToken }),
    setLoginMessage: (message) => set( { login_message: message}),
    logout: () => {
        localStorage.clear();
        //localStorage.setItem('refresh_token', undefined)
        set({ refresh_token: undefined, access_token: undefined, admin: undefined, logged_in: false, login_message : "You are logged out" })
    }, 
    login: async (name, password) => {
        var result = undefined
        set({ login_message : ""})
        const body = { "name": name, "password": password }
        console.log('login attempt', loginUrl, body)
        const response = await fetch(loginUrl, {  method: "post", body: JSON.stringify(body)})
        console.log('login response', response)
        if (response.status === 401) {
            set({ login_message : "Bad name or PIN"})
        } else if (response.status === 403) {
            set({ login_message : "Guest logins are disabled"})
        } else {
            result = await response.json()
            if (result.refresh_token) {
                console.log('Logged in as', name)
                localStorage.setItem('name', name)
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
        set({ checking: true})
        const name = get().name
        const refreshToken = get().refresh_token
        if (name && refreshToken) {
            set({ login_message: 'Checking token '+name})
            const body = { "name": name, "refresh_token": refreshToken }
            var response = undefined
            try {
                response = await fetch(tokenUrl, {  method: "post", body: JSON.stringify(body)})
                if (response.status === 503) {
                    console.log('server is offline', response.status)
                    set({ login_message: 'Server offline'})
                    set({ checking: false})
                    return 
                }
            }
            catch (e) {
                console.log('server not ready', e)
                set({ login_message: ''})
                set({ checking: false})
                return
            }
            try {
                var result = await response.json()
                set(result)
                set({ logged_in: true })
                set({ login_message: ""})
            }
            catch {
                console.log('invalid token')
                set({ login_message: "Invalid token"})
            }
        }
        set({ checking: false})
    },
}))

export default useLoginStore;