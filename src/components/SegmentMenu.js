import React from 'react';
import Segment from 'components/Segment'
import { Menu } from '@mantine/core';

const SegmentPopover = props => {

    return  <Menu>
                <Menu.Target>
                    <Segment {...props} />
                </Menu.Target> 
                <Menu.Dropdown>
                    { props.selections.map( item => 
                        <Menu.Item key={item.label} onClick={ () => props.select(item.value)}>{item.label}</Menu.Item>
                    )}  
                </Menu.Dropdown> 
            </Menu>

}

export default SegmentPopover

