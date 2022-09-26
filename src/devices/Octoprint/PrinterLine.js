import React, { useState } from 'react';
import { ActionIcon } from '@mantine/core'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import PowerStateSwitch from 'endpoint-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'endpoint-model/discovery'
import { IconCloudOff, Icon3dCubeSphere } from '@tabler/icons';
import { SplitButtonGroup, SplitButton } from 'layout/components/SplitButton'
import PrinterCam from 'devices/Octoprint/PrinterCam'
import PrinterLink from 'devices/Octoprint/PrinterLink'

const PrinterLine = props => {

    const [ zoom, setZoom] = useState(false)
    const name = "3D Printer"
    const endpointId = endpointIdByFriendlyName(name)
    const { reachable } = useEndpointHealth(endpointId)
    const { powerStateBool } = usePowerState(endpointId)
    const on = powerStateBool

    if ( props.hideOff & ( !reachable || !powerStateBool)) { return null }

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >  
                { on ?
                    <PrinterCam zoom={zoom} setZoom={setZoom} />
                :
                    <ActionIcon size="md" color={ on ? "primary" : undefined }>
                        { reachable ? <Icon3dCubeSphere size={24} /> : <IconCloudOff size={16} /> }
                    </ActionIcon>
                }
            </SplitButton>
            <SplitButton    label = { name } 
                            secondary = { reachable ? null : 'Not reachable' }
                            on={on}
            />
            <SplitButton>
                <PrinterLink />
                <PowerStateSwitch endpointId={endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )

}

export default PrinterLine;
