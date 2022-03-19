import React from 'react';
import { Fan as FanIcon, Grid, List, Lightbulb, QuestionCircle, Tag, Thermometer, ToggleOn, Triangle, Sliders, Speaker, Tv} from "react-bootstrap-icons";
import { deviceByEndpointId } from 'store/deviceHelpers'

const DeviceIcon = React.forwardRef( (props, ref) => {

    const icons = { 
        'FAN': FanIcon, 
        'MISSING': QuestionCircle,
        'MODE': Tag,
        'SCENE_TRIGGER': Grid, 
        'ACTIVITY_TRIGGER': List, 
        'LIGHT': Lightbulb, 
        'LOGIC': Sliders,
        'BUTTON': ToggleOn, 
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
        return <RealIcon ref={ref} onClick={props.onClick} size={size} />
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

})

export default DeviceIcon

//DeviceIcon.defaultProps = {
//    size: 'default',
//   fontSize: 'default',
//}