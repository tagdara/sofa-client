import useLoginStore from "store/loginStore"
const serverUrl = "https://"+window.location.hostname;

export const tokenFetch = async (url, data, retry) => {
    try {
        const accessToken = useLoginStore.getState().access_token;
        const headers = { authorization : accessToken }
        let response

        if (data) {
            response = await fetch(serverUrl+url, { headers: headers, method: "post", body: JSON.stringify(data) })
        } else {
            response = await fetch(serverUrl+url, { headers: headers })
        }

        if (response.status === 401) {
            if (!retry) {
                const name = useLoginStore.getState().name
                const refreshToken = useLoginStore.getState().refresh_token
                await useLoginStore.getState().checkToken(name, refreshToken)
                return await tokenFetch(url, data, true)
            } else {
                console.log('repeated 401 after token refresh attempt')
                const logout = useLoginStore.getState().logout
                return logout()
            }
        } else if (response.status !== 200) {
            console.log(response.status,' response code received for',url, data)
            return undefined
        } 
        const result = await response.json()
        return result
    }
    catch {
        console.log('An error occured while attempting to fetch data', url, data, retry)
    }
}