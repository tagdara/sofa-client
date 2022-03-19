import React, { useState } from 'react';
import { Group, Image, Text, ActionIcon } from '@mantine/core'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import { ArrowUpRightSquare as Link } from "react-bootstrap-icons";
import StackCard from 'components/StackCard'

const PrinterLine = props => {

    const [ zoom, setZoom] = useState(false)
    const name = "3D Printer"
    const endpointId = endpointIdByFriendlyName(name)
    const { reachable } = useEndpointHealth(endpointId)
    const { powerStateBool } = usePowerState(endpointId)
    const serverUrl = "http://octoprint.dayton.tech"
    const streamUrl = serverUrl + "/webcam/?action=stream"

    if ( props.hideOff & ( !reachable || !powerStateBool)) { return null }

    function openOctoPrint() {
        var tabname="_octoprint"
        window.open(serverUrl,tabname);
    }

    return (
        <StackCard>
        <Group position="apart" noWrap>
            <Group noWrap={!zoom} style={{width: "100%"}} >
                <Image 
                    radius="sm"
                    height={zoom ? "auto" : 56}
                    width={zoom ? "100%" : 74}
                    src={ streamUrl }
                    title={ name }
                    alt={ name }
                    onClick={ (e) => setZoom(!zoom)}
                />
                <Group position="apart" noWrap style={{width: "100%"}} onClick={props.onClick}>   
                    <Text size="md" style={{width: "100%"}} lineClamp={1} onClick={props.onClick}>{ name }</Text>
                    <Group noWrap>
                        <ActionIcon onClick={ () => openOctoPrint() }>
                            <Link size={20} />
                        </ActionIcon>
                        {!props.hideOff && <PowerStateSwitch endpointId={endpointId} /> }
                    </Group>
                </Group>
            </Group>
        </Group>
        </StackCard>
    );
}

export default PrinterLine;
