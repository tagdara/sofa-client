import React from 'react';
import { ActionIcon, Avatar, Group, Loader, Stack, Text, ThemeIcon } from '@mantine/core';

export const CardLine = React.forwardRef( (props, ref) => {

    return (
        <Group ref={ref} noWrap style={{ width: "100%", maxWidth: "100%", alignItems: "center", position: "relative" }} onClick={props.onClick} >
            { (props.avatar || props.avatarSrc) && 
                ( props.loading ?
                    <Loader size={props.size ? props.size : "lg" } />
                :
                    <Avatar style={{ width: props.avatarSrc ? 100 : undefined, backgroundColor: "rgba(0,0,0, 0.2)" }}
                            src={props.avatarSrc ? props.avatarSrc : undefined} size={props.size ? props.size : "lg" } color={props.avatarSrc ? undefined : props.color} >{props.avatar}</Avatar>
                )
            }
            { props.icon &&
                ( props.loading ?
                    <Loader size={props.size ? props.size : "sm" } />
                :
                    ( props.on ?
                        <ThemeIcon radius="md" size={props.size ? props.size : "lg" } color={props.color } variant={ props.on ? "filled" : undefined}>
                            { props.icon }
                        </ThemeIcon>
                    :
                        <ActionIcon radius="md" size={props.size ? props.size : "lg" } color={props.color } variant={ props.on ? "filled" : undefined}>
                                                        { props.icon }
                        </ActionIcon>
                    )
                )
            }           
            <Stack spacing={0} grow style={{ flexGrow: 1 }}>
                <Text lineClamp={1} size={ props.size ? props.size : "lg" } weight={500} style={{ flexGrow: 1 }}>
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