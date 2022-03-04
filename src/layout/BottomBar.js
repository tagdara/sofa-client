import React, { useState } from 'react';
import { useDidUpdate } from '@mantine/hooks';
import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { SegmentedControl, useMantineTheme } from '@mantine/core';
import { Menu, Music, Shield, Thermometer } from 'react-feather';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import HomeButton from 'layout/HomeButton'

const BottomBar = props => {

    const [ displayStack, setDisplayStack] = useState(undefined)
    const currentStack = useLayoutStore( state => state.currentStack)
    const currentPage = useLayoutStore(state => state.currentPage)
    const theme = useMantineTheme();
    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)

    useDidUpdate(() => {
        if (currentStack) {
            setDisplayStack(currentStack)
        }
    }, [ currentStack ])

    if (currentPage !== "Stacks") { return <div style={{ marginBottom: "env(safe-area-inset-bottom)" }} ><HomeButton /></div> }
    //if (currentPage !== "Stacks") { return <div style={{ height: 1, marginBottom: "env(safe-area-inset-bottom)" }} /> }

    const pickStack = newStack => {
        if (newStack === "System") {
            props.open()
            selectStack(currentStack)
        } else {
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

    return (
        <SegmentedControl 
                fullWidth 
                color={theme.primaryColor}
                onChange={pickStack} 
                value={displayStack} 
                data={selections} 
                style={{    minHeight: 48,
                            alignItems: "center",
                            marginBottom: "env(safe-area-inset-bottom)"
                }}
        />
    )

}

export default BottomBar