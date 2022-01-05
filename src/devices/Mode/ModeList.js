import React from "react";
import Mode from './Mode';

export default function ModeList(props) {

    return (
        <React.Fragment>
            { props.devices.map((device) =>
                <Mode key={ device.endpointId } device={ device }  />
            )}
        </React.Fragment>
    )
}
