import React from 'react';

import Device from 'devices/Device';

export default function DeviceList(props) {

    return (
        <React.Fragment>
            { props.devices.map(device =>
                <Device nested={props.nested} icon={props.icon} key={ device.endpointId } device={ device } directive={props.directive} />
            )}
        </React.Fragment>
    )
}
