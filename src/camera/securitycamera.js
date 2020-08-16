import React, { useState, useEffect, useRef, useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Videocam from '@material-ui/icons/Videocam';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

import CameraDialog from './cameraDialog';
import GridItem from '../GridItem';

import ReactHLS from 'react-hls-player';

const useStyles = makeStyles({    
    
    nextbutton: {
        position: "absolute",
        top: "40%",
        right: 8,
    },
    prevbutton: {
        position: "absolute",
        top: "40%",
        left: 8,
    },
    gridbutton: {
        position: "absolute",
        left: 8,
        bottom: 8,
    },
    newgridbutton: {
        position: "absolute",
        right: 8,
        bottom: 8,
    },
    newVideoButton: {
        position: "absolute",
        right: 8,
        top: 8,
    },


    im: {
        width: "100%",
        height: "auto",
        borderRadius: 4,
        display: "flex",
    },
    hiddenimage: {
        height: 0,
        display: "none",
    },
    hidden: {
        borderRadius: 4,
        position: "relative",
        width: "100%",
        paddingTop: '56.25%', // 16:9
        boxSizing: "border-box",
    },
    spinner: {
        position: "absolute",
        margin: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

function useInterval(callback, delay) {
    
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

    }, [delay]);
}

export default function SecurityCamera(props) {

    const classes = useStyles();
    const { isMobile, applyLayoutCard } = useContext(LayoutContext);
    const intervals = [1000, 500, 5000, 3000]
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(5000);
    const [live, setLive] = useState(false);
    const [imageUri,setImageUri] = useState("")
    const [videoUri,setVideoUri] = useState("")
    const [updateUrl, setUpdateUrl] = useState("");
    const [ready, setReady] = useState(false)
    const ios=navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const video = useRef(null);
    const image = useRef(null);
    const holder = useRef(null);
    const [lowHeight,setLowHeight]= useState(100)
    
    useInterval(() => {
        // Your custom logic here
        if (imageUri && !showDialog) {
            setUpdateUrl(imageUri+"?time="+Date.now())
        }
    }, refreshInterval);
    
    useEffect(()=> {
        
        function updateUrlUri(data) {
            setUpdateUrl(data.payload.imageUri+"?time="+Date.now());
            setImageUri(data.payload.imageUri)
        }
        
        if ((props.camera) && (ready!==props.camera.endpointId)) { 
            setReady(props.camera.endpointId)
            //props.camera.CameraStreamController.directive("InitializeCameraStreams", 
            props.directive(props.camera.endpointId, "CameraStreamController", "InitializeCameraStreams",
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
            ).then(response => updateUrlUri(response))
        } 
    // eslint-disable-next-line 
    }, [props.camera, ready]);

    function imageFinished() {
        if (!imageLoaded) {
            setImageLoaded(true);
        }
        if (image.current.offsetHeight>0) {
            setLowHeight(image.current.offsetHeight)
        }
    }
    
    function changeInterval() {
        setRefreshInterval(intervals.shift())
        intervals.push(refreshInterval)
    }
    
    function closeDialog() {
        setShowDialog(false)
    }
    
    function handleClickOpen() {
        setShowDialog(true)
    }

    function startStream() {
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
        ).then(response => { console.log('resp',response); setVideoUri(response.payload.cameraStreams[0].uri) });
    }
    
    function goLive(vid) {
        if (vid) {
            startStream()
            setLive(true)
        } else {
            setLive(false)
            setVideoUri("")
        }
    }
    
    function dateUri(uri) {
        var date = new Date();
        return uri+"?date="+date.toGMTString()
    }
   
    return (
        <GridItem wide={props.wide} nopad={true} noMargin={props.top} thinmargin={isMobile}>
            { live && videoUri && !showDialog ?
                <React.Fragment>
                    { ios ?
                        <video controls muted autoPlay playsInline id="video" className={classes.im} ref={video}>
                            <source src={dateUri(videoUri)} type="application/x-mpegURL" />
                        </video>                    
                    :
                        <ReactHLS ref={video} className={classes.im} url={dateUri(videoUri)} 
                                    videoProps={{ width: "100%", height: "100%", muted: true, autoPlay: true, playsInline: true, }} 
                                    hlsConfig ={{ liveDurationInfinity: true, enableWorker: false, }} 
                        />
                    }
                    <IconButton color="primary" className={classes.newVideoButton} onClick={ () => goLive(false) } >
                        <CropOriginalIcon />
                    </IconButton>
                </React.Fragment>
            :
                <React.Fragment>
                { imageUri && 
                    <div ref={holder} style={{minHeight: `${lowHeight}`}}>
                    <img
                        ref={image}
                        className={imageLoaded ? classes.im : classes.hiddenimage}
                        src={updateUrl}
                        onLoad={ () => imageFinished() }
                        onClick={ () => handleClickOpen()}
                        alt={props.camera.friendlyName+" Security Camera"}
                    />
                    </div>
                }
                {imageLoaded ?
                    <React.Fragment>
                        { props.prevCamera &&
                            <IconButton color="primary" className={classes.prevbutton} onClick={ () => props.prevCamera()}>
                                <ChevronLeftIcon />
                            </IconButton>
                        }
                        { props.nextCamera &&
                            <IconButton color="primary" className={classes.nextbutton} onClick={ () => props.nextCamera()}>
                                <ChevronRightIcon />
                            </IconButton>
                        }
                        { props.selectButtons &&
                            <IconButton color="primary" className={classes.newgridbutton} onClick={ () => applyLayoutCard('CameraLayout')}>
                                <ViewModuleIcon />
                            </IconButton>
                        }
                        <IconButton color="primary" className={classes.newVideoButton} onClick={ () => goLive(true) } >
                            <Videocam />
                        </IconButton>
                    </React.Fragment>
                :
                    <div className={classes.hidden} style={{minHeight: `${lowHeight}`}}>
                        <CircularProgress className={classes.spinner} size={50} />
                    </div>
                }
                { (!live && props.selectButtons) &&
                    <IconButton color="primary" className={classes.newgridbutton} onClick={ () => applyLayoutCard('CameraLayout')}>
                        <ViewModuleIcon />
                    </IconButton>
                }
                </React.Fragment>
            }
            { showDialog &&
                <CameraDialog poster={updateUrl} directive={props.directive} live={true} camera={props.camera} name={props.name} refreshInterval={refreshInterval} changeInterval={changeInterval} show={showDialog} close={closeDialog} src={imageUri} />
            }
        </GridItem>
    );
}
