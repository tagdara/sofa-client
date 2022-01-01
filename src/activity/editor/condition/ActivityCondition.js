import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import { Badge, Space } from '@mantine/core';
const ActivityCondition = props => {

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <Badge variant={"dot"}>If</Badge>
            <Space w={1}/>
            <ActivityDevice compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
            <ControllerProperty compact={props.compact} category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
            <PropertyValue compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
        </ActivityLine >
    )
}

export default ActivityCondition