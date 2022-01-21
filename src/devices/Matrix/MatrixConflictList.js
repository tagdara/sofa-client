import React from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import MatrixConflict from 'devices/Matrix/MatrixConflict';
import useMode from 'device-model/property/mode/useMode'
import { Group } from '@mantine/core';
export default function MatrixConflictList(props) {

    const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))
    const { mode } = useMode(props.endpointId, 'Input')
    const otherMatrix = matrix.filter( item => item !== props.endpointId)

    return (
        <Group direction="column">
            { otherMatrix.map(device =>
                <MatrixConflict key={ device } endpointId={device} input={mode} />
            )}
        </Group>
    )
}
