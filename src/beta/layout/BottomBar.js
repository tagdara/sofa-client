import React from 'react';

import { selectStack } from 'store/layoutHelpers'
import useLayoutStore from 'store/layoutStore'
import { Group, SegmentedControl, Text} from '@mantine/core';
import { Menu, Music, Shield, Thermometer } from 'react-feather';
import { BsLightbulb as Lightbulb } from "react-icons/bs";

const BottomLabel = (label, icon) => {
    return (
            <Group direction="column" position="center" style={{ width: "100%"}} spacing={0}>
                {icon}
                <Text size="xs">{label}</Text>
            </Group>
    )
}

const BottomBar = props => {

    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    } 

    const currentStack = useLayoutStore( state => state.currentStack)

    const pickStack = newStack => {
        if (newStack === "System") {
            reloadPWA()
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

    return (

            <SegmentedControl style={{ minHeight: 48, marginBottom: "env(safe-area-inset-bottom)" }} fullWidth onChange={pickStack} value={currentStack} data={sectionData} />

    )
}

export default BottomBar