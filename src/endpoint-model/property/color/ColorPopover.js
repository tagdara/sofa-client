import React from 'react';
import CardPopover from 'components/CardPopover'
import ColorSlider from 'endpoint-model/property/color/ColorSlider'

const ColorPopover = props => {

    return (
        <CardPopover
                opened={props.open}
                setOpen={props.setOpen}
                target={ props.target }
            >
                <ColorSlider endpointId={props.endpointId} value={props.value} directive={props.directive} />
        </CardPopover>
    );
}

export default ColorPopover