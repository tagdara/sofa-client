import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import StatusLock from './devices/statusLock';
import PinDialog from './dialogs/PinDialog'

export default function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);
    const { deviceByEndpointId, virtualDevices } = useContext(DataContext);

    function closeDialog() {
        setShowDialog(false);
    };  
    
    function getStatusProp(statusDef) {
        var dev=deviceByEndpointId(statusDef.endpointId)
        return dev[statusDef['controller']][statusDef['property']].value
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
        deviceByEndpointId(command.endpointId)[command.controller].directive( command.command, command.value)
    }   
 
    return (
        virtualDevices.hasOwnProperty(props.name) &&
        <React.Fragment>
            <StatusLock wide={ props.wide} name={ props.name } secondIcon={false} status={ getStatusProp(virtualDevices[props.name].status) }
                commands={ virtualDevices[props.name].commands } handlePress={handlePress} />
            { showDialog &&
                <PinDialog submitPin={pinCheck} open={showDialog} close={closeDialog} camera={deviceByEndpointId(props.virtualDevices[props.name].camera)} />
            }
        </React.Fragment>
    );
}

