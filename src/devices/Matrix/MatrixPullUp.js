import React from 'react';
import { Divider, Stack } from '@mantine/core'
import PullUpCard from 'layout/pullup/PullUpCard'
import MatrixLine from 'devices/Matrix/MatrixLine';
import { matrixDefaults, matrixManualSort } from 'devices/Matrix/matrixSettings'
import useMultiEndpointHealth from 'endpoint-model/multidevice/useMultiEndpointHealth'
import PowerStateLine from 'endpoint-model/property/powerState/PowerStateLine'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery';

const MatrixPullUp = props => {

    const name = "Matrix outlet"
    const matrixEndpointId = endpointIdByFriendlyName(name)
    const { onlineCount } = useMultiEndpointHealth(matrixManualSort)
    const offlineCount = matrixManualSort.length - onlineCount

    return (  
        <PullUpCard title={"Matrix"} name={"matrix"}>
            <Stack spacing={"lg"} width={"100%"}>
                { matrixManualSort.map(device =>
                    <MatrixLine key={ device } endpointId={device} default={ matrixDefaults[device] } nested={true} itemType={"listItem"} />
                )}
            </Stack>
            <Divider />
            <PowerStateLine icon label="Matrix Power" endpointId={matrixEndpointId} />            
        </PullUpCard>
    )

}

export default MatrixPullUp;
