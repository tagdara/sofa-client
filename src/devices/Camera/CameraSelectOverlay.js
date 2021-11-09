import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraQR from 'devices/Camera/CameraQR';

import { selectPage } from 'store/layoutHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
        nextbutton: {
            position: "absolute !important",
            top: "40%",
            right: 8,
        },
        prevbutton: {
            position: "absolute !important",
            top: "40%",
            left: 8,
        },
        gridbutton: {
            position: "absolute !important",
            right: 8,
            bottom: 8,
        },
        videoButton: {
            position: "absolute !important",
            right: 8,
            top: 8,
        },
    }
});

export default function CameraSelectOverlay(props) {

    const classes = useStyles();

    return (
        <>
            { props.prev &&
                <IconButton color="primary" className={classes.prevbutton} onClick={ () => props.prev()}>
                    <ChevronLeftIcon />
                </IconButton>
            }
            { props.next &&
                <IconButton color="primary" className={classes.nextbutton} onClick={ () => props.next()}>
                    <ChevronRightIcon />
                </IconButton>
            }
            { props.selectButtons &&
                <IconButton color="primary" className={classes.gridbutton} onClick={ () => selectPage('CameraLayout')}>
                    <ViewModuleIcon />
                </IconButton>
            }
            <IconButton color="primary" className={classes.videoButton} onClick={ () => props.goLive(true) } >
                <VideocamIcon />
            </IconButton>
            { ( props.showQR && props.endpointId) &&
                <CameraQR overlay={true} endpointId={props.endpointId} />
            } 
        </>
    );
}
