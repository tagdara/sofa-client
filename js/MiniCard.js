import React from 'react';
import PropTypes from 'prop-types';

import { withData } from './DataContext/withData';
import StatusLock from './devices/statusLock';
import PinDialog from './devices/pinDialog'
import SofaCard from './sofaCard';

class MiniCard extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            pin: '7818',
            command: '',
        }
    }
    
    openDialog = () => {
        this.setState({ showDialog: true})
    }
    
    closeDialog = () => {
        this.setState({ showDialog: false });
    };  
    
    getStatusProp = statusDef => {
        var dev=this.props.deviceByEndpointId(statusDef.endpointId)
        if (dev) {
            var dp=this.props.propertiesFromDevices(dev)
            if (dp.hasOwnProperty(dev.friendlyName)) {
                dp=dp[dev.friendlyName]
                return dp[statusDef.property]
            }
        }
        return ''
    }
    
    pinCheck = (pin) => {
        this.setState({showDialog: false})
        if (pin==this.state.pin) {
            this.sendCommand()
        }
    }
    
    handlePress = commandName => {
        this.setState({ showDialog: true, command: commandName })
    }
        
    sendCommand = () => {
        var commands=this.props.virtualDevices[this.props.name].commands 
        console.log(this.state.command, commands)
        var command = commands[this.state.command]
        this.props.sendAlexaCommand(command.name, command.endpointId, command.controller, command.command, command.value)
    }   
 
    render() {
        const { virtualDevices, name } = this.props;

        return (
                <SofaCard>
                    { virtualDevices.hasOwnProperty(name) ? 
                        <StatusLock name={ name } secondIcon={false} status={ this.getStatusProp(virtualDevices[name].status) }
                            commands={ virtualDevices[name].commands } handlePress={this.handlePress} />
                    : null }
                <PinDialog submitPin={this.pinCheck} open={this.state.showDialog} close={this.closeDialog} />
                </SofaCard>
        );
    }
}

export default withData(MiniCard);

