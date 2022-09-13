import React from 'react';
import DeviceIcon from 'components/DeviceIcon'
import { ThemeIcon, Menu } from '@mantine/core';

const ActivityActionMenu = props => {

    const selections = [ 
        { label: "Delete", value: "delete"},
        { label: "Move up", value: "up"},
        { label: "Move down", value: "down"},                                
    ]

    return  <Menu   style={{ display: "flex", flexDirection: "column"}}>
                <Menu.Target>
                    <ThemeIcon   radius="xl"
                                            onClick={ () => { console.log('clicky')}}
                                >
                                    { props.endpointId && <DeviceIcon size={16} endpointId={props.endpointId} /> }
                    </ThemeIcon> 
                </Menu.Target>
                <Menu.Dropdown>
                    { selections.map( item => 
                        <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.index)}>{item.label}</Menu.Item>
                    )}   
                </Menu.Dropdown>    
            </Menu>

}

export default ActivityActionMenu

