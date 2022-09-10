import React from 'react';
import { Paper, useMantineTheme, Text } from '@mantine/core';
import useEndpointHealth from 'device-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'device-model/property/powerState/usePowerState'
import useMode from 'device-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'store/deviceHelpers'
import WakeSleepSegment from 'device-model/controller/WakeOnLanController/WakeSleepSegment'
import EnergyLevelSegment from 'device-model/instance/EnergyLevelSegment'

const ComputerCube = props => {

    const theme = useMantineTheme()
    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy Level", props.value, props.directive)
    
    const modeColors = { 
        "Low": theme.colors[theme.primaryColor][9],
        "Medium": theme.colors[theme.primaryColor][8],
        "High": theme.colors[theme.primaryColor][7]
    }

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn

    function openMouse() {
        var newurl="https://mouse.dayton.tech?pc="+name+".dayton.tech"
        var safariWindow = window.open();
        safariWindow.location.href = newurl
    }

    const bgColor = on ? modeColors[modeLabel] : ( theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white)

    return (
        <Paper
            style={{    borderRadius: 4,
                        padding: 8,
                        display: "flex", 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        backgroundColor: bgColor, 
            }}
        >
            { on ?
                <EnergyLevelSegment small endpointId={props.outlet} instance={"Energy Level"} onClick={openMouse} />
                :
                <WakeSleepSegment small icon={on} color={bgColor} endpointId={props.endpointId} value={on ? "ON" : "OFF"} />
            }
            <Text size="xs" mt={7}>
                {name}
            </Text>
        </Paper>
    )
}

export default ComputerCube;
