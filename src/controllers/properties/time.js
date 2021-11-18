import React, { useEffect } from 'react';
import TimeEntry from './timeEntry'

export default function Time(props) {
    
    useEffect(() => {
        if (props.item.value===undefined) {
            props.directive(props.device.endpointId, 'LogicController', 'SetTime', { "time" : { "start" : "08:00", "end": "20:00"}}, {}, props.item.instance)
        }
    // eslint-disable-next-line
    }, [props.item, props.device, props.interface])
    
    function handleChange(part, val) {

        var data={ "start" : "08:00", "end": "20:00" }
        if (props.item.value!==undefined) {
            data=props.item.value
        }
        data[part]=val
        console.log( {"time": data})
        props.directive(props.device.endpointId, 'LogicController', 'SetTime', { "time" : data }, {}, props.item.instance)
    }
    
    return (
        <>
            <TimeEntry label={"start"} updateValue={handleChange} value={ props.item.value.start }/>
            <TimeEntry label={"end"} updateValue={handleChange} value={ props.item.value.end }/>            
        </>
    );

}