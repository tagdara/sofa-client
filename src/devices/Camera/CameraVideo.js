import React, { useEffect, useRef } from 'react';
import { Text } from '@mantine/core';
import Hls from "hls.js";

const hostName = ( process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.hostname )

const CameraVideo = props => {

    const ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const videoUri = "https://" + hostName + "/hls/" + props.endpointId.replaceAll(":","-")
    const videoPlayer = useRef(null);
    const indexUrl = videoUri + "/index.m3u8"

    useEffect(()=> {
        if (videoUri ) {
            create()
        }
    // eslint-disable-next-line 
    }, [ videoUri ]);
 

    const create = () => {
        const video = videoPlayer.current

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

        }
    };

    if (ios) {
        return (
            <video controls muted autoPlay playsInline id="video" ref={videoPlayer} style={{ borderRadius: 8, padding: 0, "width": "100%" }} >
                <source src={indexUrl} type="application/x-mpegURL" />
            </video>
        )
    }    

    return (
        <>
            <video 
                ref={videoPlayer}
                onClick={props.onClick}
                id="video" 
                muted 
                controls 
                autoplay 
                playsinline 
                style={{ borderRadius: 8, padding: 0, "maxWidth": "100%" }}
            />
            <Text>{ videoPlayer.current ? videoPlayer.current.src : "waiting"}</Text>
        </>
    )
 
}

export default CameraVideo;
