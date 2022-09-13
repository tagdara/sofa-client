import React, { useState } from 'react';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { Affix, Group, Stack, SegmentedControl, useMantineTheme } from '@mantine/core';
import { List as Menu, Lightbulb, MusicNoteBeamed as Music, Shield, Thermometer } from "react-bootstrap-icons";
import HomeButton from 'layout/HomeButton'

const BottomBar = props => {

    const [ displayStack, setDisplayStack] = useState(undefined)
    const currentStack = useLayoutStore( state => state.currentStack)
    const currentPage = useLayoutStore(state => state.currentPage)
    const theme = useMantineTheme();
    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)
    const wide = useMediaQuery('(min-width: 640px)');

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

    const getPosition = val => {
        return selections.findIndex(p => p.value === val)
    }

    const selections= [
        { value: "Audio Video",         "label": <Music size={20} /> },
        { value: "Lights and Comfort",  "label": <Lightbulb size={20} /> }, 
        { value: "Climate",             "label": <Thermometer size={20} /> }, 
        { value: "Security",            "label": <Shield size={20} /> }, 
        { value: "System",              "label": <Menu size={20} />},
    ]

    const bgColor = theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1)

    if (wide && currentPage !== "Stacks") {  
        return  (
            <Affix 
                style={{ 
                    boxSizing: "border-box", 
                    paddingLeft: 16, 
                    paddingRight: 16, 
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    marginBottom: "env(safe-area-inset-bottom)" 
                }} 
                position={{ bottom: wide ? 8: 0 }}
            >
                <Group noWrap grow style={{ width: "100%", maxWidth: 400, flexDirection: "row-reverse"}} id="bottomPortal">
                    <HomeButton />
                </Group>
            </Affix>
        )
    }
        
    if (currentPage !== "Stacks") { 
        return  (
            <Group noWrap grow 
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
        <Stack id="bottomrender" spacing={"xs"} style={{flexDirection: "column-reverse"}} >

            <SegmentedControl 
                    fullWidth 
                    size="md"
                    color={theme.primaryColor}
                    onChange={pickStack} 
                    value={displayStack} 
                    data={selections} 
                    style={{    minHeight: 48,
                                alignItems: "center",
                                justfiyContent: "center",
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