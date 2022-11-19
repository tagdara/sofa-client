import React from "react";
import Posture from './Posture';

export default function PostureList(props) {

    return (
        <React.Fragment>
            { props.devices.map((device) =>
                <Posture key={ device.endpointId } device={ device }  />
            )}
        </React.Fragment>
    )
}
