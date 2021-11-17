import React from 'react';
import ActivitySectionButtons from "activity/editor/layout/ActivitySectionButtons"

import CardLine from 'components/CardLine'
import CardLineTitle from 'components/CardLineTitle'

import Stack from '@mui/material/Stack';

const ActivityCategory = props => {

    return (
        <Stack spacing={1}>
            <CardLine inList={true}>
                <CardLineTitle title={props.name} />
                <ActivitySectionButtons 
                    add = { props.add } 
                    setRemoving = { props.setRemoving } 
                    setReordering ={ props.setReordering } 
                    removing = { props.removing } 
                    reorder = { props.reordering }
                    count = { props.count }
                />
            </CardLine>
            { props.children }
        </Stack>
    )
};

export default ActivityCategory
