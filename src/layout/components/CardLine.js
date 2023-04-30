import React from 'react';
import { ActionIcon, Avatar, Group, Loader, Stack, Text, ThemeIcon } from '@mantine/core';

export const CardLine = React.forwardRef( (props, ref) => {

    return (
        <Group ref={ref} noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }} >
            { (props.avatar || props.avatarSrc) && 
                ( props.loading ?
                    <Loader size={props.size ? props.size : "lg" } />
                :
                    <Avatar onClick={props.onClick} style={{ width: props.avatarSrc ? 100 : undefined, backgroundColor: "rgba(0,0,0, 0.2)" }}
                            src={props.avatarSrc ? props.avatarSrc : undefined} size={props.size ? props.size : "lg" } color={props.avatarSrc ? undefined : props.color} >{props.avatar}</Avatar>
                )
            }
            { props.icon &&
                ( props.loading ?
                    <Loader size={props.size ? props.size : "sm" } />
                :
                    ( props.on ?
                        <ThemeIcon onClick={props.onClick} radius="md" size={props.size ? props.size : "lg" } color={props.color } variant={ props.on ? "filled" : undefined}>
                            { props.icon }
                        </ThemeIcon>
                    :
                        <ActionIcon onClick={props.onClick} radius="md" size={props.size ? props.size : "lg" } color={props.color } variant={ props.on ? "filled" : undefined}>
                                                        { props.icon }
                        </ActionIcon>
                    )
                )
            }           
            <Stack spacing={0} style={{ flexGrow: 1 }} onClick={props.onClick}>
                <Text lineClamp={1} size={ props.size ? props.size : "lg" } weight={400} style={{ flexGrow: 1 }}>
                    { props.primary }
                </Text>
                <Text color="dimmed" size={ props.size ? props.size : "md"} lineClamp={1}>
                    { props.secondary }
                </Text>
            </Stack>
            { props.children }
        </Group> 
    )

})

export default CardLine