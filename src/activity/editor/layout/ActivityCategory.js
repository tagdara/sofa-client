import React from 'react';
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"
import SectionHeader from 'layout/SectionHeader';
import { Group } from '@mantine/core';


const ActivityCategory = props => {

    if (!props.children || props.children.length < 1) {
        return null
    }

    return (
        <Group direction="column" spacing="xs">
            <SectionHeader title={props.name} >
                <ActivitySectionButtons 
                    add = { props.add } 
                    setRemoving = { props.setRemoving } 
                    setReordering ={ props.setReordering } 
                    removing = { props.removing } 
                    reordering = { props.reordering }
                    count = { props.count }
                />
            </SectionHeader>
            { props.children }
        </Group>
    )
};

export default ActivityCategory
