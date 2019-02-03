import React from "react";
import { withData } from './DataContext/withData';

import Television from './devices/Television';

function TvHero(props) {

    return (
        <React.Fragment>
            { props.devices.map(device => 
                <Television wide={props.wide} key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } sendAlexaCommand={props.sendAlexaCommand} />
            )}
        </React.Fragment>
    );
}

export default withData(TvHero);
