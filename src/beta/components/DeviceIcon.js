import React from 'react';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { List, Sliders, Speaker, Thermometer, ToggleRight, Triangle, Tv } from 'react-feather'


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

    return getIcon(props.name)

}

export default DeviceIcon

//DeviceIcon.defaultProps = {
//    size: 'default',
//   fontSize: 'default',
//}