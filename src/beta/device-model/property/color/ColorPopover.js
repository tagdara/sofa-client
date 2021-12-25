import React from 'react';
import CardPopover from 'beta/components/CardPopover'
import ColorSlider from 'beta/device-model/property/color/ColorSlider'

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

