import React, { useEffect, useState } from 'react';
import { Checkbox, ColorPicker, Group, HueSlider, Stack, ThemeIcon} from '@mantine/core'
import { hex2hsv } from 'helpers/colorHelpers';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';
import { IconPalette } from '@tabler/icons';

import useColor from 'endpoint-model/property/color/useColor'

const ColorSlider = props => {

    const { color, colorHex, setColor } = useColor(props.endpointId, props.value, props.directive)
    const [ value, setValue ] = useState(undefined)
    const [ hue, setHue ] = useState(undefined)
    const [ retainBrightness, setRetainBrightness] = useState(true)
    const [ debounced ] = useDebouncedValue( value, props.delay ? props.delay : 300 ); 
    const [ userChange, setUserChange] = useState(false)

    useEffect(() => {
        console.log('non user color update', color)
        setUserChange(false)
        if (color) {
            setValue(color)
            if (color.hue) {
                setHue(Math.round(color.hue))
            }
        }
    }, [ color ])

    useDidUpdate(() => {
        if (userChange) {
            const newColor = {...color, "hue": hue, "saturation": 1 }
            setValue(newColor)
        }
    }, [ hue ])

    useDidUpdate(() => {
        if (debounced !== undefined) {
            if (value !== color) {
                console.log('>> sending value change', debounced)
                var hsb = {...debounced}
                //hsb.saturation = hsb.saturation/100
                console.log('sending hsb', hsb)
                setColor(hsb)
            }
        }
    }, [ debounced ])

    if (!color || !hue ) { return null }

    function handleColorChange(newColorString) {
        //const newColor = hsl2hsv(newColorString)
        console.log('new', newColorString)
        const newColor = hex2hsv(newColorString)
        console.log('new', newColorString, newColor)
        //var hsb={ "hue": newColor[0], "saturation": newColor[1], "brightness": newColor[2] };
        setUserChange(true)
        setValue(newColor)
    }

    function handleHueChange(newHue) {
        setUserChange(true)
        setHue(newHue)
    }

    console.log('hue', hue, color, value)

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
                        <HueSlider value={ hue } format="hsl" onChange={ handleHueChange }  />
                    </div>
                :
                    <ColorPicker value={ colorHex } format="hex" 
                        onChange={ handleColorChange }
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

