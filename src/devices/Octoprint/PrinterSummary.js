import React, { useState } from 'react';
import { Group, Text } from '@mantine/core'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import StackCard from 'layout/components/StackCard'
import PrinterCam from 'devices/Octoprint/PrinterCam'
import PrinterLink from 'devices/Octoprint/PrinterLink'

const PrinterLine = props => {

    const [ zoom, setZoom] = useState(false)
    const name = "3D Printer"
    const endpointId = endpointIdByFriendlyName(name)
    const { reachable } = useEndpointHealth(endpointId)
    const { powerStateBool } = usePowerState(endpointId)
    
    console.log('printer', reachable, powerStateBool, endpointId)

    if ( props.hideOff & ( !reachable || !powerStateBool)) { return null }

    return (
        <StackCard>
        <Group position="apart" noWrap>
            <Group noWrap={!zoom} style={{width: "100%"}} >
                <PrinterCam zoom={zoom} setZoom={setZoom} />
                <Group position="apart" noWrap style={{width: "100%"}} onClick={props.onClick}>   
                    <Text size="md" style={{width: "100%"}} lineClamp={1} onClick={props.onClick}>{ name }</Text>
                    <Group noWrap>
                        <PrinterLink />
                        {!props.hideOff && <PowerStateSwitch endpointId={endpointId} /> }
                    </Group>
                </Group>
            </Group>
        </Group>
        </StackCard>
    );
}

export default PrinterLine;
