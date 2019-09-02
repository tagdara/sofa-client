import React, { memo } from "react";
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';

import SecurityCamera from './camera/securitycamera';

function CameraSelect(props) {

    //const [cameras, setCameras] = useState({});
    const cameras=props.devicesByCategory(['CAMERA'])
    const [currentCamera, setCurrentCamera] = useState(cameras[0]);

    function nextCamera() {
        var nextcam=cameras.indexOf(currentCamera)+1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        setCurrentCamera(cameras[nextcam])
    }
    
    function prevCamera() {
        var nextcam=cameras.indexOf(currentCamera)-1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        setCurrentCamera(cameras[nextcam])
    }

    return (
        <React.Fragment>
            { currentCamera!=null ?
            <SecurityCamera wide={props.wide} camera={currentCamera} selectButtons={true} key={ currentCamera.endpointId } 
                            name={ currentCamera.friendlyName } nextCamera={nextCamera} prevCamera={prevCamera} />
            :null }
        </React.Fragment> 
    );
}

export default withData(CameraSelect);
