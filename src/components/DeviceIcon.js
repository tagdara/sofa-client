import React from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { List, Sliders, Speaker, Thermometer, ToggleRight, Triangle, Tv } from 'react-feather'
import { deviceByEndpointId } from 'store/deviceHelpers'

const DeviceIcon = props => {

    const icons = { 
        'SCENE_TRIGGER': Sliders, 
        'ACTIVITY_TRIGGER': List, 
        'LIGHT': Lightbulb, 
        'BUTTON': ToggleRight, 
        'SPEAKER': Speaker, 
        'THERMOSTAT': Thermometer, 
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
        return getIcon(device.displayCategories, props.size)
    }

    return getIcon(props.name)

}

export default DeviceIcon

//DeviceIcon.defaultProps = {
//    size: 'default',
//   fontSize: 'default',
//}