import React from "react";
import Computer from './Computer';

export default function ComputerList(props) {

    return (
        <React.Fragment >
            { props.devices.map((device) =>
                <Computer key={ device.endpointId } device={ device } directive={props.directive} />
            )}
        </React.Fragment>
    )
}
