import React from 'react';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import { Paper, SimpleGrid } from '@mantine/core';

const ActivityLine = props => {
    // <Paper elevation={0} onClick={props.onClick} sx={{ display: "flex", borderRadius:4, width: "100%"}}></Paper>
    return (
        <Paper  onClick={props.onClick} 
                style={{ padding: "8px 16px", 
                        display: "flex", 
                        borderRadius:4, 
                        width: "100%"
                    }}
        >
            <SimpleGrid cols={props.wide ? 4 : 1} style={{ width: "100%", alignItems: "center"}} >
                { props.children }
                <ActivityItemActions    category={ props.category } 
                                        index={props.index} 
                                        wide={props.wide} 
                                        removing={props.removing} 
                                        reordering={props.reordering} 
                                        count={props.count} 
                                    />
            </SimpleGrid>
        </Paper>
    )
}

export default ActivityLine