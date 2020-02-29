import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import SecurityCamera from './camera/securitycamera';

export default function CameraSelect(props) {

    const { deviceStatesByCategory, directive } = useContext(DataContext);
    const cameras=deviceStatesByCategory(['CAMERA'])
    const [currentCameraId, setCurrentCameraId] = useState(undefined);
    
    function currentCamera() {
        if (currentCameraId===undefined) {
            if (cameras[0]) {
                setCurrentCameraId(cameras[0].endpointId)
                return cameras[0]
            } else {
                return undefined
            }
        }
        
        for (var i = 0; i < cameras.length; i++) {
            if (currentCameraId===cameras[i].endpointId) { 
                return cameras[i]
            }
        }
        
        setCurrentCameraId(cameras[0].endpointId)
        return cameras[0]
    }

    function nextCamera() {

        var curr=0
        for (var i = 0; i < cameras.length; i++) {
            if (currentCameraId===cameras[i].endpointId) { 
                curr=i
                break
            }
        }

        var nextcam=curr+1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        setCurrentCameraId(cameras[nextcam].endpointId)
    }
    
    function prevCamera() {
        var curr=0
        for (var i = 0; i < cameras.length; i++) {
            if (currentCameraId===cameras[i].endpointId) { 
                curr=i
                break
            }
        }

        var nextcam=curr-1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        setCurrentCameraId(cameras[nextcam].endpointId)
    }

    return (
        <React.Fragment>
            { currentCamera()!==undefined ?
            <SecurityCamera wide={props.wide} camera={currentCamera()} selectButtons={true} key={ currentCameraId } directive={ directive }
                            name={ currentCamera().friendlyName } nextCamera={nextCamera} prevCamera={prevCamera} />
            :null }
        </React.Fragment> 
    );
}