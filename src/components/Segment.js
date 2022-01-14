import React  from 'react';
import { Button } from '@mantine/core';

const Segment = React.forwardRef( (props, ref) => {

    // The forwardRef is required if the segment is used as a menu control under mantine
    // https://mantine.dev/core/menu/ Custom Control with component

    const cssColor = props.color && ( props.color.startsWith('#') || props.color.startsWith('rgb'))

    return (
        <Button compact 
                ref = {ref}
                variant="light"
                leftIcon={ props.icon }
                style={{  
                    backgroundColor: cssColor ? props.color : undefined,
                    borderTopLeftRadius: (props.position && props.position !== "start") ? 0 : undefined,
                    borderBottomLeftRadius: (props.position && props.position !== "start") ? 0 : undefined,
                    borderTopRightRadius: (props.position && props.position !== "end") ? 0 : undefined,
                    borderBottomRightRadius: (props.position && props.position !== "end") ? 0 : undefined,
                }}
                color={ !cssColor && props.color ? props.color : "primary" }
                radius="sm"
                size={props.size ? props.size : "sm"}
                onClick={props.onClick}
        >
            {props.value && props.value} { props.children}
        </Button>
    )
})

export default Segment