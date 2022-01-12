import React from 'react';
import SegmentPopover from 'components/SegmentPopover'
import useColor from 'device-model/property/color/useColor'
import ColorSlider from 'device-model/property/color/ColorSlider'

export default function ColorButton(props) {

    const { colorHex } = useColor(props.endpointId, props.value, props.directive)

    return (
        <SegmentPopover size={props.size} color={colorHex} value={colorHex} popOver={<ColorSlider icon={false} {...props} />} />
    );
}

