import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'

const ActivityTrigger = props => {

    return (
        <ActivityLine compact={props.compact}>
            <ActivityDevice category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
            <ControllerProperty category={props.category} index={props.index} compact={props.compact}/> 
            <PropertyValue category={props.category} index={props.index} compact={props.compact} />
            <ActivityItemActions category={props.category} index={props.index} compact={props.compact} removing={props.removing} reordering={props.reordering} />
        </ActivityLine>
    )
}

export default ActivityTrigger