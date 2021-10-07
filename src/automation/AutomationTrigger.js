import React, { useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';

import AutomationDevice from './AutomationDevice';
import AutomationMove from './AutomationMove';
import PropertyValue from './PropertyValue';
import ControllerProperty from './ControllerProperty';
import GridItem from 'components/GridItem';

export default function AutomationTrigger(props) {

    const { getDeviceProperties, getControllerInterface } = useContext(DeviceContext);

    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
        console.log(controllerName, props.item.controller)
        if (controllerName!==props.item.controller) { return false}
        props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
    }

    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={name: newdevice.friendlyName, endpointId: newdevice.endpointId }
        props.save(props.index, {...newitem})
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <AutomationDevice   device={props.device} index={props.index} selectDevice={selectDevice} wide={props.wide}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />

            <ControllerProperty index={props.index} save={props.save} device={props.device} item={props.item} 
                                deviceProperties={getDeviceProperties(props.device)} wide={props.wide} />
                                
            <PropertyValue      index={props.index} device={props.device} item={props.item} wide={props.wide} 
                                directive={directive} interface={ getControllerInterface(props.device, props.item) } />
            
            <AutomationMove     wide={props.wide} remove={props.remove} reorder={props.reorder} 
                                delete={props.delete} moveUp={props.moveUp} moveDown={props.moveDown} index={props.index} />
        </GridItem>
    )
}
