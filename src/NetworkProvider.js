import React, {useState, useEffect, createContext, useReducer} from 'react';

export const NetworkContext = createContext();

export default function NetworkProvider(props) {
    
    const serverurl="https://"+window.location.hostname;
    const [eventSource, setEventSource] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    const [connectError, setConnectError] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    
    useEffect(() => {
        getJSON('loggedin')
    }, [])

    useEffect(() => {
        if (loggedIn) {
            connectEventSource()
        }
        //getJSON('loggedin')
        //    .then(data => { console.log(data)})
    }, [loggedIn])

    function connectEventSource() {
        console.log('connecting event source')
        var esource=new EventSource(serverurl+"/sse", {withCredentials: true})
        esource.addEventListener('message', listener);
        esource.addEventListener('error', errorlistener);
        esource.addEventListener('open', openlistener);
        setEventSource(esource)
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
        setConnectError(true)
        console.log('error',event)
        //var newurl="https://"+window.location.hostname+"/plogin"
        //window.open(newurl);
        //setHeartbeat(Date.now())
    };

    const openlistener = event => {
        setConnectError(false)
        setLoggedIn(true)
    };

    function handleFetchErrors(response) {
        if (response.status===401) {
            setLoggedIn(false)
            console.log('Not logged in', response.status, response.statusText)
            return { "error": "login" }
        }
        if (!response.ok) {
            console.log('Error connecting', response.status, response.statusText)
            setConnectError(true)
            throw Error(response.statusText);
            return { "error": response.statusText }
        }
        setLoggedIn(true)
        setConnectError(false)
        return response.json()
    }
    
    function getJSON(path) {
  	    return fetch(serverurl+"/"+path, {credentials: 'include'})
 		    .then(result=>handleFetchErrors(result))
    }

    function login() {
        console.log('Logging in as user')
  	    fetch(serverurl+'/plogin', {credentials: 'include'})
 		    .then(result=>result.json())
            .then(result=>setLoggedIn(true))
    }


    function logout() {
        console.log('logging out')
  	    fetch(serverurl+'/plogout', {credentials: 'include'})
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

