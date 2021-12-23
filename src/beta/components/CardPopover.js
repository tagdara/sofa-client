import React from 'react';
import { Popover, useMantineTheme } from '@mantine/core'

const CardPopover = props => {

    const theme = useMantineTheme()

    return (
        <Popover
                
                styles={{ 
                    popover: { 

                        backgroundColor: theme.colorScheme === 'dark' ? 
                                            theme.fn.lighten(theme.colors.dark[7], 0.1)  : 
                                            theme.colors[theme.primaryColor][5],
                    },
                    arrow: { 
                        backgroundColor: theme.colorScheme === 'dark' ? 
                                            theme.fn.lighten(theme.colors.dark[7], 0.1)  : 
                                            theme.colors[theme.primaryColor][5],
                    },                    
                }}
                opened={props.opened}
                onClose={() => props.setOpen(false)}
                position="bottom"
                placement="end"
                withArrow
                noFocusTrap
                noEscape
                transition="pop-top-left"
                target={ props.target }
        >
            { props.children }
        </Popover>
    );

}

export default CardPopover

