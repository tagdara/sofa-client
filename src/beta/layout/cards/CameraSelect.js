import React, { useState } from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';

import SecurityCamera from 'beta/devices/Camera/SecurityCamera';
import useUserStore from 'store/userStore'

export default function CameraSelect(props) {

    const userCamera = useUserStore( state => state.preferences.camera)
    const updateUserSetting = useUserStore( state => state.update)
    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const [ currentCamera, setCurrentCamera ] = useState(userCamera)

    function nextCamera() {
        try {
            var cameraPosition = cameras.indexOf(currentCamera)
            cameraPosition = (cameraPosition + 1) % cameras.length
        }
        catch {
            cameraPosition = 0
        }
        updateUserSetting('camera', cameras[cameraPosition])
        setCurrentCamera(cameras[cameraPosition])
        return cameras[cameraPosition]
    }

    function prevCamera() {
        try {
            var cameraPosition = cameras.indexOf(currentCamera)
            cameraPosition = ((cameraPosition - 1 ) + cameras.length) % cameras.length
        }
        catch {
            cameraPosition = cameras.length -1
        }
        updateUserSetting('camera', cameras[cameraPosition])
        setCurrentCamera(cameras[cameraPosition])
        return cameras[cameraPosition]
    }

    return (
        <SecurityCamera endpointId={currentCamera} selectButtons={true} 
                        nextCamera={nextCamera} prevCamera={prevCamera} 
                        wide={props.wide} top={false} showOffline={true} 
                    />
    );
}