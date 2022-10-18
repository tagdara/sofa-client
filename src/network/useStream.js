import { useState, useEffect, useRef } from 'react';
import useLoginStore from 'login/loginStore'
import { tokenFetch } from 'network/tokenFetch'

const serverUrl = useLoginStore.getState().server_url
const sseUrl = serverUrl + "/sse"
const sseTokenUrl = "/auth/linked/token" //"/sse/token"

export const useStream = ( dataProcessor ) => {
    const accessToken = useLoginStore(state => state.access_token)
    const [ streamLabel, setStreamLabel ] = useState('Initial')
    const streamRef = useRef(undefined);
    const connectingRef = useRef(false);

    function getStreamStatus() {
        
        if (streamRef.current !== undefined) {
            return streamRef.current.readyState
        } else {
            return 10
        }
    }

    function getConnected() {
        if (streamRef.current !== undefined) {
            if (streamRef.current.readyState===1) {
                return true
            }
        }
        return false
    }

    const streamStatus = getStreamStatus()
    const streamConnected = getConnected()
    const url = serverUrl + "/sse"

    const reconnect = () => {
        connectingRef.current = false
        connectStream()
    }
    
    const connectStream = async () => {
        //if (!isConnecting) {

        if (!connectingRef.current) {
            connectingRef.current=true
            const tokenResult = await tokenFetch(sseTokenUrl)
            //console.log('token result for linked sse token', tokenResult)
            setStreamLabel('connect')
            console.log('.. connecting SSE data stream')
            //setIsConnecting(true)
            const tokenUrl = sseUrl + "?token=" + tokenResult?.linked_token
            streamRef.current = new EventSource(tokenUrl, { withCredentials: true })
            streamRef.current.addEventListener('message', dataHandler);
            streamRef.current.addEventListener('error', errorHandler);
            streamRef.current.addEventListener('open', openHandler);
            //setEventSource(esource)
            setStreamLabel('connected'+ streamRef.current.readyState)
        } else {
            setStreamLabel('not trying')
            console.log('didnt even try to connect stream' )
        }
    }

    const openHandler = () => {
        setStreamLabel('open')
        connectingRef.current=false
        //setIsConnecting(false)
    }

    const errorHandler = (e) => {
        console.log('ERROR with EventSource',e.target )
        setStreamLabel('error '+JSON.stringify(e, ["message", "arguments", "type", "name"]))
        e.target.close()
        connectingRef.current = false
        //checkToken()
    }

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
        // console.log('stream change - connected', streamConnected, 'not connecting', !connectingRef.current, accessToken) 
        if (!streamConnected && !connectingRef.current && accessToken) {
            setStreamLabel('connect needed')
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line    
    }, [ accessToken, connectingRef.current, streamConnected, streamStatus]);
    
    return { url, streamConnected, streamStatus, streamLabel, reconnect };
};

export default useStream