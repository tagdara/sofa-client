import React, { useState } from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { CloudOff, X as XIcon } from 'react-feather'
import { ActionIcon, Switch } from '@mantine/core';
import LightPopover from 'devices/Light/LightPopover'
import { directive } from 'store/directive'
import { isReachable } from 'store/deviceHelpers'
import { useRegister } from 'store/useRegister'
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import useDisplayValue from 'helpers/useDisplayValue'

const LightLine = props => {

    const [showPopover, setShowPopover] = useState(props.showAll)
    const { device, deviceState } = useRegister(props.endpointId)
    const name = device ? device.friendlyName : "Unknown"
    const reachable = isReachable(deviceState)
    const on = deviceState && deviceState.PowerController.powerState.value === 'ON'
    const { displayValue, change } = useDisplayValue( on, applyPowerChange )

    function applyPowerChange(val) {
        directive(props.endpointId, 'PowerController', val ? 'TurnOn' : 'TurnOff')
    }; 

    //function handlePowerChange(event) {
    //    directive(props.endpointId, 'PowerController', event.target.checked ? 'TurnOn' : 'TurnOff')
    //}; 

    function stopEventPropagation(event) {
        // switches use onChange but onClick needs to also be blocked for nested items
        event.stopPropagation()
    }

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
        <SplitButtonGroup on={on}>
            <SplitButton >
                <LightPopover   
                    open={ showPopover } 
                    light={ deviceState }
                    endpointId = {props.endpointId}
                    setOpen={ setShowPopover }
                    target={            
                        <ActionIcon size="md" color={ on ? "primary" : undefined } onClick={ () => setShowPopover(!showPopover) }>
                            { reachable ? <Lightbulb size={20} /> : <CloudOff size={16} /> }
                        </ActionIcon>
                    }     
                />
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Off at switch' }
                            on={on}
            />
            <SplitButton>
                { (reachable && !props.remove ) &&
                    <Switch checked={displayValue} 
                            onChange={change} onClick={stopEventPropagation} 
                    />
                }
                { props.remove && 
                    <ActionIcon size="small" onClick={()=>props.remove(props.device)} >
                        <XIcon />
                    </ActionIcon>
                }
            </SplitButton>
        </SplitButtonGroup>
    )
}

export default LightLine;
