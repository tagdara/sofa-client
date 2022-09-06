import React from 'react';
import { Popover, useMantineTheme } from '@mantine/core'

const CardPopover = props => {

    const theme = useMantineTheme()

    return (
        <Popover
                styles={{ 
                    popover: { 
                        minWidth: props.minWidth ? props.minWidth: 200,
                        maxWidth: props.maxWidth ? props.maxWidth: 320,                       
                    }             
                }}
                opened={props.opened}
                onClose={() => props.setOpen(false)}
                withArrow
                withinPortal
                noFocusTrap
                noEscape
                transition="pop-top-left"
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

