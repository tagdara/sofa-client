import React from 'react';
import { Avatar, Menu } from '@mantine/core';

const ActivityConditionMenu = props => {

    const selections = [ 
        { label: "Delete", value: "delete"},                              
    ]
    
    return  <Menu   style={{ display: "flex", flexDirection: "column"}}>
                <Menu.Target>
                    <Avatar size="sm" 
                                    color={ props.category === "triggers" ? "orange" : "violet" }
                                    radius="xl"
                                    style={{ fontWeight: 600, margin: "4px 8px 4px 0px" }} 
                                >
                                    { props.category === "triggers" ? "ON" : "IF" }
                                </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                { selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.index)}>{item.label}</Menu.Item>
                )}  
                </Menu.Dropdown> 
            </Menu>

}

export default ActivityConditionMenu

