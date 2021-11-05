import React, { useEffect } from 'react';
import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import LightChristmasButton from 'devices/Light/LightChristmasButton';

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'
import { compareState, endpointIdsByDisplayCategory } from 'store/deviceHelpers'

const LightSummary = props => {
    const lights = endpointIdsByDisplayCategory('LIGHT')
    const states = useDeviceStateStore(state => Object.fromEntries(lights.filter(key => key in state.deviceStates).map(key => [key, state.deviceStates[key]])), (oldState, newState) => compareState(oldState, newState))
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(lights, "LightSummary")
        return function cleanup() {
            unregister(lights, "LightSummary")
        };
    // eslint-disable-next-line 
    }, [])


    if (!states || Object.keys(states).length < 1) { return <PlaceholderCard /> }
    
    function lightCount(condition, source) {
        var count = 0;
        for (var dev in states) {
            var light = states[dev]
            if (light) {
                switch (condition.toUpperCase()) {
                    case "OFF":
                        if (light.PowerController.powerState.value === "OFF" || !isReachable(light)) {
                            count=count+1
                        }
                        break;
                    case "ON":
                        if (light.PowerController.powerState.value === "ON" && isReachable(light)) {
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

    function isReachable(dev) {
        try {
            if (dev.EndpointHealth.connectivity.value.value==='OK') {
                return true
            }
        }
        catch {}
        return false
    }

    function checkHoliday() {
        if (2==1) {
            return <LightChristmasButton />
        }
        return null
    }

    const labelText = lightCount('on') === 1 ? lightCount('on')+" light is on" : lightCount('on')+" lights are on"

    return (
        <>
        <SofaListItem   avatarState={lightCount('on') ? "on" : "off"} 
                        avatarClick={ props.onClick } 
                        labelClick={ props.onClick }
                        avatar={<LightbulbOutlineIcon/>} 
                        noPad={true}
                        primary={lightCount('on') ? labelText : "All lights off" }
                        inlineSecondary={true}
                        secondaryActions={ checkHoliday() }
        />
        </>
    );
}

export default LightSummary;
