import React from 'react';
import useBrightness from 'device-model/property/brightness/useBrightness'
import SegmentPopover from 'components/SegmentPopover'
import BrightnessSlider from 'device-model/property/brightness/BrightnessSlider'

export default function BrightnessSegment(props) {

    const { brightnessLabel } = useBrightness(props.endpointId, props.value, props.directive)

    return <SegmentPopover value={brightnessLabel}  popOver={<BrightnessSlider {...props} />} />
}

