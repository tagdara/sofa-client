import React, { memo } from "react";
import { useState, useEffect } from 'react';
import { withLayout } from './DataContext/withLayout';
import SecurityCamera from './camera/securitycamera';

function CameraSelect(props) {

    const [cameras, setCameras] = useState({});
    const [cameraData, setCameraData] = useState({});
    const [currentCamera, setCurrentCamera] = useState(null);
    
    useEffect(() => {
  	    fetch('/data/cameras')
 		    .then(result=>result.json())
 		    .then(data=>initialSetup(data))
    },[])

    function initialSetup(data) {
        setCameras(Object.keys(data))
        setCameraData(data)
        if (Object.keys(data).length>0) {
            if (props.default && Object.keys(data).includes(props.default)) {
                setCurrentCamera(props.default)
            } else {
                setCurrentCamera(Object.keys(data)[0])
            }
        } else {
            setCurrentCamera(null)
        }
    }
    
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
        setCurrentCamera(camera[nextcam])
    }

    return (
        <React.Fragment>
            { currentCamera!=null ?
            <SecurityCamera wide={props.wide} setLayoutCard={props.setLayoutCard} cameraSource={cameraData[currentCamera].source} selectButtons={true} key={ currentCamera } 
                            name={ currentCamera } nextCamera={nextCamera} prevCamera={prevCamera} />
            :null }
        </React.Fragment> 
    );
}

export default withLayout(memo(CameraSelect));
