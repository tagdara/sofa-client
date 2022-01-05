import React from 'react';
import ModeSelect from "device-model/controller/ModeController/ModeSelect";
import { Group, Text } from '@mantine/core';
import { friendlyNameByEndpointId } from 'store/deviceHelpers'

const Matrix = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    //const on = matrixState.Input.mode.value !== 'Blank'
        
    return (
        <Group position="apart" noWrap style={{ width: "100%"}}>
            <Text lineClamp={1} size="sm">{ name }</Text>
            <ModeSelect half instance={"Input"} endpointId={props.endpointId} />
        </Group>
    );
}

export default Matrix;

