import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import ActivityLine from 'activity/editor/layout/ActivityLine'

const ActivityCondition = props => {

    return (
        <ActivityLine compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} count={props.count}>
            <ActivityDevice compact={props.compact} category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
            <ControllerProperty compact={props.compact} category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
            <PropertyValue compact={props.compact} category={ props.category } index={props.index} wide={props.wide} />
        </ActivityLine >
    )
}

export default ActivityCondition