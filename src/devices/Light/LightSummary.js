import React, { useEffect } from 'react';
import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'
import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import SofaListItem from 'components/SofaListItem';
import PlaceholderCard from 'layout/PlaceholderCard';
import LightChristmasButton from 'devices/Light/LightChristmasButton';

const LightSummary = React.memo(props => {

    useEffect(() => {
        props.addEndpointIds("category", "LIGHT", "LightSummary")
        return function cleanup() {
            props.unregisterDevices("LightSummary");
        };
    // eslint-disable-next-line 
    }, [])

    if (!props.deviceState || Object.keys(props.deviceState).length < 1) { return <PlaceholderCard /> }
    
    function lightCount(condition, source) {
        var count = 0;
        for (var dev in props.deviceState) {
            var light = props.deviceState[dev]
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
        <SofaListItem   avatarState={lightCount('on') ? "on" : "off"} 
                        avatarClick={ props.onClick } 
                        labelClick={ props.onClick }
                        avatar={<LightbulbOutlineIcon/>} 
                        noPad={true}
                        primary={lightCount('on') ? labelText : "All lights off" }
                        inlineSecondary={true}
                        secondaryActions={ checkHoliday() }
        />
    );
}, deviceStatesAreEqual);

export default dataFilter(LightSummary);
