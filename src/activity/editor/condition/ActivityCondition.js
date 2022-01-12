import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ConditionOperator from 'activity/editor/ConditionOperator';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import ActivityConditionMenu from 'activity/editor/condition/ActivityConditionMenu';
import { Group } from '@mantine/core';

const ActivityCondition = props => {

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <ActivityConditionMenu index={props.index} category={props.category} />
            <Group direction="column" noWrap spacing={2} >
                <ActivityDevice compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
                <Group spacing={2}>
                    <ControllerProperty compact={props.compact} category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
                    <ConditionOperator compact={props.compact} category={ props.category } index={props.index} />
                    <PropertyValue compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
                </Group>
            </Group>
        </ActivityLine >
    )
}

export default ActivityCondition