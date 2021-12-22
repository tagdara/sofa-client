import React, { useState } from 'react';
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';

import SecurityCamera from 'beta/devices/Camera/SecurityCamera';
import useUserStore from 'store/userStore'
import StatusLock from 'beta/devices/Lock/StatusLock';
import StackCard from 'beta/components/StackCard'

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

    const getOpener = (opener) => {
        try {
            const endpointId = endpointIdByFriendlyName(opener.deviceName)  
            if (!endpointId) { return null}
            return (
                <StackCard key={endpointId}>
                    <StatusLock endpointId={endpointId} displayName={ opener.displayName } buttonDuration={opener.buttonDuration} setCamera={setCurrentCamera} />
                </StackCard>
            )
        }
        catch {
            return null
        }
    }


    return (
        <>
            <SecurityCamera endpointId={currentCamera} selectButtons={true} 
                            nextCamera={nextCamera} prevCamera={prevCamera} 
                            wide={props.wide} top={false} showOffline={true} 
                        />
            { props.openers &&
                <>
                    { props.openers.map( opener => getOpener(opener)) }
                </>
            }
        </>
    );
}