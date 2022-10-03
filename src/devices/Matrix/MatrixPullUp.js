import React from 'react';
import { Stack } from '@mantine/core'
import PullUpCard from 'layout/pullup/PullUpCard'
import MatrixLine from 'devices/Matrix/MatrixLine';
import { matrixDefaults, matrixManualSort } from 'devices/Matrix/matrixSettings'

const MatrixPullUp = props => {

    return (  
        <PullUpCard title={"Matrix"} name={"matrix"}>
            <Stack spacing={"lg"} width={"100%"}>
                { matrixManualSort.map(device =>
                    <MatrixLine key={ device } endpointId={device} default={ matrixDefaults[device] } nested={true} itemType={"listItem"} />
                )}
            </Stack>
        </PullUpCard>
    )

}

export default MatrixPullUp;
