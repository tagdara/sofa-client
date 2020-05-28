import React, {useState, useEffect, createContext} from 'react';

const serverurl="https://"+window.location.hostname;

export const useStream = (userToken) => {
    const [eventSource, setEventSource] = useState(undefined)
    //const [connected, setConnected] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [isConnecting, setIsConnecting] = useState(false)
    const [streamToken, setStreamToken] = useState(userToken)
    
    const addSubscriber = (subscriber) => {
        // to see why this is needed for the closure issue
        // https://stackoverflow.com/questions/58193166/usestate-hook-setter-incorrectly-overwrites-state
        setSubscribers((subscribers) => ([...subscribers, subscriber] ));
    };


    function getStreamStatus() {
        
        if (eventSource) {
            return eventSource.readyState
        } else {
            return 10
        }
    }

    function getConnected() {
        if (eventSource!==undefined) {
            if (eventSource.readyState===1) {
                return true
            }
        }
        return false
    }

    const streamStatus=getStreamStatus()
    
    const streamConnected = getConnected()
    
    const closeStream = () => {
        //setConnected(false)
        eventSource.close()
        //setEventSource(undefined)
    }

    useEffect(() => {
        let unmounted = false;

        const connectStream = () => {
            if (streamToken && subscribers.length>0 && !isConnecting) {
                setIsConnecting(true)
                console.log('.. Connecting event source:', streamToken, subscribers)
                var esource=new EventSource(serverurl+"/sse", { headers: { 'authorization': streamToken }, withCredentials: true })
                esource.addEventListener('message', dataHandler);
                esource.addEventListener('error', errorHandler);
                esource.addEventListener('open', openHandler);
                setEventSource(esource)
            }
        }
        
        const openHandler = () => {
            console.log('SSE Opened')
            //setConnected(true)
            setIsConnecting(false)
        }

        const errorHandler = () => {
            console.log('ERROR with EventSource')
            //setConnected(false)
            //connectStream()
        }

        const dataHandler = event => {
            //console.log('data', event.data)
            //deviceDispatch(JSON.parse(event.data));
            var data=JSON.parse(event.data)
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i](data)
            }
            //setHeartbeat(Date.now())
        };

        if (streamToken && !unmounted && !isConnecting && streamStatus!==1) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
        
    }, [ streamToken, subscribers, isConnecting, streamConnected, streamStatus]);
    
    //return { connected, streamStatus, setToken, closeStream, addSubscriber };
    return { streamConnected, streamStatus, closeStream, addSubscriber, setStreamToken };
};


export const NetworkContext = createContext();

export default function NetworkProvider(props) {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken]= useState(null);
    const [connectError, setConnectError] = useState(false);
    const { streamConnected, streamStatus, closeStream, addSubscriber, setStreamToken } = useStream(token, [])
    
    useEffect(() => {
        function getTokenCookie() {
            var name = "token=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                  c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    console.log('returning',c.substring(name.length, c.length))
                    if (c.substring(name.length, c.length)==='null') {
                        return null
                    }
                    return c.substring(name.length, c.length);
                }
            }
            return null
        }
        var newToken=getTokenCookie()
        setToken(newToken)
        setStreamToken(newToken)
        if (newToken!==null) {
            setLoggedIn(true)
        }
    },  [setStreamToken] )        

    function handleFetchErrors(response) {

        if (response.status===400) {
            setLoggedIn(false)
            setToken("")
            setStreamToken("")
            console.log('Not logged in', response.status, response.statusText)
            return { "error": "login" }
        }
        if (response.status===401) {
            setLoggedIn(false)
            setToken("")
            setStreamToken("")
            console.log('Not logged in', response.status, response.statusText)
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
    
    function getJSON(path) {
        if (token && loggedIn ) {
      	    return fetch(serverurl+"/"+path, { method: 'GET', headers: { 'authorization': token}})
     		    .then(result=>handleFetchErrors(result))
        } else {
            console.log('not logged in')
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }

    function postJSON(path, data) {
        if (token) {
            return fetch(serverurl+'/'+path, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
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
        if (response.status===401) {
            setLoggedIn(false)
            return null
        } 
        
        return response.json()
            .then(result => {
                console.log('result',result)
                if (result.hasOwnProperty('token')) {
                    return result.token
                }
                return null
            })
    }

    function login(user, password) {
        console.log('Logging in as user',user,password)
        let formData = new FormData();
        formData.append('user',user);
        formData.append('password', password);
  	    return fetch(serverurl+'/login', { method: 'post', body: formData })
 		            .then(result=>loginResult(result))
                    .then(result=>setTokenUserCookies(user, result))
    }

    function writeCookie (key, value, days) {
        var date = new Date();
        // Default at 365 days.
        days = days || 365;
        // Get unix milliseconds at current time plus number of days
        date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
        window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
        return value;
    };
    
    function setTokenUserCookies(user, newToken) {
        writeCookie("token", newToken, 365)
        writeCookie("user", user, 365)
        setToken(newToken)
        if (newToken && !loggedIn) { setLoggedIn(true) }
        return newToken
    }
    
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                if (c.substring(name.length, c.length)==='null') {
                    return null
                }
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    function logout() {
        console.log('logging out')
        setStreamToken(null)
        setLoggedIn(false)
        closeStream()
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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
                getCookie: getCookie,
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}
