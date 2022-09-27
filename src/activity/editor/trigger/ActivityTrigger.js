import React from 'react';
import ActivityDevice from 'activity/editor/device/ActivityDevice';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import PropertyValue from 'activity/editor/PropertyValue';
import ConditionOperator from 'activity/editor/ConditionOperator';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import { Group, Stack } from '@mantine/core';
import ActivityConditionMenu from 'activity/editor/condition/ActivityConditionMenu';

const ActivityTrigger = props => {

    const mobile = false

    return (
        <ActivityLine compact={props.compact}>
            <ActivityConditionMenu select={props.select} index={props.index} category={props.category} />
            <Stack spacing={2} >
                { mobile &&
                    <ActivityDevice category={props.category} index={props.index} compact={props.compact} />
                }
                <Group spacing={2}>
                    { !mobile &&
                        <ActivityDevice category={props.category} index={props.index} compact={props.compact}  />
                    }
                    <ControllerProperty category={props.category} index={props.index} compact={props.compact}/> 
                    <ConditionOperator compact={props.compact} category={ props.category } index={props.index} />
                    <PropertyValue category={props.category} index={props.index} compact={props.compact} />
                    <ActivityItemActions category={props.category} index={props.index} compact={props.compact}  />
                </Group>
            </Stack>
        </ActivityLine>
    )
}

export default ActivityTrigger