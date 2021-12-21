import React from 'react';
import CardPopover from 'beta/components/CardPopover'
import PowerLevelSlider from 'beta/device-model/property/powerLevel/PowerLevelSlider'

const PowerLevelPopover = props => {

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
        >
            <PowerLevelSlider endpointId={props.endpointId} />
        </CardPopover>
    );
}

export default PowerLevelPopover

