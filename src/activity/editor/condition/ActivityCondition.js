import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ConditionOperator from 'activity/editor/ConditionOperator';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import ActivityConditionMenu from 'activity/editor/condition/ActivityConditionMenu';
import { Group, Stack} from '@mantine/core';

const ActivityCondition = props => {
    
    const mobile = false

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} count={props.count}>
            <ActivityConditionMenu select={props.select} index={props.index} category={props.category} />
            <Stack spacing={2} >
                { mobile &&
                    <ActivityDevice compact={props.compact} category={ props.category } index={props.index} />      
                }
                <Group spacing={2}>
                    { !mobile &&
                        <ActivityDevice compact={props.compact} category={ props.category } index={props.index}  />      
                    }
                    <ControllerProperty compact={props.compact} category={props.category} index={props.index}  /> 
                    <ConditionOperator compact={props.compact} category={ props.category } index={props.index} />
                    <PropertyValue compact={props.compact} category={ props.category } index={props.index}  />
                </Group>
            </Stack>
        </ActivityLine >
    )
}

export default ActivityCondition