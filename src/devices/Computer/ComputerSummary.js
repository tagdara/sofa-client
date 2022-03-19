import React, { useEffect } from 'react';
import PlaceholderCard from 'layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore';
import { register, unregister } from 'store/deviceHelpers'
import { compareState } from 'store/deviceHelpers'
import {  Group, Text, useMantineTheme } from '@mantine/core'
import { PcDisplayHorizontal as Pc } from "react-bootstrap-icons";
import WideAvatar from 'components/WideAvatar'
import ComputerOnList from 'devices/Computer/ComputerOnList'

const ComputerSummary = props => {

    const theme = useMantineTheme()
    const endpointIds = props.endpointIds
    const states = useDeviceStateStore(state => Object.fromEntries(endpointIds.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))

    useEffect(() => {
        register( endpointIds, "ComputerSummary")
        return function cleanup() {
            unregister( endpointIds, "ComputerSummary")
        };
    // eslint-disable-next-line 
    }, [])

    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function deviceCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var devState = states[dev]
            var energylevel = (devState["Energy Level"] ? devState["Energy Level"].mode.value : "Off")

            if (devState) {
                switch (condition.toUpperCase()) {
                    case "OFF":
                        if (energylevel === "Energy Level.Standby" ) {
                            count=count+1
                        }
                        break;
                    case "ON":
                        if (energylevel !== "Energy Level.Standby" ) {
                            count=count+1
                        } 
                        break;                   
                    default:
                        count = count + 1
                        break;
                }
            }
        }
        return count
    }

    const anyOn = deviceCount('on') > 0
    const iconColor = anyOn ?  theme.colors[theme.primaryColor] : undefined

    return (
        <Group position="apart" noWrap onClick={props.onClick}>
            <Group noWrap style={{ width: "100%"}}>
                <WideAvatar color={iconColor} 
                    size="lg"
                    left={ < Pc size={20} /> } 
                    right={ anyOn ? deviceCount('on') : undefined }
                />    
                <Group direction="column" spacing={"xs"} style={{ width: "100%"}} >
                    <Text   size={ anyOn ? "sm" : "lg" }
                            weight={500} 
                            style={{width: "100%"}} 
                            lineClamp={1}
                    >
                        { anyOn ? "Computers are on" : "All computers off" } 
                    </Text>
                    <ComputerOnList />
                </Group>            
            </Group>
        </Group>
    );
}

export default ComputerSummary;
