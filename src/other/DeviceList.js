import React from 'react';

import Device from './Device';

export default function DeviceList(props) {

    return (
        <React.Fragment>
            { props.devices.map(device =>
                <Device key={ device.endpointId } device={ device } />
            )}
        </React.Fragment>
    )
}
