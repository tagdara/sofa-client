import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from './DataContext/DataProvider';
import StatusLock from './devices/statusLock';
import PinDialog from './dialogs/PinDialog'
import PlaceholderCard from './PlaceholderCard';

export default function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);
    const { cardReady, devices, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices, directive } = useContext(DataContext);
    const [ openerDevice, setOpenerDevice ]=useState(undefined)
    
    useEffect(() => {
        var od=getEndpointIdsByFriendlyName(props.deviceName,'Opener-'+props.deviceName)
        if (od.length>0) {
            setOpenerDevice(od[0])
        }
        return function cleanup() {
            unregisterDevices('Opener-'+props.deviceName);
        };
    // eslint-disable-next-line 
    }, [ ] )


    function closeDialog() {
        setShowDialog(false);
    };  
    
    function pinCheck(trypin) {

        if (trypin===pin) {
            setShowDialog(false)
            directive(openerDevice, "ButtonController", "Hold", {"duration": props.buttonDuration})
        }
    }
    
    function handlePress(commandName) {
        setShowDialog(!showDialog)
    }
    
    if (!cardReady('Opener-'+props.deviceName)) {
        return <PlaceholderCard count={ 1 } />
    }
    
    return (
        <React.Fragment>
            <StatusLock wide={ props.wide} name={ props.displayName ? props.displayName : props.deviceName } secondIcon={false} 
                        device={ devices[openerDevice] } deviceState={ deviceStates[openerDevice] } handlePress={handlePress} />
            { showDialog &&
                <PinDialog  submitPin={pinCheck} open={showDialog} close={closeDialog} device={ devices[openerDevice] } deviceState={ deviceStates[openerDevice] }
                            directive={directive} />
            }
        </React.Fragment>
    );
}

Opener.defaultProps = {
    buttonDuration: 1,
}
