import { useState, useEffect } from 'react';
import useLoginStore from 'store/loginStore'
import { tokenFetch } from 'store/tokenFetch'

const serverurl="https://"+window.location.hostname;
const sseUrl = serverurl + "/sse"
const sseTokenUrl = "/sse/token"

export const useStream = ( dataProcessor ) => {
    const accessToken = useLoginStore(state => state.access_token)
    const checkToken = useLoginStore(state => state.checkToken)
    const [eventSource, setEventSource] = useState(undefined)
    const [isConnecting, setIsConnecting] = useState(false)
    const [ streamLabel, setStreamLabel ] = useState('Initial')

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
    const url = serverurl + "/sse"
    
    const connectStream = async () => {
        if (!isConnecting) {
            const tokenResult = await tokenFetch(sseTokenUrl)
            setStreamLabel('connect')
            console.log('connect stream')
            setIsConnecting(true)
            const tokenUrl = sseUrl + "?token=" + tokenResult['sse_token']
            var esource = new EventSource(tokenUrl, { withCredentials: true })
            esource.addEventListener('message', dataHandler);
            esource.addEventListener('error', errorHandler);
            esource.addEventListener('open', openHandler);
            setEventSource(esource)
            setStreamLabel('connected'+ esource.readyState)
        } else {
            setStreamLabel('not trying')
            console.log('didnt even try to connect stream' )
        }
    }

    const openHandler = () => {
        setStreamLabel('open')
        setIsConnecting(false)
    }

    const errorHandler = (e) => {
        console.log('ERROR with EventSource',e )
        setStreamLabel('error '+JSON.stringify(e, ["message", "arguments", "type", "name"]))
        checkToken()
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
        if (!streamConnected && !unmounted && !isConnecting && accessToken) {
            setStreamLabel('connect needed')
            connectStream()
        }
            
        return () => {
            unmounted = true;
        };
    // eslint-disable-next-line    
    }, [ accessToken, isConnecting, streamConnected, streamStatus]);
    
    return { url, streamConnected, streamStatus, streamLabel };
};

export default useStream