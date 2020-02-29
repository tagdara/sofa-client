import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import TimerIcon from '@material-ui/icons/Timer';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

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
        margin: "auto 4px",
        maxHeight: "100%",
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

const Hls = window.Hls;

export default function CameraDialog(props) {

    const classes = useStyles();
    const [rotation, setRotation]=useState(0)
    const [uri, setUri]=useState("")
    const video = useRef(null);

    useEffect(()=> {
        enableScaling()
    },[]);

    useEffect(()=> {
        props.directive(props.camera.endpointId,"CameraStreamController", "InitializeCameraStreams", 
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
        ).then(response => setUri(response.payload.cameraStreams[0].uri));
    },[props.camera]);
    
    
    useEffect(()=> {
        console.log('uri update',uri)
        enableScaling()
        if (props.live && window.Hls.isSupported() ) {
            var hls = new Hls();
            hls.loadSource(uri);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED,function() { video.current.play(); });
        }
    }, [uri, props.live])
    
            
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
            <Fab size="medium" aria-label="Rotate" className={classes.rotatebutton} onClick={() => rotate()}>
                <ScreenRotationIcon />
            </Fab>
            <Paper className={classes.bigcamPaper} >
                { props.live ?
                <video controls muted autoPlay playsInline id="video" className={rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} ref={video}>
                    <source src={uri} type="application/x-mpegURL" />
                </video>
                :
                <img alt={props.camera.friendlyName} className={rotation>0 ? classes.bigcamRotated : classes.bigcam} style={{transform: `rotate(${rotation}deg)`}} src={props.src}/>
                }
            </Paper>
        </Dialog>
    )
};

