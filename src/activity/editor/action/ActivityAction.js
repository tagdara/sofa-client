import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import DeviceDirective from 'activity/editor/DeviceDirective';
import ActivityLine from 'activity/editor/layout/ActivityLine'

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