import React, { memo } from "react";
import { useState, useEffect } from 'react';
import { withLayout } from './DataContext/withLayout';
import SecurityCamera from './camera/securitycamera';

function CameraSelect(props) {

    const [cameras, setCameras] = useState([]);
    const [currentCamera, setCurrentCamera] = useState(null);
    const [currentCameraNumber, setCurrentCameraNumber] = useState(0);

    function selectCurrentCamera(data) {
        setCameras(data)
        if (data.length>0) {
            setCurrentCamera(data[0])
        } else {
            setCurrentCamera(null)
        }
    }
    
    function nextCamera() {
        var nextcam=currentCameraNumber+1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        
        setCurrentCameraNumber(nextcam)
        setCurrentCamera(cameras[nextcam])
    }
    
    function prevCamera() {
        var nextcam=currentCameraNumber-1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        
        setCurrentCameraNumber(nextcam)
        setCurrentCamera(cameras[nextcam])
    }
    
    function handleGridOpen() {
        setShowGrid(true);
    };  

    function handleGridClose() {
        setShowGrid(false);
    };  
    
    useEffect(() => {
  	    fetch('/data/cameras')
 		    .then(result=>result.json())
 		    .then(data=>selectCurrentCamera(data))
    },[])
    
    return (
        <React.Fragment>
            { currentCamera!=null ?
            <SecurityCamera wide={props.wide} setLayoutCard={props.setLayoutCard} cameraSource={"dlink"} selectButtons={true} openGrid={ handleGridOpen } key={ currentCamera } 
                            name={ currentCamera } nextCamera={nextCamera} prevCamera={prevCamera} />
            :null }
        </React.Fragment> 
    );
}

export default withLayout(memo(CameraSelect));
