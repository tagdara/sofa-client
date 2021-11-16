import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ActivityMove from 'activity/editor/layout/ActivityMove';
import ControllerProperty from 'activity/editor/ControllerProperty';
import GridItem from 'components/GridItem';

const ActivityCondition = props => {

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12} nopaper={false} >
            <ActivityDevice category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />      
            <ControllerProperty category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
            <PropertyValue category={ props.category } index={props.index} wide={props.wide} />
            <ActivityMove category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
        </GridItem>
    )
}

export default ActivityCondition