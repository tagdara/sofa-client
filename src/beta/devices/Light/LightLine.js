import React, { useState, useEffect } from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { CloudOff, X as XIcon } from 'react-feather'
import { ActionIcon, Switch, Group, Text} from '@mantine/core';
import LightPopover from 'beta/devices/Light/LightPopover'

import useDeviceStateStore from 'store/deviceStateStore'
import { directive } from 'store/directive'
import { deviceByEndpointId, isReachable, register, unregister } from 'store/deviceHelpers'

const LightLine = props => {

    const [showPopover, setShowPopover] = useState(props.showAll)
    //const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    const light = deviceByEndpointId(props.endpointId)
    const lightState = useDeviceStateStore( state => state.deviceStates[props.endpointId] )

    useEffect(() => {
        register(props.endpointId, "Light"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "Light"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [props.endpointId])

    function handlePowerChange(event) {
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    const name = light ? light.friendlyName : "Unknown"
    const reachable = isReachable(lightState)
    const on = lightState && lightState.PowerController.powerState.value === 'ON'

    function filtered(filter) {
        
        filter = filter ? filter.toUpperCase() : "TRUE"
        switch (filter) {
            case "ON":
                if (on && reachable) {
                    return false
                }
                break;
            case "OFF":
                if (!lightState || !on || !reachable) {
                    return false
                }
                break;
            default:
                return false     
        }
        return true
    }

    if (!lightState || filtered(props.filter)) { 
        return null 
    }

    return (
        <Group noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }}>
            <LightPopover   open={ showPopover } 
                            light={ lightState }
                            endpointId = {props.endpointId}
                            setOpen={ setShowPopover }
                            target={
                                <ActionIcon onClick={ () => setShowPopover(!showPopover) }>
                                    { reachable ? <Lightbulb size={20} /> : <CloudOff size={16} /> }
                                </ActionIcon>
                            } 
            />
            <Group direction="column" spacing={0} grow style={{ flexGrow: 1 }}>
                <Text lineClamp={1} size="lg" weight={400} style={{ flexGrow: 1 }}>
                    {name} 
                </Text>
                <Text color="dimmed" size="md" lineClamp={1}>
                    {reachable ? null : 'Off at switch' }
                </Text>
            </Group>
            { (reachable && !props.remove ) &&
                <Switch checked={lightState.PowerController.powerState.value==='ON'} 
                        onChange={handlePowerChange} onClick={stopEventPropagation} />
            }
            { props.remove && 
                <ActionIcon size="small" onClick={()=>props.remove(props.device)} >
                    <XIcon />
                </ActionIcon>
            }
        </Group>            
    )
}

export default LightLine;
