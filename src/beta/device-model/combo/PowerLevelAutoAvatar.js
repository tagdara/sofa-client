import React, { useState } from 'react';
import usePowerLevel from 'beta/device-model/property/powerLevel/usePowerLevel'
import { Avatar } from '@mantine/core';
import PowerLevelAutoPopover from 'beta/device-model/combo/PowerLevelAutoPopover'
import useToggleState from 'beta/device-model/property/toggleState/useToggleState'

const PowerLevelAutoAvatar = props => {
    
    const { powerLevel, powerLevelLabel } = usePowerLevel(props.endpointId)
    const { toggleStateBool } = useToggleState(props.endpointId, props.instance)

    const [ open, setOpen ] = useState(false)
    const togglePopover = () => { setOpen(!open) }

    if (!powerLevel ) { return null }

    const levelAvatar =  <Avatar size={props.size}>
                            <div    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 8 }} 
                                    onClick={ props.noPopover ? undefined : togglePopover } 
                            >
                                <span style={{ fontSize: toggleStateBool ? 10 : 14 }}>{ toggleStateBool ? 'AUTO' : powerLevelLabel }</span>
                                <span style={{ fontSize: 10, fontWeight: 400 }}>{ props.label }</span>
                            </div>
                        </Avatar>

    if (props.noPopover) { return levelAvatar }

    return (
        <PowerLevelAutoPopover
            opened = { open }
            setOpen = { setOpen }
            endpointId = { props.endpointId }
            target = {  levelAvatar }
            instance = {props.instance}
        />
    );
}

export default PowerLevelAutoAvatar
