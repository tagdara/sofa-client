import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';

import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';

import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import CloseIcon from '@mui/icons-material/Close';
import TimerIcon from '@mui/icons-material/Timer';

import CameraImage from 'devices/Camera/CameraImage';
import CameraVideo from 'devices/Camera/CameraVideo';

import { register, unregister } from 'store/deviceHelpers'

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

const CameraDialog = props => {

    const classes = useStyles();
    const [rotation, setRotation]=useState(0)
    const ios=navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    const [live, setLive] = useState(false);
    const refreshInterval = 3000;
    const [lowHeight,setLowHeight] = useState(200)

    useEffect(() => {
        register(props.endpointId, "cameradialog-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "cameradialog-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])  

    useEffect(()=> {
        enableScaling()
    },[]);
    
    function goLive(vid) {
        if (vid) {
            setLive(true)
        } else {
            setLive(false)
        }
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

    console.log('live', live, props.endpointId)

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
                { props.live ?
                    <CameraVideo endpointId={props.endpointId} goLive={goLive} directive={props.directive} />
                :
                    <CameraImage name={"Camera"} endpointId={props.endpointId} 
                                    refreshInterval={refreshInterval} lowHeight={lowHeight} setLowHeight={setLowHeight} /> 
               }
            </Paper>
        </Dialog>
    )
}

export default CameraDialog;