import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import PropertyValue from 'activity/editor/PropertyValue';
import ControllerProperty from 'activity/editor/ControllerProperty';
import GridItem from 'components/GridItem';

const ActivityTrigger = props => {

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12}>
            <ActivityDevice category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
            <ControllerProperty category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} /> 
            <PropertyValue category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
            <ActivityItemActions category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
        </GridItem>
    )
}

export default ActivityTrigger