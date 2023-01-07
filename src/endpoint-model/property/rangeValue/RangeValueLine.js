import React from 'react';
import CardLine from 'layout/components/CardLine'
import RangeValueText from 'endpoint-model/property/rangeValue/RangeValueText'
import { hasInstance } from 'endpoint-model/discovery'
import { capabilityFriendlyName } from 'endpoint-model/discovery'

const RangeValueLine = props => {

    const name = capabilityFriendlyName(props.endpointId, props.instance)

    if (!hasInstance(props.endpointId, props.instance)) {
        return null
    }

    return (
        <CardLine primary={name} icon={props.icon} size={ props.size ? props.size : "sm" } >
            <RangeValueText size={props.size} endpointId={props.endpointId} instance={props.instance} unit={props.unit} />
        </CardLine>
    );
}

export default RangeValueLine;
