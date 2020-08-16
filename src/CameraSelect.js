import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { UserContext } from './user/UserProvider';

import SecurityCamera from './camera/securitycamera';

export default function CameraSelect(props) {

    const { devices, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DataContext);
    const [cameras, setCameras]=useState([])
    const { chooseUserCamera, userCamera } = useContext(UserContext);

    useEffect(() => {
        setCameras(getEndpointIdsByCategory('CAMERA','CameraSelect'))
        return function cleanup() {
            unregisterDevices('CameraSelect');
        };
    // eslint-disable-next-line 
    }, [ ] )
    
    function currentCamera() {
        if (userCamera===undefined) {
            if (cameras[0]) {
                return cameras[0]
            } else {
                return undefined
            }
        }
        
        for (var i = 0; i < cameras.length; i++) {
            if (userCamera===cameras[i]) { 
                return devices[cameras[i]]
            }
        }
        
        return cameras[0]
    }

    function nextCamera() {

        var curr=0
        for (var i = 0; i < cameras.length; i++) {
            if (userCamera===cameras[i].endpointId) { 
                curr=i
                break
            }
        }

        var nextcam=curr+1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        chooseUserCamera(cameras[nextcam].endpointId)
    }
    
    function prevCamera() {
        var curr=0
        for (var i = 0; i < cameras.length; i++) {
            if (userCamera===cameras[i].endpointId) { 
                curr=i
                break
            }
        }

        var nextcam=curr-1
        if (nextcam>cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=cameras.length-1; }
        chooseUserCamera(cameras[nextcam].endpointId)
    }

    return (
        <React.Fragment>
            { currentCamera()!==undefined ?
            <SecurityCamera wide={props.wide} camera={currentCamera()} selectButtons={true} key={ userCamera } directive={ directive }
                            name={ currentCamera().friendlyName } nextCamera={nextCamera} prevCamera={prevCamera} top={true} />
            :null }
        </React.Fragment> 
    );
}