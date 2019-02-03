import React from "react";
import Mode from './Mode';

export default function ModeList(props) {

    return (
        <React.Fragment>
            { props.devices.map((device) =>
                <Mode sendAlexaCommand={props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] }  />
            )}
        </React.Fragment>
    )
}
