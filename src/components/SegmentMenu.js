import React from 'react';
import Segment from 'components/Segment'
import { Menu } from '@mantine/core';

const SegmentPopover = props => {

    return  <Menu 
                control ={ <Segment {...props} /> }
            >
                { props.selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value)}>{item.label}</Menu.Item>
                )}   
            </Menu>

}

export default SegmentPopover

