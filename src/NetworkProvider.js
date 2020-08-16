import React, {useState, useEffect, createContext, useRef, useCallback} from 'react';

const serverurl="https://"+window.location.hostname;

function writeCookie(key, value, days) {
    var date = new Date();
    // Default at 365 days.
    days = days || 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    return value;
};

export const useStream = (accessToken) => {

    const [subscribers, setSubscribers] = useState([])
    const [isConnecting, setIsConnecting] = useState(false)
    const [streamToken, setStreamToken] = useState(accessToken)
    const [streamStatus, setStreamStatus] = useState(10)
    
    const addSubscriber = (subscriber) => {
        // to see why this is needed for the closure issue
        // https://stackoverflow.com/questions/58193166/usestate-hook-setter-incorrectly-overwrites-state
        setSubscribers((subscribers) => ([...subscribers, subscriber] ));
    };

    const eventSource = useRef(null)
    const listenEvent = useCallback(() => { 
        if (streamToken) {
            // EventSource does not support passing headers so we must use a cookie to send the token
            writeCookie("access_token", streamToken, 1)
            console.log('connecting SSE')
            eventSource.current = new EventSource(serverurl+"/sse", { withCredentials: true })
        }
    }, [streamToken] )
    
    function getConnected() {
        if (eventSource && eventSource.current!==undefined && eventSource.current!==null) {
            if (eventSource.current.readyState===1) {
                return true
            }
        }
        return false
    }
    
    const streamConnected = getConnected()
    
    useEffect(() => {
        
        listenEvent() 
        return () => {
            if (eventSource.current) { eventSource.current.close() }
        }
    // eslint-disable-next-line 
    }, [streamToken])
    
    
    useEffect(() => {
        let unmounted = false;

        const connectStream = () => {
            if (streamToken && subscribers.length>0 && !isConnecting && eventSource.current) {
                setIsConnecting(true)
                console.log('.. Adding event source listeners', subscribers)
                //var esource=new EventSource(serverurl+"/sse", { headers: { 'authorization': streamToken }, withCredentials: true })
                eventSource.current.addEventListener('message', dataHandler);
                eventSource.current.addEventListener('error', errorHandler);
                eventSource.current.addEventListener('open', openHandler);
                //setEventSource(esource)
                setStreamStatus(getStreamStatus())
            }
        }
        
        const openHandler = () => {
            console.log('SSE Opened')
            //setConnected(true)
            setStreamStatus(getStreamStatus())
            setIsConnecting(false)
        }


        const errorHandler = (e,f) => {
            console.log('ERROR with EventSource', e,f)
            console.log('streamStatus',streamStatus)
            setStreamStatus(getStreamStatus())
        }


        const dataHandler = event => {
            var data=JSON.parse(event.data)
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i](data)
            }
        };


        if (streamToken && !unmounted && !isConnecting && streamStatus!==1) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line     
    }, [ streamToken, subscribers, isConnecting, streamConnected, streamStatus]);

    
    function getStreamStatus() {
        
        if (eventSource.current) {
            return eventSource.current.readyState
        } else {
            return 10
        }
    }

    
    const closeStream = () => {
        eventSource.current.close()
    }

    return { streamConnected, streamStatus, closeStream, addSubscriber, setStreamToken };
};


export const NetworkContext = createContext();

export default function NetworkProvider(props) {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [refreshToken, setRefreshToken]= useState(null);
    const [accessToken, setAccessToken]= useState(null);
    const [connectError, setConnectError] = useState(false);
    const { streamConnected, streamStatus, closeStream, addSubscriber, setStreamToken } = useStream(accessToken, [])
    
    
    useEffect(() => {
        if (streamStatus===0 ) {
            console.log('eventsource data stream connecting')
        }
        if (streamStatus===1 ) {
            console.log('eventsource data stream connected')
        }
        if (streamStatus===2 ) {
            console.log('eventsource data stream closed')
        }

        getJSON('user')
    // eslint-disable-next-line 
    },  [streamStatus] )  
    
    
    useEffect(() => {
        
        function getTokenStorage(name) {
            return localStorage.getItem(name)
        }
        
        var newAccessToken=getTokenStorage("access_token")
        setAccessToken(newAccessToken)
        setStreamToken(newAccessToken)
        var newRefreshToken=getTokenStorage("refresh_token")
        setRefreshToken(newRefreshToken)
        var newUser=getTokenStorage("user")
        setUser(newUser)

        if (newAccessToken!==null) {
            setLoggedIn(true)
        }
    },  [setStreamToken] )        

    function handleFetchErrors(response) {

        if (response.status===400) {
            setLoggedIn(false)
            setAccessToken("")
            setStreamToken("")
            console.log('Not logged in', response.status, response.statusText)
            if (refreshToken) {
                console.log('attempting to get access token using refresh token')
                refreshAccessToken()
            }
            return { "error": "login" }
        }
        if (response.status===401) {
            setLoggedIn(false)
            setAccessToken("")
            setStreamToken("")
            console.log('Unauthorized / Not logged in', response.status, response.statusText)
            if (refreshToken) {
                console.log('attempting to get access token using refresh token')
                refreshAccessToken()
            }
            return { "error": "login" }
        }
        if (!response.ok) {
            console.log('Error connecting', response.status, response.statusText)
            setConnectError(true)
            return { "error": response.statusText }
        }
        //setLoggedIn(true)
        setConnectError(false)
        return response.json()
    }
    
    function refreshAccessToken() {
        console.log('Refreshing Access Token')
        if (refreshToken) {
            return fetch(serverurl+'/auth/o2/token', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"refresh_token":refreshToken, "user":user})
            })
                    .then(result=>handleFetchErrors(result))
 		            .then(result=>loginResult(result))
                    .then(result=>setTokenStorage(user, result))
        } else {
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }
    
    function getJSON(path) {
        if (accessToken && loggedIn ) {
      	    return fetch(serverurl+"/"+path, { method: 'GET', headers: { 'authorization': accessToken}})
     		    .then(result=>handleFetchErrors(result))
        } else {
            //console.log('not logged in. refusing to get ',path)
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }

    function postJSON(path, data, skipToken) {
        
        if (accessToken || skipToken===true) {
            var headers={   'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}
            if (!skipToken) {
                headers.authorization=accessToken
            }
            return fetch(serverurl+'/'+path, {
                method: 'post',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(result=>handleFetchErrors(result))
                .then(result=> { return result })
        } else {
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }

    function loginResult(response) {

        console.log('login result', response)

        if (response && response.hasOwnProperty('access_token')) { 
            setAccessToken(response.access_token)
            setStreamToken(response.access_token)
            setLoggedIn(true)
            return response 
        }
        
        setLoggedIn(false)
        return null
    }

    function login(user, password) {
        console.log('Logging in as user',user,password)
        //let formData = new FormData();
        //formData.append('user',user);
        //formData.append('password', password);
        var data={"user":user, "password": password}
  	    //return fetch(serverurl+'/login', { method: 'post', body: formData })
  	    return postJSON('login',data, true)
 		            .then(result=>loginResult(result))
                    .then(result=>setTokenStorage(user, result))
    }

    function setTokenStorage(user, newTokens) {
        if (newTokens) {
            if (newTokens.hasOwnProperty('access_token')) {
                localStorage.setItem("access_token", newTokens.access_token)
                setAccessToken(newTokens.access_token)
            }
            if (newTokens.hasOwnProperty('refresh_token')) {
                localStorage.setItem("refresh_token", newTokens.refresh_token)
                setRefreshToken(newTokens.refresh_token)
            }
            localStorage.setItem("user", user)
            setUser(user)
            if (newTokens.access_token && newTokens.refresh_token && !loggedIn) { setLoggedIn(true) }
        }
        return newTokens
    }
    
    function getStorage(item) {
        return localStorage.getItem(item)
    }


    function logout() {
        console.log('logging out')
        setStreamToken(null)
        setLoggedIn(false)
        closeStream()
        localStorage.clear();
        writeCookie('access_token',"",1)
  	    fetch(serverurl+'/logout', {credentials: 'include'})
 		    .then(result=>result.json())
    }

    return (
        <NetworkContext.Provider
            value={{
                connectError: connectError,
                streamConnected: streamConnected,
                streamStatus: streamStatus,
                loggedIn: loggedIn,
                getJSON: getJSON,
                postJSON: postJSON,
                login: login,
                logout: logout,
                addSubscriber: addSubscriber,
                getStorage: getStorage,
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}
