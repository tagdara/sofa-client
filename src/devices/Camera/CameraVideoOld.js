import React, { useState, useEffect, useRef } from 'react';
// import ReactHLS from 'react-hls-player';
// import { directive } from 'endpoint-model/directive/directive'
import { Text } from '@mantine/core';
// import hls from '/client/hls.js'
import Hls from "hls.js";


// Retaining this version for the proper CameraStreamController bits which should be used but are
// unnecessary with the current HLS testing


const hostName = ( process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.hostname )

const CameraVideo = props => {

    const [ videoUri, setVideoUri ] = useState("")
    const ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const video = useRef(null);

    useEffect(()=> {
        console.log('setting URI', "https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-"))
        setVideoUri("https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-")+"/")
        //startStream()
    // eslint-disable-next-line 
    }, [ ]);

    useEffect(()=> {
        if (videoUri) {
            alert('starting')
            create(videoUri + "/index.m3u8")
        }
        //startStream()
    // eslint-disable-next-line 
    }, [ videoUri]);
 
    function startStream() {
        console.log('setting URI', "https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-"))
        setVideoUri("https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-")+"/")
        return
        // directive(props.endpointId, "Alexa.CameraStreamController", "InitializeCameraStreams", 
        //     {
        //         "cameraStreams": [
        //             {
        //                 "protocol": "HLS",
        //                 "resolution": {
        //                     "width": 640,
        //                     "height": 480
        //                 },
        //                 "authorizationType": "BASIC",
        //                 "videoCodec": "H264",
        //                 "audioCodec": "AAC"
        //             }
        //         ]
        //     }
        // ).then(response => getStreamUrl(response));
    }    

    // const getStreamUrl = (data) => {
    //     console.log('data', data)
    //     if (!data || !data.payload || !data.payload.cameraStreams) { 
    //         console.log('No data in response', data)
    //         return false
    //     }
    //     if (data.payload.cameraStreams.length<1) {
    //         console.log('No streams were specified', data)
    //         return false
    //     }
    //     setVideoUri(data.payload.cameraStreams[0].uri)
    // }

    const create = (indexUrl) => {
        const video = document.getElementById('video');
    
        // always prefer hls.js over native HLS.
        // this is because some Android versions support native HLS
        // but don't support fMP4s.
        if (Hls.isSupported()) {
            const hls = new Hls({
                maxLiveSyncPlaybackRate: 1.5,
            });
    
            hls.on(Hls.Events.ERROR, (evt, data) => {
                if (data.fatal) {
                    hls.destroy();
    
                    setTimeout(create, 2000);
                }
            });
    
            hls.loadSource(indexUrl);
            hls.attachMedia(video);
    
            video.play();
    
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // since it's not possible to detect timeout errors in iOS,
            // wait for the playlist to be available before starting the stream
            fetch(indexUrl)
                .then(() => {
                    video.src = indexUrl;
                    video.play();
                });
        }
    };

    function dateUri(uri) {
        // var date = new Date();
        console.log("du", ios, uri)
        return uri
        //return uri+"?date="+date.toGMTString()
    }

    if (ios) {
        return (
            <>
                <video controls muted autoPlay playsInline id="video" ref={video}>
                    <source src={dateUri(videoUri)} type="application/x-mpegURL" />
                </video>
                <Text>XX {dateUri(videoUri)}</Text>
            </>
        )
    }    

    return (
        <>
            <video id="video" muted controls autoplay playsinline></video>
            <Text>{dateUri(videoUri)}</Text>
        </>
    )
  


    // return (
    //     <>
    //         <ReactHLS   src={"https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-")+"/"} 
    //                     videoProps={{ width: "100%", height: "100%", muted: true, autoPlay: true, playsInline: true, }} 
    //                     hlsConfig ={{ liveDurationInfinity: true, enableWorker: false, }} 
    //         />
    //     </>
    // );
}

export default CameraVideo;
