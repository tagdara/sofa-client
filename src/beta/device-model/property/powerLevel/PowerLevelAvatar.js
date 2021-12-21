import React, { useState } from 'react';
import usePowerLevel from 'beta/device-model/property/powerLevel/usePowerLevel'
import { Avatar } from '@mantine/core';
import PowerLevelPopover from 'beta/device-model/property/powerLevel/PowerLevelPopover'

const PowerLevelAvatar = props => {
    
    const { powerLevel, powerLevelLabel } = usePowerLevel(props.endpointId)
    const [ open, setOpen ] = useState(false)
    const togglePopover = () => { setOpen(!open) }

    if (!powerLevel ) { return null }

    const levelAvatar =  <Avatar>
                            <div    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 8 }} 
                                    onClick={ props.noPopover ? undefined : togglePopover } 
                            >
                                <span style={{ fontSize: 14 }}>{ powerLevelLabel }</span>
                                <span style={{ fontSize: 10, fontWeight: 400 }}>{ props.label }</span>
                            </div>
                        </Avatar>

    if (props.noPopover) { return levelAvatar }

    return (
        <PowerLevelPopover
            opened = { open }
            setOpen = { setOpen }
            endpointId = { props.endpointId }
            target = {  levelAvatar }
        />
    );
}

export default PowerLevelAvatar
