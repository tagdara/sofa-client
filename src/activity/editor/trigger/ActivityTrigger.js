import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import PropertyValue from 'activity/editor/PropertyValue';
import ConditionOperator from 'activity/editor/ConditionOperator';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import { Group } from '@mantine/core';
import ActivityConditionMenu from 'activity/editor/condition/ActivityConditionMenu';

const ActivityTrigger = props => {

    return (
        <ActivityLine compact={props.compact}>
            <ActivityConditionMenu index={props.index} category={props.category} />
            <Group direction="column" noWrap spacing={2} >
                <ActivityDevice category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
                <Group spacing={2}>
                    <ControllerProperty category={props.category} index={props.index} compact={props.compact}/> 
                    <ConditionOperator compact={props.compact} category={ props.category } index={props.index} />
                    <PropertyValue category={props.category} index={props.index} compact={props.compact} />
                    <ActivityItemActions category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
                </Group>
            </Group>
        </ActivityLine>
    )
}

export default ActivityTrigger