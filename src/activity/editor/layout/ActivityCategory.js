import React from 'react';
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"
import SectionHeader from 'components/SectionHeader';
import { SectionFrame } from 'device-model/instance/PageFrame';

const ActivityCategory = props => {

    return (
        <>
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
            <SectionFrame cols={1}>
                { props.children }
            </SectionFrame>
        </>
    )
};

export default ActivityCategory
