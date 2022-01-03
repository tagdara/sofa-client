import React from 'react';
import useBrightness from 'device-model/property/brightness/useBrightness'
import Segment from 'components/Segment'

export default function BrightnessSegment(props) {

    const { brightnessLabel } = useBrightness(props.endpointId, props.value, props.directive)

    return <Segment value={brightnessLabel} />

}

