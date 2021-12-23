import React, { useState, useEffect, useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { Crop } from 'react-feather'
import ReactHLS from 'react-hls-player';
import { directive } from 'store/directive'

const CameraVideo = props => {

    const [ videoUri, setVideoUri ] = useState("")
    const ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const video = useRef(null);

    useEffect(()=> {
        startStream()
    // eslint-disable-next-line 
    }, []);
 
    function startStream() {
        directive(props.endpointId, "CameraStreamController", "InitializeCameraStreams", 
            {
                "cameraStreams": [
                    {
                        "protocol": "HLS",
                        "resolution": {
                            "width": 640,
                            "height": 480
                        },
                        "authorizationType": "BASIC",
                        "videoCodec": "H264",
                        "audioCodec": "AAC"
                    }
                ]
            }
        ).then(response => getStreamUrl(response));
    }    

    const getStreamUrl = (data) => {
        console.log('data', data)
        if (!data || !data.payload || !data.payload.cameraStreams) { 
            console.log('No data in response', data)
            return false
        }
        if (data.payload.cameraStreams.length<1) {
            console.log('No streams were specified', data)
            return false
        }
        console.log('Setting video URL to',data.payload.cameraStreams[0].uri)
        setVideoUri(data.payload.cameraStreams[0].uri)
    }

    function dateUri(uri) {
        var date = new Date();
        return uri+"?date="+date.toGMTString()
    }

    if (ios) {
        return (
            <>
                <video controls muted autoPlay playsInline id="video" ref={video}>
                    <source src={dateUri(videoUri)} type="application/x-mpegURL" />
                </video>
                <ActionIcon onClick={ () => props.goLive(false) } >
                    <Crop size={20} />
                </ActionIcon>
            </>
        )
    }     
    
    return (
        <>
            <ReactHLS   url={dateUri(videoUri)} 
                        videoProps={{ width: "100%", height: "100%", muted: true, autoPlay: true, playsInline: true, }} 
                        hlsConfig ={{ liveDurationInfinity: true, enableWorker: false, }} 
            />
            <ActionIcon onClick={ () => props.goLive(false) } >
                <Crop size={20} />
            </ActionIcon>
        </>
    );
}

export default CameraVideo;

    //useEffect(()=> {
        // If we need to attach to events, this code shows a functional example
    //    if (refVideo.current) {
    //        refVideo.current.hls.media.addEventListener('playing', function() { console.log('!!!!!') })
    //    }
    //},[refVideo.current]);
