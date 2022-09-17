import React from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import MatrixConflict from 'devices/Matrix/MatrixConflict';
import useMode from 'device-model/property/mode/useMode'
import { Stack } from '@mantine/core';
export default function MatrixConflictList(props) {

    const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))
    const { mode } = useMode(props.endpointId, 'Output.Source')
    const otherMatrix = matrix.filter( item => item !== props.endpointId)

    console.log('mode', props.endpointId, mode)

    return (
        <Stack>
            { otherMatrix.map(device =>
                <MatrixConflict key={ device } endpointId={device} source={mode} />
            )}
        </Stack>
    )
}
