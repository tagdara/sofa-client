import React from 'react';
import usePowerLevel from 'endpoint-model/property/powerLevel/usePowerLevel'
import PowerLevelSlider from 'endpoint-model/property/powerLevel/PowerLevelSlider'
import SegmentPopover from 'layout/components/SegmentPopover'

export default function PowerLevelSegment(props) {

    const { powerLevelLabel } = usePowerLevel(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover width={300} size={props.size} value={ powerLevelLabel } popOver={<PowerLevelSlider step={1} {...props} />} />
    );
}

