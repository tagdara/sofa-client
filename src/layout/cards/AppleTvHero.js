import React from "react";
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import AppleTV from 'devices/AppleTV/AppleTV'

const AppleTvHero = props => {

    const appleTV = endpointIdByFriendlyName(props.appleTV)
    const television = endpointIdByFriendlyName(props.television)

    return (
        <AppleTV endpointId={appleTV} tv={television} hidden={props.hidden} />
    );
}

export default AppleTvHero;