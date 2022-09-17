import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import { Button } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers';
import { Monitor } from 'react-feather'

const MatrixConflict = props => {
    
    const name = friendlyNameByEndpointId(props.endpointId)
    const { mode, setMode } = useMode(props.endpointId, 'Output.Source')
    const on = mode === props.source

    if (!on) { return null }

    return (
        <Button fullWidth onClick={ () => setMode('Source.I8') } leftIcon={<Monitor size={16} />}
                variant = { "light"}
        >
            Turn off {name} monitor 
        </Button>
    );
}

export default MatrixConflict;
