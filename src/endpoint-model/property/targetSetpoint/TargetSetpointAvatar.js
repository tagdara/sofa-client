import React, { useState } from 'react';
import { Avatar } from '@mantine/core';
import TargetSetpointPopover from 'endpoint-model/property/targetSetpoint/TargetSetpointPopover'
import useTargetSetpoint from 'endpoint-model/property/targetSetpoint/useTargetSetpoint'

const TargetSetpointAvatar = props => {

    const { targetSetpoint, targetSetpointColor } = useTargetSetpoint(props.endpointId)
    const [ open, setOpen ] = useState(false)

    const togglePopover = () => { setOpen(!open) }

    const SetpointAvatar =  <Avatar color={targetSetpointColor} size={props.size} onClick={ props.noPopover ? undefined : togglePopover } >
                                {targetSetpoint}
                            </Avatar>

    if (props.noPopover) { return <SetpointAvatar /> }

    return (
        <TargetSetpointPopover
            opened = { open }
            setOpen = { setOpen }
            endpointId = { props.endpointId }
            target = {  <SetpointAvatar /> }
        />
    );
}

export default TargetSetpointAvatar;
