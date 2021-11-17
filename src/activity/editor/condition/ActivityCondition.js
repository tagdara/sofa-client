import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'

const ActivityCondition = props => {

    return (
        <ActivityLine >
            <ActivityDevice category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
            <ControllerProperty category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
            <PropertyValue category={ props.category } index={props.index} wide={props.wide} />
            <ActivityItemActions category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
        </ActivityLine >
    )
}

export default ActivityCondition