import React from 'react';
import { Group, Image, Text, ActionIcon } from '@mantine/core'
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import PowerStateSwitch from 'device-model/property/powerState/PowerStateSwitch'
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import { ArrowUpRightSquare as Link } from "react-bootstrap-icons";
import StackCard from 'components/StackCard'

const PrinterLine = props => {

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
        <Group position="apart" noWrap onClick={props.onClick}>
            <Group noWrap>
                <Image 
                    radius="sm"
                    height={56}
                    width={74}
                    src={ streamUrl }
                    title={ name }
                    alt={ name }
                    onClick={ (e) => props.cover(e)}
                />   
                <Text size="md" style={{width: "100%"}} lineClamp={1}>{ name }</Text>
            </Group>
            <Group noWrap>
                <ActionIcon onClick={ () => openOctoPrint() }>
                    <Link size={20} />
                </ActionIcon>
                <PowerStateSwitch endpointId={endpointId} />
            </Group>
        </Group>
        </StackCard>
    );
}

export default PrinterLine;
