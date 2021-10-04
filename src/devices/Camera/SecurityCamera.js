import React, { useState, useEffect, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { LayoutContext } from 'layout/LayoutProvider';
import { NetworkContext } from 'network/NetworkProvider';

import CameraDialog from 'devices/Camera/cameraDialog';
import CardBase from 'components/CardBase';
import CameraQR from 'devices/Camera/CameraQR';
import CameraSelectOverlay from 'devices/Camera/CameraSelectOverlay'

import ReactHLS from 'react-hls-player';

const useStyles = makeStyles(theme => {
    
    return {    
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
            color: theme.palette.layer.itemHighlight,
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        unreachable: {
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },

        sizerDiv: {
            width: "100%",
            height: 0,
            maxHeight: 0,
        }
    }
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
    const { selectPage } = useContext(LayoutContext);
    const { checkAuthentication } = useContext(NetworkContext);
    const intervals = [1000, 500, 5000, 3000]
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(5000);
    const [live, setLive] = useState(false);
    const [videoUri,setVideoUri] = useState("")
    const [updateUrl, setUpdateUrl] = useState("");
    const ios=navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const video = useRef(null);
    const image = useRef(null);
    const holder = useRef(null);
    const [lowHeight,setLowHeight]= useState(210)
    const sizerRef = useRef(false)    
    const imageUri = props.deviceState.CameraStreamController ? props.deviceState.CameraStreamController.imageUri : undefined
    const unreachable = props.deviceState.EndpointHealth ? props.deviceState.EndpointHealth.connectivity.value.value !== "OK" : true

    useEffect(() => { 
        try {
            if (sizerRef.current.parentNode.offsetWidth>0) { setLowHeight(Math.ceiling(sizerRef.current.parentNode.offsetWidth * 0.66)) }
        } 
        catch {
            // offsetWidth is not always available on first check
        }
    // eslint-disable-next-line 
    }, [ sizerRef.current ] )
    

    useInterval(() => {
        if (imageUri && !showDialog) {
            setUpdateUrl(imageUri+"?time="+Date.now())
        }
    }, (imageUri && !showDialog) ? refreshInterval : null);

    
    useEffect(()=> {
        if ((!unreachable) && (props.camera)) { 
            // This should get the static image URI without starting streams unnecessarily
            props.directive(props.camera, "CameraStreamController", "InitializeCameraStreams",{ "cameraStreams": [] })
                .then(response =>{ setUpdateUrl(imageUri+"?time="+Date.now()) } )
        } 
    // eslint-disable-next-line 
    }, [props.camera, unreachable]);

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
        props.directive(props.camera, "CameraStreamController", "InitializeCameraStreams", 
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
    
    function imageError(e) {
        checkAuthentication().then(res => { console.log('image error. loaded: '+imageLoaded) } )
    }
   
    return (
        unreachable && !props.showOffline ? null :
        <CardBase noPad={true}>
            <div className={ classes.sizerDiv} ref={sizerRef} />
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
                        onError={ (e) => imageError(e) }
                        onLoad={ () => imageFinished() }
                        onClick={ () => handleClickOpen()}
                        alt={imageLoaded+" "+props.name+" ("+imageLoaded+")"}
                    />
                    </div>
                }
                { imageLoaded || unreachable ?
                    <React.Fragment>
                        { unreachable &&
                            <div className={classes.hidden} style={{minHeight: `${lowHeight}`}}>
                                <span className={classes.unreachable}>Offline</span>
                            </div>
                        }
                        <CameraSelectOverlay prev={props.prevCamera} next={props.nextCamera} selectButtons={props.selectButtons} goLive={goLive} />
                    </React.Fragment>
                :   
                <>
                    <div className={classes.hidden} style={{minHeight: `${lowHeight}`}}>
                        <CircularProgress className={classes.spinner} size={50} />
                    </div>

                    { (!live && props.selectButtons) &&
                        <IconButton color="primary" className={classes.newgridbutton} onClick={ () => selectPage('CameraLayout')}>
                            <ViewModuleIcon />
                        </IconButton>
                    }
                    </>
                }
                </React.Fragment>
            }
            { props.qr &&
                <CameraQR overlay={true} cameraId={props.camera} key={props.camera+"qr"} name={ props.camera.friendlyName } />
            }            
            { showDialog &&
                <CameraDialog poster={updateUrl} directive={props.directive} live={true} camera={props.camera} name={props.name} refreshInterval={refreshInterval} changeInterval={changeInterval} show={showDialog} close={closeDialog} src={imageUri} />
            }
        </CardBase>
    );
}
