import React from 'react';

import Device from './Device';

export default function DeviceList(props) {

    return (
        <React.Fragment>
            { props.devices.map((device) =>
                <Device sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] }  />
            )}
        </React.Fragment>
    )
}
