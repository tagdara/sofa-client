import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';

import CropOriginalIcon from '@mui/icons-material/CropOriginal';

import ReactHLS from 'react-hls-player';

const useStyles = makeStyles(theme => {
    
    return {    
        im: {
            width: "100%",
            height: "auto",
            borderRadius: 4,
            display: "flex",
        },
        videoButton: {
            position: "absolute",
            right: 16,
            top: 16,
        },
    }
});

const CameraVideo = props => {

    const classes = useStyles();
    const [ videoUri, setVideoUri ] = useState("")
    const ios = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const video = useRef(null);

    useEffect(()=> {
        startStream()
    // eslint-disable-next-line 
    }, []);
 
    function startStream() {
        props.directive(props.endpointId, "CameraStreamController", "InitializeCameraStreams", 
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
        ).then(response => { console.log('resp',response); setVideoUri(response.payload.cameraStreams[0].uri) });
    }    

    function dateUri(uri) {
        var date = new Date();
        return uri+"?date="+date.toGMTString()
    }

    if (ios) {
        return (
            <>
                <video controls muted autoPlay playsInline id="video" className={classes.im} ref={video}>
                    <source src={dateUri(videoUri)} type="application/x-mpegURL" />
                </video>
                <IconButton color="primary" className={classes.videoButton} onClick={ () => props.goLive(false) } >
                    <CropOriginalIcon />
                </IconButton>
            </>
        )
    }     
    
    return (
        <>
            <ReactHLS    className={classes.im} url={dateUri(videoUri)} 
                        videoProps={{ width: "100%", height: "100%", muted: true, autoPlay: true, playsInline: true, }} 
                        hlsConfig ={{ liveDurationInfinity: true, enableWorker: false, }} 
            />
            <IconButton color="primary" className={classes.videoButton} onClick={ () => props.goLive(false) } >
                <CropOriginalIcon />
            </IconButton>
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
