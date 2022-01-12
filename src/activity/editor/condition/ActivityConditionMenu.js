import React from 'react';
import { Avatar, Menu } from '@mantine/core';

const ActivityConditionMenu = props => {

    const selections = [ 
        { label: "Delete", value: "delete"},                              
    ]

    console.log('props.category', props.category)

    return  <Menu   style={{ display: "flex", flexDirection: "column"}}
                    control = { <Avatar size="sm" 
                                    color={ props.category === "triggers" ? "orange" : "violet" }
                                    radius="xl"
                                    style={{ fontWeight: 600, margin: "4px 8px 4px 0px" }} 
                                >
                                    { props.category === "triggers" ? "ON" : "IF" }
                                </Avatar>
                            }
            >
                { selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.index)}>{item.label}</Menu.Item>
                )}   
            </Menu>

}

export default ActivityConditionMenu

