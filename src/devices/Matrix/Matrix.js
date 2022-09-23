import React from 'react';
import ModeSelect from 'endpoint-model/property/mode/ModeSelect'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useMode from 'endpoint-model/property/mode/useMode'
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import { CloudOff, Monitor } from 'react-feather'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import { ActionIcon, Group } from '@mantine/core';

const Matrix = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { mode, setMode } = useMode(props.endpointId, "Output.Source", props.value, props.directive)

    const blank = "Source.I8"
    const on = mode !== blank

    console.log('xxmode',mode)

    const toggleInput = () => { 
        if (on) { 
            setMode(blank)
        } else {
            setMode(props.default) 
        } 
    }

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >  
                <ActionIcon size="md" color={ on ? "primary" : undefined } onClick={toggleInput}>
                    { reachable ? <Monitor size={20} /> : <CloudOff size={16} /> }
                </ActionIcon>
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Not reachable' }
                            on={on}
            />
            <SplitButton >
                <Group grow noWrap spacing={0}>
                    <ModeSelect half size="xs" instance={"Output.Source"} endpointId={props.endpointId} />
                </Group>
            </SplitButton>
        </SplitButtonGroup>
    );
}

export default Matrix;

