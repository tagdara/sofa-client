import React, { useState, useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';

import AutomationDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import DeviceDirective from 'activity/editor/DeviceDirective';
import CardBase from 'components/CardBase';
import DisplayAction from 'action/DisplayAction';

export default function ActionAction(props) {
    
    const { getControllerInterface, devices } = useContext(DeviceContext);
    const [ edit,setEdit]=useState(false)
 
    function directive (endpointId, controllerName, command, payload={}, cookie={}, instance) {
        if (controllerName!==props.item.controller) { return false}
        props.save(props.index, {...props.item, controller:controllerName, command:command, instance: instance, value: payload})
    }

    function selectDevice(newdevice) {
        console.log('selected new device',newdevice)
        var newitem={name: newdevice.friendlyName, endpointId: newdevice.endpointId }
        props.save(props.index, {...newitem})
    }

    function toggleEdit() {
        setEdit(!edit)
    }
    
    function filterIf(data) {
        if (data.endpointId==='logic.logic.if') {
            return { "endpointId": "logic.logic.if", "command":data.command }
        } 
        return devices[data.endpointId]
    }
    
    return (
        edit ?
        <CardBase wide={true} small={true}>
            <AutomationDevice   device={devices[props.data.endpointId]} index={props.index} selectDevice={selectDevice} wide={false}
                                remove={props.remove} reorder={props.reorder}
                                moveUp={props.moveUp} moveDown={props.moveDown} delete={props.delete} />
                                
            <DeviceDirective    index={props.index} save={props.save} device={devices[props.data.endpointId]} item={props.data} wide={false} />

            <PropertyValue      index={props.index} device={devices[props.data.endpointId]} item={props.data} wide={false} 
                                interface={ getControllerInterface(devices[props.data.endpointId], props.data) } directive={directive} />
        </CardBase>
        :
        <>
            <DisplayAction device={ filterIf(props.data) } data={props.data} toggleEdit={toggleEdit} />
        </>
    )
}
