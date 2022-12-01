import React from 'react';
import { createStyles } from '@mantine/styles';
import { Button, ThemeIcon, Group, Menu, Stack, Text, useMantineTheme } from '@mantine/core';

import { IconChevronRight } from '@tabler/icons';
import useLayoutStore from 'layout/layoutStore'

export const SplitButton = ( props ) => {

    const theme = useMantineTheme()
    const isMobile = useLayoutStore( state => state.isMobile)

    return (
        <Button.Group style={{ height: "unset", width: "100%", display: "flex", flexGrow: 1}}>
            { props.selections &&
                <Menu   style={{ display: "flex", height: "unset", flexDirection: "column"}}>
                    <Menu.Target>
                        <Button 
                            color={props.iconColor}
                            variant="light"
                            style={{ 
                                display: "flex", 
                                lineHeight: "1",
                                height: "unset",
                                padding: "16px 8px",
                            }}
                        >
                            { props.icon }
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                    { props.selections.map( item => 
                        <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.endpointId)}>{item.label}</Menu.Item>
                    )}  
                    </Menu.Dropdown> 
                </Menu>           
            }
            { props.label &&
                <Button 
                    variant="light"
                    color="gray"
                    onClick={props.onClick} 
                    style={{ 
                        display: "flex", 
                        lineHeight: "1",
                        height: "unset",
                        flexGrow: 1, 
                        overflow: "hidden"
                    }}
                >
                    <Stack spacing={0} style={{ justifyContent: "center", display: "flex", maxWidth: "100%", overflow: "hidden", whiteSpace: "nowrap", }}>
                        <Text   size={isMobile ? "md": "sm"} 
                                style={{ color : props.on ?  theme.colors[theme.primaryColor][2] : "dimmed" }} 
                                weight={500} 
                                lineClamp={1}>
                            {props.label}
                        </Text>
                        { props.secondary && <Text weight={400} size="sm" lineClamp={2} color="dimmed" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{props.secondary}</Text> }
                    </Stack>                
                </Button>
            }
            { props.children }
            { props.arrow &&
                <Button onClick={props.onClick} >
                    <ThemeIcon >
                        <IconChevronRight />
                    </ThemeIcon>
                </Button>
            }
        </Button.Group>
    )

}

