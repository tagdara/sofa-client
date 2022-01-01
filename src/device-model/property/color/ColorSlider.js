import React, { useEffect, useState } from 'react';
import { Checkbox, ColorPicker, Group, HueSlider, ThemeIcon} from '@mantine/core'
import { hsl2hsv } from 'helpers/colorHelpers';
import { useDidUpdate, useDebouncedValue } from '@mantine/hooks';
import { Droplet } from 'react-feather';
import useColor from 'device-model/property/color/useColor'

const ColorSlider = props => {

    const { color, colorHex, setColor } = useColor(props.endpointId, props.value, props.directive)
    const [ value, setValue ] = useState(undefined)
    const [ hue, setHue ] = useState(undefined)
    const [ retainBrightness, setRetainBrightness] = useState(true)
    const [ debounced ] = useDebouncedValue( value, props.delay ? props.delay : 300 ); 

    useEffect(() => {
        setValue(color)
        setHue(Math.round(color.hue))
    }, [ color ])

    useDidUpdate(() => {
        const newColor = {...color, "hue": hue}
        setValue(newColor)
    }, [ hue ])

    useDidUpdate(() => {
        if (debounced !== undefined) {
            if (value !== color) {
                console.log('>> sending value change', debounced)
                var hsb = {...debounced}
                hsb.saturation = hsb.saturation/100
                console.log('sending hsb', hsb)
                setColor(hsb)
            }
        }
    }, [ debounced ])

    if (!color) { return null }

    function handleColorChange(newColorString) {
        const newColor = hsl2hsv(newColorString)
        var hsb={ "hue": newColor[0], "saturation": newColor[1], "brightness": newColor[2] };
        setValue(hsb)
    }

    return (
        <Group noWrap style={{ alignItems: "flex-start"}}>
            <ThemeIcon variant="light">
                <Droplet size={16} />
            </ThemeIcon >
            <Group direction="column" style={{ paddingTop: 4, width: "100%"}}>
                { retainBrightness ?
                    <div style={{ width: "100%"}}>
                        <HueSlider value={ hue } format="hsl" onChange={setHue }  />
                    </div>
                :
                    <ColorPicker value={ colorHex } format="hsl" 
                        onChange={ handleColorChange }
                        swatches= { [ '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', 
                                    '#4A90E2', '#50E3C2', '#B8E986', '#FFFFFF', "#FEEBBA" ] }
                    />
                }
                <Checkbox label="Retain brightness" checked={retainBrightness} onChange={(event) => setRetainBrightness(event.currentTarget.checked)} />
            </Group>
        </Group>
    );

}

export default ColorSlider
