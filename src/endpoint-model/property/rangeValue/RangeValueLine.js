import React from 'react';
import CardLine from 'layout/components/CardLine'
import RangeValueText from 'endpoint-model/property/rangeValue/RangeValueText'
import { hasInstance } from 'endpoint-model/discovery'

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
