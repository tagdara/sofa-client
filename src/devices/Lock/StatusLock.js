import React, { useState } from 'react';
import CardLine from 'layout/components/CardLine';
import { directive } from 'endpoint-model/directive/directive'
import { AlertTriangle, Tablet } from 'react-feather'
import PlaceholderCard from 'layout/PlaceholderCard';
import { Button, Group, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegister } from 'endpoint-model/register'

export default function StatusLock(props) {

    const pin= "7818";
    const [ showPin, setShowPin ] = useState(false);

    const { device, deviceState} = useRegister(props.endpointId)
    const name = props.displayName ? props.displayName : props.deviceName 
    const buttonDuration = props.buttonDuration ? props.buttonDuraion : 1

    const form = useForm({
        initialValues: {
            password: ''
        },

        validationRules: {
            password: (value) => value.length === 4,
        },
    });
    
    if (!deviceState) {
        return <PlaceholderCard count={ 1 } />
    }

    const sensorController = getSensorController()

    if (!sensorController) {
        return null
    }

    function getSensorController() {
        // console.log('sensor ', props.device, props.deviceState)
        if (deviceState.hasOwnProperty('ContactSensor')) {
            return deviceState.ContactSensor
        } else if (device.hasOwnProperty('MotionSensor')) {
            return deviceState.MotionSensor
        }
        return null
    }

    const closed = sensorController.detectionState.value==='NOT_DETECTED'

    function pinCheck(trypin) {
        if (trypin === pin) {
            setShowPin(false)
            directive(props.endpointId, "ButtonController", "Hold", {"duration": buttonDuration})
        }
    }
    
    function handlePress() {
        if (!showPin) {
            props.setCamera( device.endpointId)
        }
        setShowPin(!showPin)
    }
     
    return (
        <Stack grow>
            <CardLine onClick={handlePress} 
                        avatar={closed ? <Tablet size={20} /> : <AlertTriangle size={20} /> } 
                        color={ closed ? 'green' : 'red'}
                        primary={name} 
                        secondary={ closed ? 'Closed' : 'Open' }
            />
            { showPin && 
                <form onSubmit={form.onSubmit((values) => pinCheck(values.password))}>
                    <Group noWrap grow style={{ alignItems: "flex-end", width: "100%"}} >
                        <PasswordInput  required
                                                size="sm" 
                                                label="PIN" 
                                                placeholder="4 digits" 
                                                {...form.getInputProps('password')} 
                                                maxLength={4}
                                                inputMode='numeric'
                                                pattern='[0-9]*'
                        />
                        <Button style={{ flexGrow: 0 }} type = "submit">
                            Go
                        </Button>
                    </Group>
                </form>
            }
        </Stack>
    );

}