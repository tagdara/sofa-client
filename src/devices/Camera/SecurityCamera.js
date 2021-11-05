import React, { useState } from 'react';
import CameraDialog from 'devices/Camera/CameraDialog';
import CameraSelectOverlay from 'devices/Camera/CameraSelectOverlay'
import CameraCard from 'devices/Camera/CameraCard';
import CameraImage from 'devices/Camera/CameraImage';
import CameraVideo from 'devices/Camera/CameraVideo';

const SecurityCamera = props => {

    // const intervals = [1000, 500, 5000, 3000]
    const [showDialog, setShowDialog] = useState(false);
    const refreshInterval = 3000
    //const [refreshInterval, setRefreshInterval] = useState(3000);
    const [live, setLive] = useState(false);
    const [lowHeight,setLowHeight] = useState(200)

    //function changeInterval() {
    //    setRefreshInterval(intervals.shift())
    //    intervals.push(refreshInterval)
    //}
    
    function closeDialog() {
        setShowDialog(false)
    }
    
    function handleClickOpen() {
        setShowDialog(true)
    }

    function goLive(vid) {
        if (vid) {
            setLive(true)
        } else {
            setLive(false)
        }
    }

    if (live && !showDialog) {
        return  <CameraCard setLowHeight={setLowHeight} lowHeight={lowHeight}>
                    <CameraVideo endpointId={props.endpointId} goLive={goLive} directive={props.directive} />
                </CameraCard>
    }
   
    return (
        <CameraCard setLowHeight={setLowHeight} lowHeight={lowHeight}>
            <CameraImage endpointId={props.endpointId} name={"Camera"} openDialog={handleClickOpen} 
                                refreshInterval={refreshInterval} lowHeight={lowHeight} setLowHeight={setLowHeight} />
            <CameraSelectOverlay endpointId={props.endpointId} prev={props.prevCamera} next={props.nextCamera} selectButtons={props.selectButtons} 
                                    goLive={goLive} showQR={props.showQR} />  
            { showDialog &&
                <CameraDialog   endpointId={props.endpointId} live={live} 
                                refreshInterval={refreshInterval} 
                                show={showDialog} close={closeDialog}
                             />
            }
        </CameraCard>
    );
}

export default SecurityCamera;
