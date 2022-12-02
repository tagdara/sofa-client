import React from 'react';
import { IconDevices, IconAdjustments, IconBulb, IconDeviceSpeaker, IconTemperature, 
        IconWindmill, IconMaximize, IconTag, IconToggleRight, IconTrafficLights, 
        IconDeviceTv, IconListDetails, IconWindowMaximize, IconBuildingWarehouse,
        IconCircuitSwitchOpen, IconDeviceCctv, IconShieldLock, IconWalk, IconPlugConnected, IconCpu
    } from '@tabler/icons';

import { endpointByEndpointId } from 'endpoint-model/discovery'

const EndpointIcon = React.forwardRef( (props, ref) => {

    const icons = { 
        'AREA': IconBuildingWarehouse,
        'CAMERA': IconDeviceCctv,
        'CONTACT_SENSOR': IconShieldLock,
        'FAN': IconWindmill, 
        'MISSING': IconMaximize,
        'MODE': IconTag,
        'SCENE_TRIGGER': IconTrafficLights, 
        'ACTIVITY_TRIGGER': IconListDetails, 
        'LIGHT': IconBulb, 
        'LOGIC': IconAdjustments,
        'MATRIX': IconWindowMaximize,
        'MOTION_SENSOR': IconWalk,
        'OTHER': IconCpu,
        'SMARTPLUG': IconPlugConnected,
        'BUTTON': IconToggleRight, 
        'SWITCH': IconCircuitSwitchOpen,
        'SPEAKER': IconDeviceSpeaker, 
        'THERMOSTAT': IconTemperature, 
        'TEMPERATURE_SENSOR': IconTemperature, 
        'RECEIVER': IconDeviceSpeaker, 
        'TV': IconDeviceTv
    }

    function getIcon(category, size=20) {

        var RealIcon = IconDevices
        if (icons.hasOwnProperty(category)) {
            RealIcon = icons[category]
        }
        return <RealIcon ref={ref} onClick={props.onClick} size={size} />
    }

    if (props.displayCategories) {
        return getIcon(props.displayCategories, props.size)
    }
    
    if (props.endpointId) {
        const device = endpointByEndpointId(props.endpointId)
        if (!device) { return getIcon('MISSING', props.size) }
        return getIcon(device.displayCategories[0], props.size)
    }

    return getIcon(props.name)

})

export default EndpointIcon

//EndpointIcon.defaultProps = {
//    size: 'default',
//   fontSize: 'default',
//}