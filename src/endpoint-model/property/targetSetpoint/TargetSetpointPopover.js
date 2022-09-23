import React from 'react';
import CardPopover from 'layout/components/CardPopover'
import TargetSetpointAdjuster from 'endpoint-model/property/targetSetpoint/TargetSetpointAdjuster'

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

