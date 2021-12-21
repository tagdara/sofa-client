import React from 'react';
import CardLine from 'beta/components/CardLine'
import RangeValueText from 'beta/device-model/property/rangeValue/RangeValueText'
import { hasInstance } from 'store/deviceHelpers'

const RangeValueLine = props => {

    if (!hasInstance(props.endpointId, props.instance)) {
        return null
    }

    return (
        <CardLine primary={props.instance} icon={props.icon} size="sm">
            <RangeValueText endpointId={props.endpointId} instance={props.instance} unit={props.unit} />
        </CardLine>
    );
}

export default RangeValueLine;
