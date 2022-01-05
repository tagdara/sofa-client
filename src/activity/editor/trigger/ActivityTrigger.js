import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'
import { Badge, Group } from '@mantine/core';

const ActivityTrigger = props => {

    return (
        <ActivityLine compact={props.compact}>
            <Badge style={{ margin: "4px 8px 4px 0px", padding: 0, width: 28 }} size="xs" color="orange" variant={"light"}>On</Badge>
            <Group direction="column" noWrap spacing={2} >
                <ActivityDevice category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
                <Group spacing={2}>
                    <ControllerProperty category={props.category} index={props.index} compact={props.compact}/> 
                    <PropertyValue category={props.category} index={props.index} compact={props.compact} />
                    <ActivityItemActions category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
                </Group>
            </Group>
        </ActivityLine>
    )
}

export default ActivityTrigger