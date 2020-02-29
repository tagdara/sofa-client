import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { DeviceContext } from './DataContext/DeviceProvider';
import StatusLock from './devices/statusLock';
import PinDialog from './dialogs/PinDialog'

export default function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);
    const { deviceStateByEndpointId } = useContext(DataContext);
    const { virtualDevices, directive } = useContext(DeviceContext);
    function closeDialog() {
        setShowDialog(false);
    };  
    
    function getStatusProp(statusDef) {
        var dev=deviceStateByEndpointId(statusDef.endpointId)
        if (dev!==undefined) {
            return dev[statusDef['controller']][statusDef['property']].value
        }
    }
    
    function pinCheck(trypin) {

        if (trypin===pin) {
            setShowDialog(false)
            sendCommand('toggle')
        }
    }
    
    function handlePress(commandName) {
        setShowDialog(true)
    }
        
    function sendCommand(scommand){
        var commands=virtualDevices[props.name].commands 
        var command = commands[scommand]
        directive(command.endpointId, command.controller, command.command, command.value)
    }   

    return (
        virtualDevices.hasOwnProperty(props.name) &&
        <React.Fragment>
            <StatusLock wide={ props.wide} name={ props.name } secondIcon={false} status={ getStatusProp(virtualDevices[props.name].status) }
                commands={ virtualDevices[props.name].commands } handlePress={handlePress} />
            { showDialog &&
                <PinDialog submitPin={pinCheck} open={showDialog} close={closeDialog} camera={deviceStateByEndpointId(virtualDevices[props.name].camera)} directive={directive} />
            }
        </React.Fragment>
    );
}

