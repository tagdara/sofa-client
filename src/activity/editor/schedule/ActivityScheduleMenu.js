import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';

const ActivityScheduleMenu = props => {

    const selections = [ 
        { label: "Delete", value: "delete"},                              
    ]
    
    return  <Menu   style={{ display: "flex", flexDirection: "column"}}>
                <Menu.Target>
                    <Avatar 
                        size="sm" 
                        color="violet"
                        radius="xl"
                        styles={{ root: { marginRight: 8}}}
                        style={{ fontWeight: 600, margin: "4px 8px 4px 0px" }} 
                    >
                        <IconCalendar size={16} />
                    </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                { selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.index)}>{item.label}</Menu.Item>
                )}  
                </Menu.Dropdown> 
            </Menu>

}

export default ActivityScheduleMenu
