import React, {useState, useEffect, useCallback, createContext} from 'react';

const serverurl="https://"+window.location.hostname;

export const useStream = (userToken) => {
    const [token, setToken] = useState(userToken);
    const [eventSource, setEventSource] = useState(undefined)
    const [connected, setConnected] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [isConnecting, setIsConnecting] = useState(false)

    const addSubscriber = useCallback(
        (subscriber) => {
            var sublist=[...subscribers]
            sublist.push(subscriber)
            setSubscribers([...(new Set(sublist))])
        }, [subscribers]
    )

//    const addSubscriber = (subscriber) => {
//        console.log('.. adding subscriber')
//        var sublist=[...subscribers]
//        sublist.push(subscriber)
//        setSubscribers([...(new Set(sublist))])
//    }
    
    const streamStatus = () => {
        return eventSource.status
    }
    
    const closeStream = () => {
        setConnected(false)
        setEventSource(undefined)
    }

    useEffect(() => {
        let unmounted = false;

        const connectStream = () => {
            if (token && subscribers.length>0 && !isConnecting) {
                setIsConnecting(true)
                console.log('.. Connecting event source:', token, subscribers)
                var esource=new EventSource(serverurl+"/sse", { headers: { 'authorization': token }, withCredentials: true })
                esource.addEventListener('message', dataHandler);
                esource.addEventListener('error', errorHandler);
                esource.addEventListener('open', openHandler);
                setEventSource(esource)
            }
        }
        
        const openHandler = () => {
            setConnected(true)
            setIsConnecting(false)
        }

        const errorHandler = () => {
            setConnected(false)
            setIsConnecting(false)
            connectStream()
        }

        const dataHandler = event => {
            //deviceDispatch(JSON.parse(event.data));
            var data=JSON.parse(event.data)
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i](data)
            }
            //setHeartbeat(Date.now())
        };

        if (!unmounted && !isConnecting && !connected) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
        
    }, [token, subscribers, isConnecting, connected]);

    return { connected, streamStatus, setToken, closeStream, addSubscriber };
};

export const useApi = ( path, token, initialData ) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [fetchedData, setFetchedData] = useState(initialData);

    useEffect(() => {
        let unmounted = false;

        const handleFetchResponse = response => {
            if (unmounted) return initialData;
            setLoggedIn(response.status!==400 && response.status!==401 )
            setHasError(!response.ok);
            setIsLoading(false);
            
            return response.status!==400 && response.status!==401 && response.ok && response.json ? response.json() : initialData;
        };

        const fetchData = () => {
            setIsLoading(true);
      	    return fetch(serverurl+'/'+path, { method: 'GET', headers: { 'authorization': token}})
                .then(handleFetchResponse)
                .catch(handleFetchResponse);
        };

        if (path && !unmounted)
            fetchData().then(data => !unmounted && setFetchedData(data));

        return () => {
            unmounted = true;
        };
    }, [ path, token, initialData ]);

    return { isLoading, hasError, loggedIn, data: fetchedData };
};


export const NetworkContext = createContext();


export default function NetworkProvider(props) {

    const [loggedIn, setLoggedIn] = useState(true);
    const [connectError, setConnectError] = useState(false);
    const [token, setToken]= useState(getCookie('token'));
    const { streamConnected, streamStatus, setStreamToken, closeStream, addSubscriber } = useStream(token, [])

    function handleFetchErrors(response) {
        if (response.status===400) {
            setLoggedIn(false)
            console.log('Not logged in', response.status, response.statusText)
            return { "error": "login" }
        }
        if (response.status===401) {
            setLoggedIn(false)
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
        if (token) {
      	    return fetch(serverurl+"/"+path, { method: 'GET', headers: { 'authorization': token}})
     		    .then(result=>handleFetchErrors(result))
        } else {
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
        } else {
            setLoggedIn(false)
            var promise1 = new Promise(function(resolve, reject) {
                resolve(undefined);});
            return promise1;
        }
    }

    function login(user, password) {
        console.log('Logging in as user',user,password)
        let formData = new FormData();
        formData.append('user',user);
        formData.append('password', password);
  	    return fetch(serverurl+'/login', { method: 'post', body: formData })
 		            .then(result=>result.json())
                    .then(result=>setTokenCookie(result))
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
    
    function setTokenCookie(tokendata) {
        if (tokendata.hasOwnProperty('token')) {
            writeCookie("token", tokendata.token, 365)
            console.log('GetCookie', getCookie('token'))
            setToken(tokendata.token)
            setStreamToken(tokendata.token)
            setLoggedIn(true)
            return tokendata.token
        }
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
              return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function logout() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log('logging out')
  	    fetch(serverurl+'/logout', {credentials: 'include'})
 		    .then(result=>result.json())
            .then(result=>setLoggedIn(false))
            .then(result=>closeStream())
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
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}
