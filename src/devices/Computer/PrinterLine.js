import React from 'react';
import { Image, ActionIcon } from '@mantine/core'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import { ArrowUpRightSquare as Link, CloudSlash, Layers } from "react-bootstrap-icons";
import { SplitButtonGroup, SplitButton } from 'components/SplitButton'

const PrinterLine = props => {

    const name = "3D Printer"
    const endpointId = endpointIdByFriendlyName(name)
    const { reachable } = useEndpointHealth(endpointId)
    const { powerStateBool } = usePowerState(endpointId)
    const serverUrl = "http://octoprint.dayton.tech"
    const streamUrl = serverUrl + "/webcam/?action=stream"
    const on = powerStateBool

    if ( props.hideOff & ( !reachable || !powerStateBool)) { return null }

    function openOctoPrint() {
        var tabname="_octoprint"
        window.open(serverUrl,tabname);
    }

    return (
        <SplitButtonGroup on={on}>
            <SplitButton >  
                { on ?
                    <Image 
                        radius="sm"
                        height={56}
                        width={74}
                        src={ streamUrl }
                        title={ name }
                        alt={ name }
                        onClick={ (e) => props.cover(e)}
                    />
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
                <ActionIcon onClick={ () => openOctoPrint() }>
                    <Link size={20} />
                </ActionIcon>
                <PowerStateSwitch endpointId={endpointId} />
            </SplitButton>
        </SplitButtonGroup>
    )

}

export default PrinterLine;
