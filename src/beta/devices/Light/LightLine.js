import React, { useState } from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { CloudOff, X as XIcon } from 'react-feather'
import { ActionIcon, Switch, Group, Text} from '@mantine/core';
import LightPopover from 'beta/devices/Light/LightPopover'
import { directive } from 'store/directive'
import { isReachable } from 'store/deviceHelpers'
import { useRegister } from 'store/useRegister'

const LightLine = props => {

    const [showPopover, setShowPopover] = useState(props.showAll)
    const { device, deviceState } = useRegister(props.endpointId)

    function handlePowerChange(event) {
        directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

    //const expanded = showAll || props.brightControl || props.tempControl || props.colorControl
    const name = device ? device.friendlyName : "Unknown"
    const reachable = isReachable(deviceState)
    const on = deviceState && deviceState.PowerController.powerState.value === 'ON'

    function filtered(filter) {
        
        filter = filter ? filter.toUpperCase() : "TRUE"
        switch (filter) {
            case "ON":
                if (on && reachable) {
                    return false
                }
                break;
            case "OFF":
                if (!deviceState || !on || !reachable) {
                    return false
                }
                break;
            default:
                return false     
        }
        return true
    }

    if (!deviceState || filtered(props.filter)) { 
        return null 
    }

    return (
        <Group noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }}>
            <LightPopover   open={ showPopover } 
                            light={ deviceState }
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
                <Switch checked={deviceState.PowerController.powerState.value==='ON'} 
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
