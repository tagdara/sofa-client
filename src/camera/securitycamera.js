import React, { useState, useEffect, useRef, useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import CameraDialog from './cameraDialog';
import GridItem from '../GridItem';

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
    const [refreshInterval, setRefreshInterval] = useState(3000);
    const live = true;
    const [imageUri,setImageUri] = useState("")
    const [updateUrl, setUpdateUrl] = useState("");

    useInterval(() => {
        // Your custom logic here
        if (imageUri) {
            setUpdateUrl(imageUri+"?time="+Date.now())
        }
    }, refreshInterval);
    
    useEffect(()=> {
        
        function updateUrlUri(data) {
            setUpdateUrl(data.payload.imageUri+"?time="+Date.now());
            setImageUri(data.payload.imageUri)
        }
        
        props.camera.CameraStreamController.directive("InitializeCameraStreams", 
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

    }, [props.camera]);

    function imageFinished() {
        if (!imageLoaded) {
            setImageLoaded(true);
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
    
    return (
        <GridItem wide={props.wide} nopad={true} thinmargin={isMobile}>
            { imageUri && 
                <img
                    className={imageLoaded ? classes.im : classes.hiddenimage}
                    src={updateUrl}
                    onLoad={ () => imageFinished() }
                    onClick={ () => handleClickOpen()}
                    alt={props.camera.friendlyName+" Security Camera"}
                />
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

                </React.Fragment>
            :
                <div className={classes.hidden}>
                    <CircularProgress className={classes.spinner} size={50} />
                </div>
            }
            { showDialog &&
                <CameraDialog live={live} camera={props.camera} name={props.name} refreshInterval={refreshInterval} changeInterval={changeInterval} show={showDialog} close={closeDialog} src={imageUri} />
            }
        </GridItem>
    );
}
