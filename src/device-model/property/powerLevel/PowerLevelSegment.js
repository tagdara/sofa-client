import React from 'react';
import usePowerLevel from 'device-model/property/powerLevel/usePowerLevel'
import PowerLevelSlider from 'device-model/property/powerLevel/PowerLevelSlider'
import SegmentPopover from 'components/SegmentPopover'

export default function PowerLevelSegment(props) {

    const { powerLevelLabel } = usePowerLevel(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover minWidth={200} size={props.size} value={ powerLevelLabel } popOver={<PowerLevelSlider step={1} {...props} />} />
    );
}

