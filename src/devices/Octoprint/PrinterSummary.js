import React from 'react';
import { Group, Text } from '@mantine/core'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import StackCard from 'layout/components/StackCard'
import PrinterCam from 'devices/Octoprint/PrinterCam'
import usePullUp from 'layout/pullup/usePullUp'
import PrinterSheet from 'devices/Octoprint/PrinterSheet'

const PrinterLine = props => {

    const { pullUpActive, showPullUp } = usePullUp('3dprinter')
    const name = "3D Printer outlet"
    const lightName = "3D Printer Light outlet"
    const displayName = "3D Printer"
    const endpointId = endpointIdByFriendlyName(name)
    const lightEndpointId = endpointIdByFriendlyName(lightName)
    const { reachable } = useEndpointHealth(endpointId)
    const { powerStateBool } = usePowerState(endpointId)
    
    if ( props.hideOff & ( !reachable || !powerStateBool)) { return null }

    return (
        <StackCard>
        <Group position="apart" noWrap onClick={ showPullUp }>
            <Group noWrap style={{width: "100%"}} >
                <PrinterCam />
                <Group position="apart" noWrap style={{width: "100%"}} >   
                    <Text size="md" style={{width: "100%"}} lineClamp={1}>{ displayName }</Text>
                </Group>
            </Group>
        </Group>
        <PrinterSheet endpointId={endpointId} lightEndpointId={lightEndpointId} opened={pullUpActive}/>
        </StackCard>
    );
}

export default PrinterLine;
