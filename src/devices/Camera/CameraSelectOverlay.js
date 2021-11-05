import React from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import VideocamIcon from '@material-ui/icons/Videocam';
import CameraQR from 'devices/Camera/CameraQR';

import { selectPage } from 'store/layoutHelpers'

const useStyles = makeStyles(theme => {
    
    return {    
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
            right: 8,
            bottom: 8,
        },
        videoButton: {
            position: "absolute",
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
