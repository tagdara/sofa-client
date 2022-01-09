import React from 'react';
import { Avatar, Group, Loader, Text, ThemeIcon } from '@mantine/core';

export const CardLine = React.forwardRef( (props, ref) => {

    return (
        <Group ref={ref} noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }} onClick={props.onClick} >
            { (props.avatar || props.avatarSrc) && 
                ( props.loading ?
                    <Loader size={props.size ? props.size : "lg" } />
                :
                    <Avatar style={{ width: props.avatarSrc ? 100 : undefined }}
                            src={props.avatarSrc ? props.avatarSrc : undefined} size={props.size ? props.size : "lg" } color={props.avatarSrc ? undefined : props.color} >{props.avatar}</Avatar>
                )
            }
            { props.icon &&
                ( props.loading ?
                    <Loader size={props.size ? props.size : "sm" } />
                :
                    <ThemeIcon radius="md" size={props.size ? props.size : "lg" } color={props.color} variant={ props.on ? "filled" : "light"}>
                        { props.icon }
                    </ThemeIcon>
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