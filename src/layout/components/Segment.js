import React  from 'react';
import { Button } from '@mantine/core';

const Segment = React.forwardRef( (props, ref) => {

    // The forwardRef is required if the segment is used as a menu control under mantine
    // https://mantine.dev/core/menu/ Custom Control with component

    const cssColor = props.color && ( props.color.startsWith('#') || props.color.startsWith('rgb'))

    const label = props.label || props.value 

    return (
        <Button compact 
                ref = {ref}
                variant="light"
                leftIcon={ props.icon }
                styles={{
                    leftIcon: {
                        marginRight: props.icon && !props.value ? 0 : undefined
                    }
                }}
                style={{  
                    margin: 0, // This is needed to prevent gaps on IOS which seems to apply margin: 0 2px to buttons automatically
                    backgroundColor: cssColor ? props.color : undefined,
                    borderTopLeftRadius: (props.position && props.position !== "start") ? 0 : undefined,
                    borderBottomLeftRadius: (props.position && props.position !== "start") ? 0 : undefined,
                    borderTopRightRadius: (props.position && props.position !== "end") ? 0 : undefined,
                    borderBottomRightRadius: (props.position && props.position !== "end") ? 0 : undefined,
                }}
                color={ !cssColor && props.color ? props.color : "primary" }
                radius="md"
                size={props.size ? props.size : "sm"}
                onClick={props.onClick}
        >
            { label } { props.children}
        </Button>
    )
})

export default Segment