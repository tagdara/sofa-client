import React from "react";
import { withData } from './DataContext/withData';

import Television from './devices/Television';

class TvHero extends React.Component {

    render() {

        return (
            <React.Fragment>
                { this.props.devices.map(device => 
                    <Television wide={this.props.wide} key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendAlexaCommand={this.props.sendAlexaCommand} />
                )}
            </React.Fragment>
        );
    }
}

export default withData(TvHero);
