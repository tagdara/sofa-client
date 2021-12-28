import React from 'react';
import ActivityItemActions from 'activity/editor/layout/ActivityItemActions';
import { Group, Paper, SimpleGrid } from '@mantine/core';
import { usePageFrame } from 'device-model/instance/PageFrame'

const ActivityLine = props => {
    const { maxStacks } = usePageFrame()
    // <Paper elevation={0} onClick={props.onClick} sx={{ display: "flex", borderRadius:4, width: "100%"}}></Paper>
    return (
        <Paper  onClick={props.onClick} 
                style={{ padding: "8px 16px", 
                        display: "flex", 
                        borderRadius:4, 
                        width: "100%"
                    }}
        >
            <Group noWrap style={{ width: "100%"}}>
                { props.compact ?
                    <Group>
                        { props.children }
                    </Group>
                    :
                    <SimpleGrid cols={maxStacks < 3 ? 1 : 3} style={{ width: "100%", alignItems: "center"}} >
                        { props.children }
                    </SimpleGrid>
                }
                <ActivityItemActions    category={ props.category } 
                                            index={props.index} 
                                            wide={props.wide} 
                                            removing={props.removing} 
                                            reordering={props.reordering} 
                                            count={props.count} 
                                        />
            </Group>
        </Paper>
    )
}

export default ActivityLine