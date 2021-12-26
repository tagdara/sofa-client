import React from 'react';

import { selectStack } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { SegmentedControl} from '@mantine/core';
import { Menu, Music, Shield, Thermometer } from 'react-feather';
import { BsLightbulb as Lightbulb } from "react-icons/bs";
import { useMantineTheme } from '@mantine/core';

//const BottomLabel = (label, icon) => {
//    return (
//            <Group direction="column" position="center" style={{ width: "100%"}} spacing={0}>
//                {icon}
//                <Text size="xs">{label}</Text>
 //           </Group>
 //   )
//}

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
    
    //const sectionData= [
    //        { value: "Audio Video",         "label": BottomLabel("AV",<Music size={20} />) },
    //        { value: "Lights and Comfort",  "label": BottomLabel("Lights", <Lightbulb size={20} />) }, 
    //        { value: "Climate",             "label": BottomLabel("Climate", <Thermometer size={20} />) }, 
    //        { value: "Security",            "label": BottomLabel("Security", <Shield size={20} />) }, 
    //        { value: "System",              "label": BottomLabel("More", <Menu size={20} />) }
    //]

    const iconsOnly= [
        { value: "Audio Video",         "label": <Music size={20} /> },
        { value: "Lights and Comfort",  "label": <Lightbulb size={20} /> }, 
        { value: "Climate",             "label": <Thermometer size={20} /> }, 
        { value: "Security",            "label": <Shield size={20} /> }, 
        { value: "System",              "label": <Menu size={20} />}
    ]


    // TODO Adding color styles has introduced some ghosting along the edges that needs to be fixed

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