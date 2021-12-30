import React from 'react';
import Segment from 'device-model/property/Segment'
import useColor from 'device-model/property/color/useColor'

export default function ColorButton(props) {

    const { colorHex } = useColor(props.endpointId, props.value, props.directive)

    return (
        <Segment color={colorHex} value={colorHex} />
    );
}

