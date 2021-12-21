import React from 'react';

import { selectStack } from 'beta/helpers/layoutHelpers'
import useLayoutStore from 'store/layoutStore'
import { Group, SegmentedControl, Text} from '@mantine/core';
import { Menu, Music, Shield, Thermometer } from 'react-feather';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { useMantineTheme } from '@mantine/core';

const BottomLabel = (label, icon) => {
    return (
            <Group direction="column" position="center" style={{ width: "100%"}} spacing={0}>
                {icon}
                <Text size="xs">{label}</Text>
            </Group>
    )
}

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
    
    const sectionData= [
            { value: "Audio Video",         "label": BottomLabel("AV",<Music size={20} />) },
            { value: "Lights and Comfort",  "label": BottomLabel("Lights", <Lightbulb size={20} />) }, 
            { value: "Climate",             "label": BottomLabel("Climate", <Thermometer size={20} />) }, 
            { value: "Security",            "label": BottomLabel("Security", <Shield size={20} />) }, 
            { value: "System",              "label": BottomLabel("More", <Menu size={20} />) }
    ]

    // TODO Adding color styles has introduced some ghosting along the edges that needs to be fixed

    return (
            <SegmentedControl 
                    fullWidth 
                    onChange={pickStack} 
                    value={currentStack} 
                    data={sectionData} 
                    style={{    minHeight: 48, 
                                marginBottom: "env(safe-area-inset-bottom)", 
                                backgroundColor: theme.colorScheme === 'dark' ? 
                                    theme.colors.dark[7] : 
                                    theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),
                    }} 
                    styles={{   controlActive: {
                                    borderRadius: 4,
                                    backgroundColor: theme.colorScheme === 'dark' ? 
                                        theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.5) : 
                                        theme.fn.rgba(theme.colors[theme.primaryColor][1], 0.1) 
                                }
                    }}
            />

    )
}

export default BottomBar