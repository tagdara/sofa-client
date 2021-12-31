import React from 'react';
import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { SegmentedControl, useMantineTheme } from '@mantine/core';
import { Menu, Music, Shield, Thermometer } from 'react-feather';
import { BsLightbulb as Lightbulb } from "react-icons/bs";

const BottomBar = props => {

    const theme = useMantineTheme();
    const currentStack = useLayoutStore( state => state.currentStack)

    const pickStack = newStack => {
        if (newStack === "System") {
            props.open()
            selectStack(currentStack)
        } else {
            selectStack(newStack)
        }
    }

    const iconsOnly= [
        { value: "System",              "label": <Menu size={20} />},
        { value: "Audio Video",         "label": <Music size={20} /> },
        { value: "Lights and Comfort",  "label": <Lightbulb size={20} /> }, 
        { value: "Climate",             "label": <Thermometer size={20} /> }, 
        { value: "Security",            "label": <Shield size={20} /> }, 
    ]

    return (
        <SegmentedControl 
                fullWidth 
                color={theme.primaryColor}
                onChange={pickStack} 
                value={currentStack} 
                data={iconsOnly} 
                style={{    minHeight: 48,
                            alignItems: "center",
                            marginBottom: "env(safe-area-inset-bottom)"
                }}
        />
    )

}

export default BottomBar