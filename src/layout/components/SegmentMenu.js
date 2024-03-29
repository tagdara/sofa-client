import React from 'react';
import Segment from 'layout/components/Segment'
import { Menu } from '@mantine/core';

const SegmentMenu = props => {

    return  (
        <Menu>
            <Menu.Target>
                <Segment {...props} />
            </Menu.Target> 
            <Menu.Dropdown>
                { props.selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value)}>{item.label}</Menu.Item>
                )}  
            </Menu.Dropdown> 
        </Menu>
    )
}

export default SegmentMenu

