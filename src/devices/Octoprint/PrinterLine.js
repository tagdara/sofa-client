import React, { useState } from 'react';
import { ActionIcon } from '@mantine/core'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import { CloudSlash, Layers } from "react-bootstrap-icons";
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'
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
                        { reachable ? <Layers size={24} /> : <CloudSlash size={16} /> }
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
