import React from 'react';
import { directive } from 'endpoint-model/directive/directive'
import { ActionIcon } from '@mantine/core'
import { IconRefresh, IconStack, IconSquareOff } from '@tabler/icons';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { useRegister } from 'endpoint-model/register/useRegister'
import dayjs from 'dayjs';

export default function AdapterItem(props) { 


    const { device, deviceState } = useRegister(props.endpointId)
    if (!deviceState) { console.log('dead adapter', props.endpointId); return null }

    function getErrorState(count) {
        try {

            if (deviceState.PowerController.powerState.value==='OFF') {
                return 'gray'
            }
            
            if (deviceState.AdapterHealth.hasOwnProperty('errors')) {
                if (deviceState.AdapterHealth.errors.value > count) {
                    return 'red'
                } else {
                    return 'green'
                }
            } else {
                return 'gray'
            }
        }
        catch {
            return 'gray'
        }
    }


    function getStartupDate() {
        try {
            if (deviceState.AdapterHealth.startup.value) {
                if (deviceState.AdapterHealth.startup.value==="Remote") { return "Remote" }
                return dayjs(deviceState.AdapterHealth.startup.value).format("ddd MMM D h:mm:sa")
            }
        } 
        catch {}
        return "Not started"
    }


    function getActiveState() {
        try {
            if (deviceState.ServiceController.activeState.value!=="unknown") {
                return " ("+deviceState.ServiceController.activeState.value+")"
            }
        }
        catch {}
        return ""
    }

    return (
        <SplitButtonGroup>
            <SplitButton >
                <ActionIcon color={ getErrorState(5) } onClick={ () => directive(props.endpointId, "PowerController", 'TurnOn')} >
                    <IconStack size={20} />
                </ActionIcon>               
            </SplitButton>
            <SplitButton  label={ device.friendlyName + getActiveState() } secondary={ getStartupDate() } />
            { getStartupDate()!=='Remote' && 
                <SplitButton>
                    <ActionIcon onClick={ () => directive(props.endpointId, "PowerController", 'TurnOn')} >
                        <IconRefresh size={20} />
                    </ActionIcon>
                    <ActionIcon onClick={ () => directive(props.endpointId, "PowerController", 'TurnOff')} >
                        <IconSquareOff size={16} />
                    </ActionIcon>
                </SplitButton>
            }
        </SplitButtonGroup>
    );
}

