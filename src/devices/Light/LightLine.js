import React, { useState } from 'react';
import { IconCloudOff, IconBulb, IconX } from '@tabler/icons';
import { ActionIcon, Button } from '@mantine/core';
import LightPopover from 'devices/Light/LightPopover'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'

const LightLine = props => {

    const [showPopover, setShowPopover] = useState(props.showAll)
    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)

    const on = reachable && powerStateBool

    function filtered(filter) {

        filter = filter ? filter.toUpperCase() : "TRUE"
        
        switch (filter) {
            case "ON":
                if (on) {
                    return false
                }
                break;
            case "OFF":
                if (!on) {
                    return false
                }
                break;
            default:
                return false     
        }
        return true
    }

    const filteredResult = filtered(props.filter)

    if ( filteredResult ) { return null }

    return (
        <Button.Group buttonBorderWidth={0} style={{ maxWidth: "100%", width: "100%", border: "none"}}>
            <LightPopover   
                endpointId = {props.endpointId}
                open={ showPopover } 
                setOpen={ setShowPopover }
                target={   
                    <Button 
                        size="md"
                        styles={{ 
                            root: {
                                border: 0,
                                display: "flex",
                                justifyContent: "flex-start",
                                paddingLeft: 16,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            },
                            leftIcon: {
                                marginRight: 24,
                            },
                        }}
                        variant={ on ? "light" : "default" }
                        fullWidth 
                        leftIcon={ reachable ? <IconBulb size={20} /> : <IconCloudOff size={16} /> }
                        onClick={ () => setShowPopover(!showPopover) }
                    >
                        { name }
                    </Button>         
                    }     
                />

            <Button 
                styles={{ 
                    root: {
                        border: 0
                    }
                }}
                size="md" 
                variant={ on ? "light" : "default" }
            >
                { props.remove ?
                    <ActionIcon size="small" onClick={ () => props.remove(props.endpointId) } >
                        <IconX />
                    </ActionIcon>                
                :
                    <PowerStateSwitch endpointId={props.endpointId} />
                }
            </Button>
        </Button.Group>
    )
}

export default LightLine;
