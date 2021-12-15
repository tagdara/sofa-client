import React, { useState } from 'react';
import { Avatar } from '@mantine/core';
import { useRegister } from 'store/useRegister'
import TargetSetpointPopover from 'beta/device-model/property/targetSetpoint/TargetSetpointPopover'

const TargetSetpointAvatar = props => {

    const { deviceState } = useRegister(props.endpointId)
    const [ open, setOpen ] = useState(false)

    if (!deviceState) { return null }

    //const doubleSetpoint = deviceState.ThermostatController.hasOwnProperty('upperSetpoint')
    //const setpoint = doubleSetpoint ? (( deviceState.ThermostatController.lowerSetpoint.deepvalue + deviceState.ThermostatController.upperSetpoint.deepvalue ) /2) : deviceState.ThermostatController.targetSetpoint.deepvalue
    const setpoint = deviceState.ThermostatController.targetSetpoint.deepvalue

    const tempColor = ( temp ) => {
        switch (true) {
            case (!temp):
                return 'gray'
            case (temp < 70): 
                return 'teal'
            case (temp < 75): 
                return 'green'
            case (temp < 90): 
                return 'orange'
            case (temp < 200): 
                return 'red'
            default:
                return 'gray'
        }
    }
    
    const changeSetpoint = val => {

    }

    const temperatureColor = tempColor(setpoint)

    return (
        <TargetSetpointPopover
            change = { changeSetpoint }
            setpoint = { setpoint}
            opened = { open }
            setOpen = { setOpen }
            endpointId = { props.endpointId }
            target = {  <Avatar size={props.size} 
                                color={temperatureColor} 
                                onClick={() => setOpen(!open)}
                        >
                            { setpoint }
                        </Avatar> }
        />
    );
}

export default TargetSetpointAvatar;
