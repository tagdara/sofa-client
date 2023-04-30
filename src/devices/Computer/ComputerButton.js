import React from 'react';
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useMode from 'endpoint-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { IconDevicesPc,IconDevicesPcOff } from '@tabler/icons';
import usePullUp from 'layout/pullup/usePullUp'
import ComputerPullUp from 'devices/Computer/ComputerPullUp'
import { ActionIcon, Stack, Text} from '@mantine/core';

const ComputerButton = props => {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { showPullUp } = usePullUp(name)

    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy.Level", props.value, props.directive)

    const outletOffStates = [undefined, "Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn

    if (props.dualBootMode === "secondary" && !on) { return null }

    return (
        <>
            <ActionIcon
                color="primary"
                onClick={ showPullUp }
                radius={"md"}
                size="xl"
                style={{ 
                    height: 52,
                    display: "flex",
                    flexGrow: 1,
                    width: "100%",
                }}
                variant={ outletOn ? "light" : "default" }
            >
                <Stack spacing={1} style={{ alignItems: "center"}}>
                    { on ? <IconDevicesPc size={24} /> : <IconDevicesPcOff size={24} />}
                    <Text size="xs">{name}</Text>

                </Stack>
                </ActionIcon>
            <ComputerPullUp name={name} endpointId={props.endpointId} outlet={props.outlet}/>
        </>
    )

}

export default ComputerButton;
