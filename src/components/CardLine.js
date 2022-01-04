import React from 'react';
import { ActionIcon, Avatar, Group, Loader, Text } from '@mantine/core';

export const CardLine = React.forwardRef( (props, ref) => {

    return (
        <Group ref={ref} noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }} onClick={props.onClick} >
            { props.avatar && 
                ( props.loading ?
                    <Loader size={props.size ? props.size : "lg" } />
                :
                    <Avatar size={props.size ? props.size : "lg" } color={props.color} >{props.avatar}</Avatar>
                )
            }
            { props.icon &&
                ( props.loading ?
                    <Loader size={props.size ? props.size : "sm" } />
                :
                    <ActionIcon size={props.size} color={props.color}>
                        { props.icon }
                    </ActionIcon>
                )
            }           
            <Group direction="column" spacing={0} grow style={{ flexGrow: 1 }}>
                <Text lineClamp={1} size={ props.size ? props.size : "lg" } weight={400} style={{ flexGrow: 1 }}>
                    { props.primary }
                </Text>
                <Text color="dimmed" size={ props.size ? props.size : "md"} lineClamp={1}>
                    { props.secondary }
                </Text>
            </Group>
            { props.children }
        </Group> 
    )

})

export default CardLine