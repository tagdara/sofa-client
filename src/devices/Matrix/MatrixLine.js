import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import useMode from 'endpoint-model/property/mode/useMode'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import { ThemeIcon } from '@mantine/core';
import ModeLine from 'endpoint-model/property/mode/ModeLine'
import { IconCloudOff, IconDeviceDesktop, IconDeviceDesktopOff } from '@tabler/icons';

const MatrixLine = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { mode, setMode } = useMode(props.endpointId, "Output.Source", props.value, props.directive)

    const blank = "Source.I8"
    const on = mode !== blank

    const toggleInput = () => { 
        if (on) { 
            setMode(blank)
        } else {
            setMode(props.default) 
        } 
    }

    return (
        <ModeLine 
            icon={
                <ThemeIcon size="md" variant={ on ? "filled" : "default"} onClick={toggleInput}>
                    { reachable ? ( on ? <IconDeviceDesktop size={16} /> : <IconDeviceDesktopOff size={16} /> ) : <IconCloudOff size={16} /> }
                </ThemeIcon>
            }
            label={name}
            labelWidth={"60%"}
            endpointId={props.endpointId} 
            size="sm"
            instance={"Output.Source"}
        />
    );
}

export default MatrixLine;

