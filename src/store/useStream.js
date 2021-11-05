import { useState, useEffect } from 'react';
import useUserStore from 'store/userStore'

const serverurl="https://"+window.location.hostname;

function writeCookie(key, value, days) {

    // Cookies are one of the only ways to pass authentication information as part of an SSE subscription
    // otherwise we use local storage

    var date = new Date();
    // Default at 365 days.
    days = days || 365;
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
    return value;
};

export const useStream = ( dataProcessor ) => {
    const accessToken = useUserStore(state => state.access_token)
    const [eventSource, setEventSource] = useState(undefined)
    const [isConnecting, setIsConnecting] = useState(false)

    useEffect(() => {
        if (accessToken) {
            //console.log('Cookieizing Access Token for stream auth', accessToken)
            writeCookie("access_token", accessToken, 1)
        }
    }, [ accessToken ])
    
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

    const streamStatus = getStreamStatus()
    const streamConnected = getConnected()
    
    const connectStream = () => {
        if (!isConnecting) {
            setIsConnecting(true)
            var esource = new EventSource(serverurl+"/sse", { withCredentials: true })
            esource.addEventListener('message', dataHandler);
            esource.addEventListener('error', errorHandler);
            esource.addEventListener('open', openHandler);
            setEventSource(esource)
        } else {
            console.log('didnt even try to connect stream' )
        }
    }

   const openHandler = () => {
        //console.log('SSE Opened')
        //setConnected(true)
        setIsConnecting(false)
    }

    const errorHandler = () => {
        console.log('ERROR with EventSource')
        //reloadPWA()
        ////setConnected(false)
        ////connectStream()
    }

    //function reloadPWA() {
        
    //    if ('serviceWorker' in navigator) {
    //        navigator.serviceWorker.ready.then(registration => {
    //            registration.unregister();
    //        });
    //    }
    //    window.location.reload(true)
    //}

    const dataHandler = event => {
        //deviceDispatch(JSON.parse(event.data));
        var data=JSON.parse(event.data)

        try {
            if (data.event && data.event.header.name === "Heartbeat") {
                //console.log('heartbeat')
                return false
            }
        }
        catch {}

        if (data.result) {
            console.log('result', data)
            return false
        }
        if (data.error) {
            console.log('error', data)
            return false
        }

        //console.log('<< event stream data', data)
        dataProcessor(data)
        //setHeartbeat(Date.now())
    };


    useEffect(() => {
        let unmounted = false;
        if (!streamConnected && !unmounted && !isConnecting && streamStatus!==1 && accessToken) {
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line    
    }, [ accessToken, isConnecting, streamConnected, streamStatus]);
    
    return { streamConnected, streamStatus };
};

export default useStream