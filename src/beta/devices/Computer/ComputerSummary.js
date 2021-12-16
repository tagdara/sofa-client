import React, { useEffect } from 'react';
import PlaceholderCard from 'beta/layout/PlaceholderCard';
import useDeviceStateStore from 'store/deviceStateStore'
import { register, unregister } from 'store/deviceHelpers'
import { compareState } from 'store/deviceHelpers'
import { Avatar, Group, Text, useMantineTheme } from '@mantine/core'
import { HardDrive } from 'react-feather'

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

    console.log('e', endpointIds)

    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function deviceCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var devState = states[dev]
            var energylevel = (devState["Energy Level"] ? devState["Energy Level"].mode.value : "Off")
            if (devState) {
                switch (condition.toUpperCase()) {
                    case "OFF":
                        if (energylevel === "Standby" ) {
                            count=count+1
                        }
                        break;
                    case "ON":
                        if (energylevel !== "Standby" ) {
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

    const iconColor = deviceCount('on') > 0 ?  theme.colors[theme.primaryColor] : undefined
    const labelText = deviceCount('on') === 1 ? deviceCount('on')+" computer on" : deviceCount('on')+" computers on"

    return (
        <Group position="apart" noWrap>
            <Group noWrap>
                <Avatar size="lg" color={iconColor}>
                    { <HardDrive size={20} />}
                </Avatar>     
                <Text size="lg" weight={500} style={{width: "100%"}} lineClamp={1}>{ deviceCount('on') ? labelText : "All computers off" }</Text>
            </Group>
        </Group>
    );
}

export default ComputerSummary;
