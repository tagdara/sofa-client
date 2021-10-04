import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';

import ReactHLS from 'react-hls-player';

const useStyles = makeStyles({    
    bigcamDialog: {
        backgroundColor: "#222",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        minWidth: '320px',
        boxSizing: "border-box",
    },
    root: {
        backgroundColor: "#111"
    },
    paper: {
        backgroundColor: "#111",
        boxShadow: "none",
        overflow: "hidden"
    },
    bigcamPaper: {
        height: "100%",
        width: "100%",
        //margin: "auto 4px",
        //maxHeight: "100%",
        display: "flex",
    },
    bigcam: {
        width: "100%",
        height: "auto !important",
        maxWidth: "100%",
        maxHeight: "100%",
        background: "#222",
        opacity: "1.0", 
        margin: "auto auto",
        padding: 0,
        borderRadius: 4,
    },
    bigcamRotated: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vw",
        maxWidth: "initial",
        padding: 0,
        margin: "auto auto",
        marginTop: "calc((100vh - 100vw) / 2.5)",
        marginLeft: "calc((100vw * -1) /2.5) !important",
        borderRadius: 4,
    },

    rotatebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 72,
    },
    ratebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 190,
    },
    closebutton: {
        zIndex: 2000,
        position: "absolute",
        top: 16,
        right: 16,
    },
});


export default function CameraDialog(props) {

    const classes = useStyles();
    const [rotation, setRotation]=useState(0)
    const [uri, setUri]=useState("")
    const refVideo = useRef(null);
    const ios=navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

    useEffect(()=> {
        enableScaling()
    },[]);
    

    //useEffect(()=> {
        // If we need to attach to events, this code shows a functional example
    //    if (refVideo.current) {
    //        refVideo.current.hls.media.addEventListener('playing', function() { console.log('!!!!!') })
    //    }
    //},[refVideo.current]);
    
    useEffect(()=> {
        props.directive(props.camera,"CameraStreamController", "InitializeCameraStreams", 
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
        ).then(response => { console.log('resp',response.payload.cameraStreams[0].uri); setUri(response.payload.cameraStreams[0].uri) });
    // eslint-disable-next-line     
    },[props.camera]);
    
    function dateUri(uri) {
        var date = new Date();
        return uri+"?date="+date.toGMTString()
    }
    
            
    function enableScaling() {
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', "viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes");
    }

    function disableScaling() {
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', "viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    }
    
    function closeDialog(e) {
        disableScaling()
        props.close()
    }
    
    function rotate() {

        
        if (rotation!==90) {
            setRotation(90)
        } else {
            setRotation(0)
        }
        console.log('set rotate to ',rotation)

    }

    return (
        <Dialog fullScreen open={props.show} onClose={() => closeDialog()} className={classes.bigcamDialog} PaperProps ={{ classes: { root: classes.paper}}}>
            { !props.live && 
            <Fab size="medium" aria-label="Rate" className={classes.ratebutton} onClick={() => props.changeInterval()}  >
                <TimerIcon />{props.refreshInterval/1000}
            </Fab>
            }
            <Fab size="medium" color="primary" aria-label="Close" className={classes.closebutton} onClick={() => closeDialog()} >
                <CloseIcon />
            </Fab>
            { ios &&
                <Fab size="medium" aria-label="Rotate" className={classes.rotatebutton} onClick={() => rotate()}>
                    <ScreenRotationIcon />
                </Fab>
            }
            <Paper className={classes.bigcamPaper} >
                { (props.live && uri) ?
                <React.Fragment>
                    { ios ?
                        <video ref={refVideo} controls muted autoPlay playsInline id="video" className={rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}}>
                            <source src={dateUri(uri)} type="application/x-mpegURL" />
                        </video>                    
                    :
                        <ReactHLS   playerRef={refVideo}  className={rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} 
                                    url={dateUri(uri)} 
                                    videoProps={{ height: "auto", width: "100%", muted: true, autoPlay: true, playsInline: true, poster: props.poster }} 
                                    hlsConfig ={{ liveDurationInfinity: true, enableWorker: false,  }} 
                        />
                    }
                </React.Fragment>
                :
                <img alt={props.camera.friendlyName} className={rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} src={props.src}/>
                }
            </Paper>
        </Dialog>
    )
};

