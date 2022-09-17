import React, { useState } from 'react';
import { CloudSlash, Lightbulb, X as XIcon} from "react-bootstrap-icons"
import { ActionIcon, Button } from '@mantine/core';
import LightPopover from 'devices/Light/LightPopover'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
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

    const filteredResult = filtered(props.filter)

    if ( filteredResult ) { return null }

    return (
        <Button.Group buttonBorderWidth={0} style={{ width: "100%", border: "none"}}>
            <LightPopover   
                endpointId = {props.endpointId}
                open={ showPopover } 
                setOpen={ setShowPopover }
                target={   
                    <Button 
                        size="md"
                        styles={{ 
                            root: {
                                display: "flex",
                                justifyContent: "flex-start",
                                paddingLeft: 16,
                            },
                            leftIcon: {
                                marginRight: 24,
                            },
                        }}
                        variant={ on ? "light" : "default" }
                        fullWidth 
                        leftIcon={ reachable ? <Lightbulb size={20} /> : <CloudSlash size={16} /> }
                        onClick={ () => setShowPopover(!showPopover) }
                    >
                        { name }
                    </Button>         
                    }     
                />

            <Button size="md" variant={ on ? "light" : "default" }>
                { props.remove ?
                    <ActionIcon size="small" onClick={ () => props.remove(props.endpointId) } >
                        <XIcon />
                    </ActionIcon>                
                :
                    <PowerStateSwitch endpointId={props.endpointId} />
                }
            </Button>
        </Button.Group>
    )
}

export default LightLine;
