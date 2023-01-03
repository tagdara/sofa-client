import React from 'react';
import { Avatar } from '@mantine/core';
import useTargetSetpoint from 'endpoint-model/property/targetSetpoint/useTargetSetpoint'

const TargetSetpointAvatar = props => {

    const { targetSetpoint, targetSetpointColor } = useTargetSetpoint(props.endpointId)

    return (
        <Avatar color={targetSetpointColor} size={props.size} >
            {targetSetpoint}
        </Avatar>
    );
}

export default TargetSetpointAvatar;
