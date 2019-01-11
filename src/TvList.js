import React from "react";
import { withData } from './DataContext/withData';

import Tv from './devices/tv';

class TvList extends React.Component {

    render() {

        return (
            <React.Fragment>
                { this.props.devices.map(device => 
                    <Tv wide={this.props.wide} key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendAlexaCommand={this.props.sendAlexaCommand} />
                )}
            </React.Fragment>
        );
    }
}

export default withData(TvList);
