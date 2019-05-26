import React from "react";
import Computer from './Computer';

export default function ComputerList(props) {

    return (
        <React.Fragment >
            { props.devices.map((device) =>
                <Computer sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.endpointId] }  />
            )}
        </React.Fragment>
    )
}
