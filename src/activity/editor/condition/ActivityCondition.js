import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import { Badge, Group } from '@mantine/core';

const ActivityCondition = props => {

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <Badge style={{ margin: "4px 8px 4px 0px", padding: 0, width: 28 }} size="xs" color="purple" variant={"light"}>If</Badge>
            <Group direction="column" noWrap spacing={2} >
                <ActivityDevice compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
                <Group spacing={2}>
                    <ControllerProperty compact={props.compact} category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
                    <PropertyValue compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
                </Group>
            </Group>
        </ActivityLine >
    )
}

export default ActivityCondition