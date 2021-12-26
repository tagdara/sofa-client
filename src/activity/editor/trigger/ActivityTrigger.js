import React from 'react';
import ActivityDevice from '../archive/activity/editor/ActivityDevice';
import ActivityItemActions from '../archive/activity/editor/layout/ActivityItemActions';
import PropertyValue from '../archive/activity/editor/PropertyValue';
import ControllerProperty from '../archive/activity/editor/ControllerProperty';
import ActivityLine from '../archive/activity/editor/layout/ActivityLine'

const ActivityTrigger = props => {

    return (
        <ActivityLine>
            <ActivityDevice category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
            <ControllerProperty category={props.category} index={props.index} wide={props.wide}/> 
            <PropertyValue category={props.category} index={props.index} wide={props.wide} />
            <ActivityItemActions category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
        </ActivityLine>
    )
}

export default ActivityTrigger