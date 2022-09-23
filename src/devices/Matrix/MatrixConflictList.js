import React from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'endpoint-model/discovery'
import MatrixConflict from 'devices/Matrix/MatrixConflict';
import useMode from 'endpoint-model/property/mode/useMode'
import { Stack } from '@mantine/core';
export default function MatrixConflictList(props) {

    const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))
    const { mode } = useMode(props.endpointId, 'Output.Source')
    const otherMatrix = matrix.filter( item => item !== props.endpointId)

    return (
        <Stack>
            { otherMatrix.map(device =>
                <MatrixConflict key={ device } endpointId={device} source={mode} />
            )}
        </Stack>
    )
}
