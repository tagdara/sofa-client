import React, { useState, useEffect } from 'react';
import { deviceByFriendlyName, register, unregister } from 'store/deviceHelpers';
import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import StatusLock from 'devices/statusLock';
import PinDialog from 'dialogs/PinDialog';
import PlaceholderCard from 'layout/PlaceholderCard';

export default function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);

    const opener = deviceByFriendlyName(props.deviceName)
    const deviceState = useDeviceStateStore( state => state.deviceStates[opener.endpointId] )    
 
    useEffect(() => {
        register(opener.endpointId, "Opener-"+opener.endpointId)
        return function cleanup() {
            unregister(opener.endpointId, "Opener-"+opener.endpointId)
        };
    // eslint-disable-next-line 
    }, [ ])
    

    function closeDialog() {
        setShowDialog(false);
    };  
    
    function pinCheck(trypin) {

        if (trypin===pin) {
            setShowDialog(false)
            directive(opener.endpointId, "ButtonController", "Hold", {"duration": props.buttonDuration})
        }
    }
    
    function handlePress(commandName) {
        setShowDialog(!showDialog)
    }
    
    if (!deviceState) {
        return <PlaceholderCard count={ 1 } />
    }
    
    return (
        <React.Fragment>
            <StatusLock wide={ props.wide} name={ props.displayName ? props.displayName : props.deviceName } secondIcon={false} 
                        device={ opener } deviceState={ deviceState } handlePress={handlePress} />
            { showDialog &&
                <PinDialog  submitPin={pinCheck} open={showDialog} close={closeDialog} device={ opener } deviceState={ deviceState }
                            directive={directive} />
            }
        </React.Fragment>
    );
}

Opener.defaultProps = {
    buttonDuration: 1,
}
