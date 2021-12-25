import React from 'react';
import ActivityDevice from 'beta/activity/editor/ActivityDevice';
import PropertyValue from 'beta/activity/editor/PropertyValue';
import DeviceDirective from 'beta/activity/editor/DeviceDirective';
import ActivityLine from 'beta/activity/editor/layout/ActivityLine'

const ActivityAction = props => {

    return (
        <ActivityLine category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <ActivityDevice category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
            <DeviceDirective category={ props.category } index={props.index} wide={props.wide} />
            <PropertyValue category={ props.category } index={props.index} wide={props.wide} />
        </ActivityLine>
    )
}

export default ActivityAction