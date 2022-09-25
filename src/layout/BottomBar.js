import React, { useState } from 'react';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'layout/layoutStore'
import { Affix, Group, Stack, SegmentedControl, useMantineTheme } from '@mantine/core';
import HomeButton from 'layout/HomeButton'

import { IconX, IconMenu, IconDevices2, IconTemperature, IconShield, IconBulb } from '@tabler/icons';

const BottomBar = props => {

    const [ displayStack, setDisplayStack] = useState(undefined)
    const currentStack = useLayoutStore( state => state.currentStack)
    const currentPage = useLayoutStore(state => state.currentPage)
    const theme = useMantineTheme();
    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)
    const wide = useMediaQuery('(min-width: 640px)');
    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp = useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)

    useDidUpdate(() => {
        if (currentStack) {
            setDisplayStack(currentStack)
        }
    }, [ currentStack ])

    const pickStack = newStack => {
        if (getPosition(newStack) > getPosition(currentStack)) {
            setTransitionDirection("slide-left")
        }
        else if (getPosition(newStack) < getPosition(currentStack)) {
            setTransitionDirection("slide-right")
        } else {
            setTransitionDirection("fade")
        }
        selectStack(newStack)
    }

    const clearPullUp = () => {
        setStackCardHighlight(undefined)
        setStackPullUp(undefined)        
    }

    const getPosition = val => {
        return selections.findIndex(p => p.value === val)
    }

    const selections= [
        { value: "Audio Video",         "label": stackPullUp ? <IconX size={20} /> : <IconDevices2 size={20} /> },
        { value: "Lights and Comfort",  "label": <IconBulb size={20} /> }, 
        { value: "Climate",             "label": <IconTemperature size={20} /> }, 
        { value: "Security",            "label": <IconShield size={20} /> }, 
        { value: "System",              "label": <IconMenu size={20} />},
    ]

    const bgColor = theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1)

    if (currentPage !== "Stacks") {   //wide && 
        return  (
            <Affix 
                style={{ 
                    boxSizing: "border-box", 
                    paddingLeft: 16, 
                    paddingRight: 16, 
                    width: "100%", 
                    display: "flex", 
                    marginBottom: "env(safe-area-inset-bottom)",
                    flexDirection: "row-reverse"
                }} 
                position={{ bottom: 8 }}
            >
                <Group noWrap style={{ width: "100%", maxWidth: 400, flexDirection: "row-reverse"}} id="bottomPortal">
                    <HomeButton />
                </Group>
            </Affix>
        )
    }
        
    if (currentPage !== "Stacks") { 
        return  (
            <Group noWrap
                style={{ 
                    boxSizing: "border-box", 
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    marginBottom: "env(safe-area-inset-bottom)", 
                    flexDirection: "row-reverse",
                    paddingBottom: 4,
                    paddingTop: 8,
                }} 
                id="bottomPortal"
            >
                    <HomeButton />
            </Group>
        )
    }

    if (wide) { 
        return (
            <Group id="bottomrender" spacing={"xs"} /> 
        )
    }

    return (
        <Stack 
            id="bottomrender" 
            spacing={"xl"} 
            style={{
                maxWidth: "100%", 
                flexDirection: "column-reverse"
            }}
        >
            <SegmentedControl 
                    fullWidth 
                    size="md"
                    color = {theme.primaryColor}
                    onClick = {clearPullUp}
                    onChange = {pickStack} 
                    value = {displayStack} 
                    data={selections} 
                    style={{    minHeight: 48,

                                marginBottom: "env(safe-area-inset-bottom)" 
                    }}
                    styles={{ 
                        root: {
                                backgroundColor: bgColor
                        }
                    }}
            />
        </Stack>
    )

}

export default BottomBar