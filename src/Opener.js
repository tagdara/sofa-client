import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import StatusLock from './devices/statusLock';
import PinDialog from './dialogs/PinDialog'

export default function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);
    const { deviceStateByEndpointId, virtualDeviceStates } = useContext(DataContext);

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
        var commands=virtualDeviceStates[props.name].commands 
        var command = commands[scommand]
        deviceStateByEndpointId(command.endpointId)[command.controller].directive( command.command, command.value)
    }   
 
    return (
        virtualDeviceStates.hasOwnProperty(props.name) &&
        <React.Fragment>
            <StatusLock wide={ props.wide} name={ props.name } secondIcon={false} status={ getStatusProp(virtualDeviceStates[props.name].status) }
                commands={ virtualDeviceStates[props.name].commands } handlePress={handlePress} />
            { showDialog &&
                <PinDialog submitPin={pinCheck} open={showDialog} close={closeDialog} camera={deviceStateByEndpointId(props.virtualDeviceStates[props.name].camera)} />
            }
        </React.Fragment>
    );
}

