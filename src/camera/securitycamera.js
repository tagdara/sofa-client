import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from '../layout/NewLayoutProvider';
import { withData } from '../DataContext/withData';

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import SlideshowIcon from '@material-ui/icons/Slideshow';

import HistoryIcon from '@material-ui/icons/History';
import CameraDialog from './cameraDialog';
import ListItem from '@material-ui/core/ListItem';
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
    },
    hiddenimage: {
        height: 0,
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

function SecurityCamera(props) {

    const classes = useStyles();
    const intervals = [1000, 500, 5000, 3000]
    const [currentUrl, setCurrentUrl] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(3000);
    const [live, setLive] = useState(true);
    const [imageUri,setImageUri] = useState("")
    const [updateUrl, setUpdateUrl] = useState("");
    
    useEffect(()=> {
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
        ).then(response => setImageUri(response.payload.imageUri));
    },[props.camera]);

    useEffect(() => {
        if (imageUri) {
            setUpdateUrl(imageUri+"?time="+Date.now())
            const interval = setInterval(() => { setUpdateUrl(imageUri+"?"+Date.now()) }, refreshInterval)
            return () => {
                clearInterval(interval);
            }
        }
    }, [imageUri]);
    
    function imageFinished() {
        if (!imageLoaded) {
            setImageLoaded(true);
        }
        setCurrentUrl(updateUrl)
    }
    
    function changeInterval() {
        setRefreshInterval(intervals.shift())
        const interval = setInterval(() => setUpdateUrl(imageUri+"?time="+Date.now()), refreshInterval)
        intervals.push(refreshInterval)
    }
    
    function closeDialog() {
        setShowDialog(false)
    }
    
    function handleClickOpen() {
        setShowDialog(true)
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} thinmargin={props.isMobile}>
            
            { imageUri && 
                <img
                    className={imageLoaded ? classes.im : classes.hiddenimage}
                    src={updateUrl}
                    onLoad={ () => imageFinished() }
                    onClick={ () => handleClickOpen()}
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
                        <IconButton color="primary" className={classes.newgridbutton} onClick={ () => props.applyLayoutCard('CameraLayout')}>
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
                <CameraDialog live={live} camera={props.camera} name={props.name} refreshInterval={refreshInterval} changeInterval={changeInterval} show={showDialog} close={closeDialog} src={currentUrl} />
            }
        </GridItem>
    );

}

export default withData(withLayout(SecurityCamera))
