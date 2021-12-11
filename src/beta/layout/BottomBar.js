import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SecurityIcon from '@mui/icons-material/Security';
import LightbulbOutlineIcon from 'resources/LightbulbOutline';

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

    const currentStack = useLayoutStore( state => state.currentStack)
    
    const sectionData= [
            { value: "Audio Video",         "label": BottomLabel("AV",<Music size={20} />) },
            { value: "Lights and Comfort",  "label": BottomLabel("Lights", <Lightbulb size={20} />) }, 
            { value: "Climate",             "label": BottomLabel("Climate", <Thermometer size={20} />) }, 
            { value: "Security",            "label": BottomLabel("Security", <Shield size={20} />) }, 
            { value: "System",              "label": BottomLabel("More", <Menu size={20} />) }
    ]

    return (

            <SegmentedControl fullWidth onChange={selectStack} value={currentStack} data={sectionData} />

    )
}

export default BottomBar