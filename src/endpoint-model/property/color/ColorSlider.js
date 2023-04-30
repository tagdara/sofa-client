import React, { useEffect, useState } from 'react';
import { Checkbox, ColorPicker, Group, HueSlider, Stack, ThemeIcon} from '@mantine/core'
import { hex2hsv } from 'helpers/colorHelpers';
import { IconPalette } from '@tabler/icons';

import useColor from 'endpoint-model/property/color/useColor'

const ColorSlider = props => {

    const { color, colorHex, setColor } = useColor(props.endpointId, props.value, props.directive)
    const [ value, setValue ] = useState(undefined)
    const [ hue, setHue ] = useState(undefined)
    const [ retainBrightness, setRetainBrightness] = useState(true)

    useEffect(() => {
        if (color) {
            setValue(color)
            if (color.hue) {
                setHue(Math.round(color.hue))
            }
        }
    }, [ color ])

    if (color === null  || hue === null ) { return null }

    function handleColorChange(newColorString) {
        //const newColor = hsl2hsv(newColorString)
        console.log('new', newColorString)
        const newColor = hex2hsv(newColorString)
        console.log('new', newColorString, newColor)
        //var hsb={ "hue": newColor[0], "saturation": newColor[1], "brightness": newColor[2] };
        setValue(newColor)
    }

    function handleHueChange(newHue) {
        console.log('sending change', newHue, color)
        setHue(newHue)
        const newColor = {...color, "hue": newHue, "saturation": 1 }
        console.log('sending change', newHue, color, "=", newColor)
        setColor(newColor)
    }

    function handleColorDrag(newHue) { 
        setHue(newHue)
    }

    return (
        <Group noWrap style={{ width: "100%", alignItems: "flex-start"}}>
            {props.icon &&
                <ThemeIcon variant="light">
                    <IconPalette size={16} />
                </ThemeIcon >
            }
            <Stack style={{ paddingTop: 4, width: "100%"}}>
                { retainBrightness ?
                    <div style={{ width: "100%"}}>
                        <HueSlider value={ hue } format="hsl" onChange={ handleColorDrag } onChangeEnd={ handleHueChange } />
                    </div>
                :
                    <ColorPicker value={ value } format="hex" 
                        onChange={ handleColorDrag }
                        onChangeEnd={ handleColorChange }
                        swatches= { [ '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                    '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA" ] }
                    />
                }
                <Checkbox label="Retain brightness" checked={retainBrightness} onChange={(event) => setRetainBrightness(event.currentTarget.checked)} />
            </Stack>
        </Group>
    );

}

export default ColorSlider

