import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { withData } from './DataContext/withData';
import StatusLock from './devices/statusLock';
import PinDialog from './devices/pinDialog'
import GridItem from './GridItem';

function MiniCard(props) {
    
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
        if (dev) {
            var dp=props.propertiesFromDevices(dev)
            if (dp.hasOwnProperty(dev.friendlyName)) {
                dp=dp[dev.friendlyName]
                return dp[statusDef.property]
            }
        }
        return ''
    }
    
    function pinCheck(trypin) {
        setShowDialog(false)
        if (trypin==pin) {
            sendCommand()
        }
    }
    
    function handlePress(commandName) {
        setShowDialog(true)
        setCommand(commandName)
    }
        
    function sendCommand(){
        var commands=props.virtualDevices[props.name].commands 
        console.log(command, commands)
        var command = commands[command]
        props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   
 
    return (
            props.virtualDevices.hasOwnProperty(props.name) &&
            <React.Fragment>
                <StatusLock wide={ props.wide} name={ props.name } secondIcon={false} status={ getStatusProp(props.virtualDevices[props.name].status) }
                    commands={ props.virtualDevices[props.name].commands } handlePress={handlePress} />
                <PinDialog submitPin={pinCheck} open={showDialog} close={closeDialog} />
            </React.Fragment>

    );

}

export default withData(MiniCard);

