import React from 'react';
import ActivityDevice from 'activity/editor/ActivityDevice';
import PropertyValue from 'activity/editor/PropertyValue';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import DeviceDirective from 'activity/editor/DeviceDirective';
import GridItem from 'components/GridItem';

const ActivityAction = props => {

    return (
        <GridItem nolist={true} elevation={0} wide={true} xs={12} nopaper={false} >
            <ActivityDevice   category={props.category} index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />

            <DeviceDirective    category={ props.category } index={props.index} wide={props.wide} />

            <PropertyValue      category={ props.category } index={props.index} wide={props.wide} />

            <ActivityItemActions     category={ props.category } index={props.index} wide={props.wide} removing={props.removing} reordering={props.reordering} />
        </GridItem>
    )
}

export default ActivityAction