import React from 'react';
import CardPopover from 'layout/components/CardPopover'
import PowerLevelSlider from 'endpoint-model/property/powerLevel/PowerLevelSlider'

const PowerLevelPopover = props => {

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
                width={320}
        >
            <PowerLevelSlider endpointId={props.endpointId} />
        </CardPopover>
    );
}

export default PowerLevelPopover

