import React from 'react';
import SegmentPopover from 'components/SegmentPopover'
import useColor from 'endpoint-model/property/color/useColor'
import ColorSlider from 'endpoint-model/property/color/ColorSlider'

export default function ColorButton(props) {

    const { colorHex } = useColor(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover size={props.size} color={colorHex} value={colorHex} popOver={<ColorSlider icon={false} {...props} />} />
    );
}

