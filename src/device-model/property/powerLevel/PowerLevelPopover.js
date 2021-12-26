import React from 'react';
import CardPopover from 'components/CardPopover'
import PowerLevelSlider from 'device-model/property/powerLevel/PowerLevelSlider'

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

