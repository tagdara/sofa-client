import React, {useState, useEffect, createContext} from 'react';

export const NetworkContext = createContext();

export default function NetworkProvider(props) {
    
    const serverurl="https://"+window.location.hostname;
    const [eventSource, setEventSource] = useState(null)
    const [loggedIn, setLoggedIn] = useState(true);
    const [connectError, setConnectError] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [token, setToken]= useState(getCookie('token'))
    
    useEffect(() => {
        console.log('Token',token)
        getJSON('get-user')
            .then(response=> console.log('Loggedin check?', response))
    }, [])

    useEffect(() => {
        if (loggedIn) {
            console.log('Logged in so starting EventSource')
            connectEventSource()
        }
        //getJSON('loggedin')
        //    .then(data => { console.log(data)})
    }, [loggedIn])

    function connectEventSource() {
        if (token) {
            console.log('previous eventsource', eventSource)
            console.log('connecting event source')
            var esource=new EventSource(serverurl+"/sse", { headers: { 'authorization': token}, withCredentials: true })
            esource.addEventListener('message', listener);
            esource.addEventListener('error', errorlistener);
            esource.addEventListener('open', openlistener);
            setEventSource(esource)
        } else {
            console.log('!! EventSource connect cancelled - No authorization token detected.')
            setLoggedIn(false)
        }
    }
    
    function addSubscriber(subscriber) {
        console.log('Adding subscriber', subscriber)
        var sublist=subscribers
        sublist.push(subscriber)
        setSubscribers([...(new Set(sublist))])
    }

    const listener = event => {
        //deviceDispatch(JSON.parse(event.data));
        var data=JSON.parse(event.data)
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i](data)
        }
        //setHeartbeat(Date.now())
    };

    const errorlistener = event => {
        //setConnectError(true)
        setLoggedIn(false)
        console.log('error',event,event.message)
        //var newurl="https://"+window.location.hostname+"/plogin"
        //window.open(newurl);
        //setHeartbeat(Date.now())
    };

    const openlistener = event => {
        setConnectError(false)
        setLoggedIn(true)
    };

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

    function login(user, password) {
        console.log('Logging in as user',user,password)
        let formData = new FormData();
        formData.append('user',user);
        formData.append('password', password);
  	    return fetch(serverurl+'/login', { method: 'post', body: formData })
 		            .then(result=>result.json())
                    .then(result=>setTokenCookie(result))
    }
    
    function setTokenCookie(tokendata) {
        if (tokendata.hasOwnProperty('token')) {
            document.cookie = "token="+tokendata.token+";"
            console.log('GetCookie', getCookie('token'))
            setToken(getCookie('token'))
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
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
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
            .then(result=>setEventSource(null))
            .then(result=>setLoggedIn(false))
    }
    
    function reconnect() {
        connectEventSource()
    }

    return (
        <NetworkContext.Provider
            value={{
                connectError: connectError,
                loggedIn: loggedIn,
                getJSON: getJSON,
                login: login,
                logout: logout,
                addSubscriber: addSubscriber,
                reconnect: reconnect,
            }}
        >
            {props.children}
        </NetworkContext.Provider>
    )
}

