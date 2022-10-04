import React, { useState } from 'react';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'layout/layoutStore'
import { Affix, Group, SegmentedControl, useMantineTheme } from '@mantine/core';
import HomeButton from 'layout/HomeButton'

import { IconX, IconMenu, IconDevices2, IconTemperature, IconShield, IconBulb } from '@tabler/icons';

const BottomBar = props => {

    const [ displayStack, setDisplayStack] = useState(undefined)
    const currentStack = useLayoutStore( state => state.currentStack)
    const currentPage = useLayoutStore(state => state.currentPage)
    const theme = useMantineTheme();
    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)
    const wide = useMediaQuery('(min-width: 640px)');
    const setStackPullUp = useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const hideHome = useLayoutStore( state => state.hideHome)

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
        setStackPullUp(undefined)        
    }

    const getPosition = val => {
        return selections.findIndex(p => p.value === val)
    }

    const selections= [
        { value: "Audio Video",         "label": stackPullUp ? <IconX size={24} /> : <IconDevices2 size={24} /> },
        { value: "Lights and Comfort",  "label": <IconBulb size={24} /> }, 
        { value: "Climate",             "label": <IconTemperature size={24} /> }, 
        { value: "Security",            "label": <IconShield size={24} /> }, 
        { value: "System",              "label": <IconMenu size={24} />},
    ]

    //const bgColor = theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1)
    const bgColor = theme.colors.dark[7]
    
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
                {!hideHome &&
                <Group noWrap style={{ width: "100%", maxWidth: 400, flexDirection: "row-reverse"}} id="bottomPortal">
                    <HomeButton />
                </Group>
                }
            </Affix>
        )
    }

    if (wide) { return null }

    return (
        <Affix 
            style={{ 
                backgroundColor: bgColor,
                boxSizing: "border-box", 
                paddingTop: 8,
                paddingLeft: 8, 
                paddingRight: 8, 
                width: "100%", 
                display: "flex", 
                // paddingBottom: "env(safe-area-inset-bottom)",
            }} 
        >
            <SegmentedControl 
                    fullWidth 
                    size="lg"
                    color = {theme.primaryColor}
                    onClick = {clearPullUp}
                    onChange = {pickStack} 
                    value = {displayStack} 
                    data={selections} 
                    style={{ marginBottom: "env(safe-area-inset-bottom)" }}
                    styles={{ 
                        root: {
                            width: "100%",
                            backgroundColor: bgColor
                        }
                    }}
            />
    </Affix>
    )
}

export default BottomBar