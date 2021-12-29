import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import DeviceDirective from 'activity/editor/DeviceDirective';
import ActivityLine from 'activity/editor/layout/ActivityLine'

const ActivityAction = props => {

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <ActivityDevice compact={props.compact} category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
            <DeviceDirective compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
            <PropertyValue compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
        </ActivityLine>
    )
}

export default ActivityAction