import React, { useState } from 'react';
import { CloudSlash, Lightbulb, X as XIcon} from "react-bootstrap-icons"
import { ActionIcon } from '@mantine/core';
import LightPopover from 'devices/Light/LightPopover'
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'

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

    if ( filtered(props.filter) ) { 
        return null 
    }

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >
                <LightPopover   
                    endpointId = {props.endpointId}
                    open={ showPopover } 
                    setOpen={ setShowPopover }
                    target={            
                        <ActionIcon size="md" color={ on ? "primary" : undefined } onClick={ () => setShowPopover(!showPopover) }>
                            { reachable ? <Lightbulb size={20} /> : <CloudSlash size={16} /> }
                        </ActionIcon>
                    }     
                />
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Not reachable' }
                            on={on}
            />
            <SplitButton>
                { props.remove && 
                    <ActionIcon size="small" onClick={ () => props.remove(props.endpointId) } >
                        <XIcon />
                    </ActionIcon>
                }
                { !props.remove &&
                    <PowerStateSwitch endpointId={props.endpointId} />
                }
            </SplitButton>
        </SplitButtonGroup>
    )
}

export default LightLine;
