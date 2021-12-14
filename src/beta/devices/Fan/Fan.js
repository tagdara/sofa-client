import React from 'react';
import CardLine from 'beta/components/CardLine'
import { directive } from 'store/directive'
import { Switch } from '@mantine/core'
import { FaFan as FanIcon } from "react-icons/fa";
import { useRegister } from 'store/useRegister'

const Fan = props => {

    const { device, deviceState } = useRegister(props.endpointId)

    if (!deviceState) { return null }

    function handlePowerChange(event) {
        directive(props.endpointId, "PowerController", event.target.checked ? 'TurnOn' : 'TurnOff')
    }; 

    const on = deviceState.PowerController.powerState.value === 'ON'

    return (    
        <CardLine  size={"lg"}  icon={ props.icon ? props.icon : <FanIcon size={20} />}
                    primary={ device.friendlyName } 
        >
            <Switch color="primary" checked={ on } onChange={ handlePowerChange } />
        </CardLine>
    )
}

export default Fan;


