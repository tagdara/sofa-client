import React from 'react';
import { Popover } from '@mantine/core'
import { useMantineTheme } from '@mantine/core';

const CardPopover = props => {

    //styles={{ 
    //    popover: { 
    //        minWidth: props.minWidth ? props.minWidth: 200,
    //        maxWidth: props.maxWidth ? props.maxWidth: 320,                       
    //    }             
    //}}
    const theme = useMantineTheme(); 

    return (
        <Popover 
            styles={{ 
                dropdown: {
                    backgroundColor: theme.colors.dark[5]
                }
            }}
            shadow="md" 
            width={props.width ? props.width : "target" }
                position={"bottom"}
                opened={props.opened}
                onClose={() => props.setOpen(false)}
                withArrow
                withinPortal={props.withinPortal}
        >
            <Popover.Target>
                { props.target }
            </Popover.Target>
            <Popover.Dropdown>
                { props.children }
            </Popover.Dropdown>
        </Popover>
    );

}

export default CardPopover

