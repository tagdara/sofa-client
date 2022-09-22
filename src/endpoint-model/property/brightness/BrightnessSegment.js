import React from 'react';
import useBrightness from 'endpoint-model/property/brightness/useBrightness'
import SegmentPopover from 'components/SegmentPopover'
import BrightnessSlider from 'endpoint-model/property/brightness/BrightnessSlider'

export default function BrightnessSegment(props) {

    const { brightnessLabel } = useBrightness(props.endpointId, props.value, props.directive)

    return <SegmentPopover width={300} value={brightnessLabel}  popOver={<BrightnessSlider {...props} />} />
}

