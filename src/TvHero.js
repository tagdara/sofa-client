import React from "react";
import { withData } from './DataContext/withData';

import Television from './devices/Television';

function TvHero(props) {

    return (
        <React.Fragment>
            { props.devices.map(device => 
                <Television wide={props.wide} key={device.endpointId} device={ device } />
            )}
        </React.Fragment>
    );
}

export default withData(TvHero);
