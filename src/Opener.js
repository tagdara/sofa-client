import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { withData } from './DataContext/withData';
import StatusLock from './devices/statusLock';
import PinDialog from './dialogs/PinDialog'
import GridItem from './GridItem';

function Opener(props) {
    
    const pin= "7818";
    const [showDialog, setShowDialog] = useState(false);
    const [command, setCommand] = useState('');

    function openDialog() {
        setShowDialog(true)
    }
    
    function closeDialog() {
        setShowDialog(false);
    };  
    
    function getStatusProp(statusDef) {
        var dev=props.deviceByEndpointId(statusDef.endpointId)
        return dev[statusDef['controller']][statusDef['property']].value
    }
    
    function pinCheck(trypin) {

        if (trypin==pin) {
            setShowDialog(false)
            sendCommand('toggle')
        }
    }
    
    function handlePress(commandName) {
        setShowDialog(true)
        setCommand(commandName)
    }
        
    function sendCommand(command){
        var commands=props.virtualDevices[props.name].commands 
        var command = commands[command]
        props.deviceByEndpointId(command.endpointId)[command.controller].directive( command.command, command.value)
        //props.sendAlexaCommand("", command.endpointId, command.controller, command.command, command.value)
    }   
 
    return (
            props.virtualDevices.hasOwnProperty(props.name) &&
            <React.Fragment>
                <StatusLock wide={ props.wide} name={ props.name } secondIcon={false} status={ getStatusProp(props.virtualDevices[props.name].status) }
                    commands={ props.virtualDevices[props.name].commands } handlePress={handlePress} />
                { showDialog &&
                    <PinDialog submitPin={pinCheck} open={showDialog} close={closeDialog} camera={props.deviceByEndpointId(props.virtualDevices[props.name].camera)} />
                }
            </React.Fragment>
    );

}

export default withData(Opener);

