import React, { useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';

import AutomationDevice from './AutomationDevice';
import PropertyValue from './PropertyValue';
import AutomationMove from './AutomationMove';
import DeviceDirective from './DeviceDirective';
import GridItem from 'components/GridItem';

export default function AutomationAction(props) {
    
    const { getControllerInterface } = useContext(DeviceContext);

    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
        console.log('fake directive', controllerName, props.item.controller)
        var itemController = props.item.controller
        if (itemController.includes('.')) {
            itemController = itemController.split('.')[1]
        }
        if (controllerName!==itemController) { return false}
        props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
    }

    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={name: newdevice.friendlyName, endpointId: newdevice.endpointId }
        props.save(props.index, {...newitem})
    }

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12} nopaper={false} >
            <AutomationDevice   device={props.device} index={props.index} selectDevice={selectDevice} wide={props.wide}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />
                                
            <DeviceDirective    index={props.index} save={props.save} device={props.device} item={props.item} wide={props.wide} />

            <PropertyValue      index={props.index} device={props.device} item={props.item} wide={props.wide} 
                                interface={ getControllerInterface(props.device, props.item) } directive={directive} />

            <AutomationMove     wide={props.wide} remove={props.remove} reorder={props.reorder} 
                                delete={props.delete} moveUp={props.moveUp} moveDown={props.moveDown} index={props.index} />
        </GridItem>
    )
}
