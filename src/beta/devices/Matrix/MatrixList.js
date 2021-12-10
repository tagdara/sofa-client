import React from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import Matrix from 'beta/devices/Matrix/Matrix';
import { Group } from '@mantine/core';
export default function MatrixList(props) {

    const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))

    return (
        <Group direction="column">
            { matrix.map(device =>
                <Matrix key={ device } endpointId={device} nested={true} itemType={"listItem"} />
            )}
        </Group>
    )
}
