import React from 'react';
import CardPopover from 'beta/components/CardPopover'
import TargetSetpointAdjuster from 'beta/device-model/property/targetSetpoint/TargetSetpointAdjuster'

const TargetSetpointPopover = props => {

    return (
        <CardPopover
                opened={ props.opened }
                setOpen={ props.setOpen }
                target={ props.target }
        >
            <TargetSetpointAdjuster endpointId={props.endpointId} />
        </CardPopover>
    );
}

export default TargetSetpointPopover

