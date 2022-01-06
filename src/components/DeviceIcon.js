import React from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { Grid, HelpCircle, List, Sliders, Speaker, Tag, Thermometer, ToggleRight, Triangle, Tv } from 'react-feather'
import { deviceByEndpointId } from 'store/deviceHelpers'
import { FaFan as FanIcon } from "react-icons/fa";

const DeviceIcon = props => {

    const icons = { 
        'FAN': FanIcon, 
        'MISSING': HelpCircle,
        'MODE': Tag,
        'SCENE_TRIGGER': Grid, 
        'ACTIVITY_TRIGGER': List, 
        'LIGHT': Lightbulb, 
        'LOGIC': Sliders,
        'BUTTON': ToggleRight, 
        'SPEAKER': Speaker, 
        'THERMOSTAT': Thermometer, 
        'TEMPERATURE_SENSOR': Thermometer, 
        'RECEIVER': Speaker, 
        'TV': Tv
    }

    function getIcon(category, size=20) {

        var RealIcon = Triangle
        if (icons.hasOwnProperty(category)) {
            RealIcon = icons[category]
        }
        return <RealIcon size={size} />
    }

    if (props.displayCategories) {
        return getIcon(props.displayCategories, props.size)
    }
    
    if (props.endpointId) {
        const device = deviceByEndpointId(props.endpointId)
        if (!device) { return getIcon('MISSING', props.size) }
        return getIcon(device.displayCategories[0], props.size)
    }

    return getIcon(props.name)

}

export default DeviceIcon

//DeviceIcon.defaultProps = {
//    size: 'default',
//   fontSize: 'default',
//}