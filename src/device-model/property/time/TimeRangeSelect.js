import React, { useEffect } from 'react';
import { Group, Text } from '@mantine/core';
import TimeEntry from 'device-model/property/time/TimeEntry'

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

    const strToTime = timeStr => {
        var target = new Date("1970-01-01 " + timeStr);
        return target
    }


    const startVal = strToTime(props.item.value.start)
    const endVal = strToTime(props.item.value.end)

    return (
        <Group noWrap grow style={{ width: "100%"}}>
            <TimeEntry change={handleChange} value={ startVal }/>
            <Text style={{ flexGrow: 0}}>-</Text>
            <TimeEntry change={handleChange} value={ endVal }/>            
        </Group>
    );

}