import React from "react";
import PropTypes from 'prop-types';
import { withData } from './DataContext/withData';
import Receiver from './devices/receiver';

class ReceiverList extends React.Component {

    render() {
        return (
            <React.Fragment>
                { this.props.devices.map((device) => (
                    <Receiver sendAlexaCommand={this.props.sendAlexaCommand} key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } />
                    ))
                }
            </React.Fragment> 
        );
    }
}

export default withData(ReceiverList);
